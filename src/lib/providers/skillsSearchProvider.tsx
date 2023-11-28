import { get, skillsEndpoint } from '@/lib/helpers/apiHelpers';
import { IProvider } from '@/lib/providers/shared';
import Fuse from 'fuse.js';
import { createContext, useEffect, useState } from 'react';

export interface ISkill {
  name: string;
}

export interface ISkillSearchResults {
  queryMatches: boolean;
  results: ISkill[];
}

interface IGetSkillsResponse {
  data: ISkill[];
}

interface ISkillsSearchContext {
  searchWithQuery: (query: string, value: string[]) => ISkillSearchResults;
}

export const SkillsSearchContext = createContext<ISkillsSearchContext>(
  {} as ISkillsSearchContext
);

const SkillsSearchProvider: React.FC<IProvider> = ({ children }) => {
  const [fuse, setFuse] = useState<Fuse<ISkill>>();
  const [skills, setSkills] = useState<ISkill[]>([]);

  useEffect(() => {
    const handleGetSkills = async (res: Response) => {
      const skills: ISkill[] = ((await res.json()) as IGetSkillsResponse).data;

      setSkills(skills);
    };

    getSkills().then(handleGetSkills);
  }, []);

  useEffect(() => {
    const createFuse = (): Fuse<ISkill> => {
      const fuseOptions = {
        isCaseSensitive: false,
        shouldSort: true,
        includeMatches: false,
        findAllMatches: false,
        minMatchCharLength: 1,
        keys: ['name'],
      };

      const idx = Fuse.createIndex(fuseOptions.keys, skills);

      return new Fuse<ISkill>(skills, fuseOptions, idx);
    };

    setFuse(createFuse());
  }, [skills]);

  function getSkills(): Promise<Response> {
    return get(skillsEndpoint, '');
  }

  const searchWithQuery = (
    query: string,
    value: string[]
  ): ISkillSearchResults => {
    const alreadySelected = (skill: ISkill) => !value.includes(skill.name);
    const queryIncludes = (skill: ISkill) =>
      skill.name.toLowerCase().includes(query.toLowerCase());
    const queryMatches = (skill: ISkill) =>
      skill.name.toLowerCase() === query.toLowerCase();

    let results: ISkill[];

    if (fuse) {
      results = fuse.search<ISkill>(query).map((r) => r.item);
    } else {
      results = skills.filter(queryIncludes);
    }

    results = results.filter(alreadySelected);

    return {
      queryMatches: skills.some(queryMatches),
      results,
    };
  };

  return (
    <SkillsSearchContext.Provider
      value={{
        searchWithQuery,
      }}
    >
      {children}
    </SkillsSearchContext.Provider>
  );
};

export default SkillsSearchProvider;
