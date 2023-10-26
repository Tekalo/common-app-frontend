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

  const searchWithQuery = async (query: string, value: string[]) => {
    const alreadySelected = (skill: ISkill) => !value.includes(skill.name);
    const queryMatches = (skill: ISkill) =>
      skill.name.toLowerCase().includes(query.toLowerCase());

    return Promise.resolve(skills.filter(queryMatches).filter(alreadySelected));
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
