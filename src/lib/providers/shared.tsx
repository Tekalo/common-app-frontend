import { UseQueryResult } from '@tanstack/react-query';
import { ReactNode } from 'react';

export interface IProvider {
  children?: ReactNode;
}

export interface ISearchable {
  canonical: string;
  priority: boolean;
}

export interface ISearchableResults {
  queryMatches: boolean;
  results: ISearchable[];
}

export interface ISearchableContext {
  searchWithQuery: (query: string, value: string[]) => ISearchableResults;
  useSearchable: () => UseQueryResult<boolean, Error>;
}

export const prioritySort = (a: ISearchable, b: ISearchable) => {
  if (a.priority && !b.priority) {
    return -1;
  } else if (b.priority && !a.priority) {
    return 1;
  } else return 0;
};
