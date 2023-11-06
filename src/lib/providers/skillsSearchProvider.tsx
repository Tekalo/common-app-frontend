import Fuse from 'fuse.js';
import React from 'react';
import { IProvider } from './shared';

export interface ISkill {
  name: string;
}

interface ISkillsSearchContext {
  searchWithQuery: (query: string, value: string[]) => Promise<ISkill[]>;
}

export const SkillsSearchContext = React.createContext<ISkillsSearchContext>(
  {} as ISkillsSearchContext
);

const SkillsSearchProvider: React.FC<IProvider> = ({ children }) => {
  const skills: ISkill[] = [
    { name: 'Agile software development' },
    { name: 'C#' },
    { name: 'Cryptography' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Javascript' },
    { name: 'jQuery' },
    { name: 'Manual Automation' },
    { name: 'SQL' },
  ];

  const fuseOptions = {
    isCaseSensitive: false,
    shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 1,
    keys: ['name'],
  };

  const idx = Fuse.createIndex(fuseOptions.keys, skills);
  const fuse = new Fuse<ISkill>(skills, fuseOptions, idx);

  const searchWithQuery = async (query: string, value: string[]) => {
    const alreadySelected = (skill: ISkill) => !value.includes(skill.name);

    const results = fuse
      .search<ISkill>(query)
      .map((r) => r.item)
      .filter(alreadySelected);

    return Promise.resolve(results);
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
