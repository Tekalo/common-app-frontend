import Fuse from 'fuse.js';
import React, { useEffect, useState } from 'react';
import { IProvider } from './shared';

export interface ISkill {
  name: string;
}

interface ISkillSearchResults {
  queryMatches: boolean;
  results: ISkill[];
}

interface ISkillsSearchContext {
  searchWithQuery: (query: string, value: string[]) => ISkillSearchResults;
}

export const SkillsSearchContext = React.createContext<ISkillsSearchContext>(
  {} as ISkillsSearchContext
);

const SkillsSearchProvider: React.FC<IProvider> = ({ children }) => {
  const [fuse, setFuse] = useState<Fuse<ISkill>>();
  const [skills, setSkills] = useState<ISkill[]>([]);

  useEffect(() => {
    getSkills().then((s: ISkill[]) => {
      setSkills(s);
    });
  }, []);

  useEffect(() => {
    setFuse(createFuse());
  }, [skills]);

  function createFuse(): Fuse<ISkill> {
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
  }

  function getSkills(): Promise<ISkill[]> {
    return Promise.resolve([
      { name: 'Agile software development' },
      { name: 'C#' },
      { name: 'Cryptography' },
      { name: 'CSS' },
      { name: 'HTML' },
      { name: 'Javascript' },
      { name: 'jQuery' },
      { name: 'Manual Automation' },
      { name: 'SQL' },
    ]);
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
