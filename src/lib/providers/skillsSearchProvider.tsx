import { get } from '@/lib/helpers/api/apiHelpers';
import { skillsEndpoint } from '@/lib/helpers/api/endpoints';
import { IProvider } from '@/lib/providers/shared';
import Fuse from 'fuse.js';
import { createContext, useEffect, useState } from 'react';
import { UseQueryResult, useQuery } from 'react-query';

export interface ISkill {
  canonical: string;
}

export interface ISkillSearchResults {
  queryMatches: boolean;
  results: ISkill[];
}

export interface IGetSkillsResponse {
  data: ISkill[];
}

interface ISkillsSearchContext {
  searchWithQuery: (query: string, value: string[]) => ISkillSearchResults;
  useSkills: () => UseQueryResult<boolean, Error>;
}

export const SkillsSearchContext = createContext<ISkillsSearchContext>(
  {} as ISkillsSearchContext
);

const SkillsSearchProvider: React.FC<IProvider> = ({ children }) => {
  const [fuse, setFuse] = useState<Fuse<ISkill>>();
  const [skills, setSkills] = useState<ISkill[]>([]);
  const queryKey = 'skills';

  useEffect(() => {
    const createFuse = (): Fuse<ISkill> => {
      const fuseOptions = {
        isCaseSensitive: false,
        shouldSort: true,
        includeMatches: false,
        findAllMatches: false,
        minMatchCharLength: 1,
        keys: ['canonical'],
      };

      const idx = Fuse.createIndex(fuseOptions.keys, skills);

      return new Fuse<ISkill>(skills, fuseOptions, idx);
    };

    setFuse(createFuse());
  }, [skills]);

  function useSkills() {
    return useQuery<boolean, Error>({
      queryKey: [queryKey],
      queryFn: async () => {
        const res = await get(skillsEndpoint, '');

        if (res.ok) {
          const skills: ISkill[] = ((await res.json()) as IGetSkillsResponse)
            .data;

          setSkills(skills);

          return true;
        } else {
          throw new Error(res.status.toString(), { cause: res });
        }
      },
      retry: 1,
    });
  }

  const searchWithQuery = (
    query: string,
    value: string[]
  ): ISkillSearchResults => {
    const alreadySelected = (skill: ISkill) => !value.includes(skill.canonical);
    const queryIncludes = (skill: ISkill) =>
      skill.canonical.toLowerCase().includes(query.toLowerCase());
    const queryMatches = (skill: ISkill) =>
      skill.canonical.toLowerCase() === query.toLowerCase();

    let results: ISkill[];

    if (fuse) {
      results = fuse.search<ISkill>(query).map((r) => r.item);
    } else {
      results = skills.filter(queryIncludes);
    }

    // Limit number of returned results for visibility reasons
    results = results.filter(alreadySelected).slice(0, 8);

    return {
      queryMatches: skills.some(queryMatches),
      results,
    };
  };

  return (
    <SkillsSearchContext.Provider
      value={{
        searchWithQuery,
        useSkills,
      }}
    >
      {children}
    </SkillsSearchContext.Provider>
  );
};

export default SkillsSearchProvider;
