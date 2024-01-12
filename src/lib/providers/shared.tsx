import { UseQueryResult } from '@tanstack/react-query';
import { ReactNode } from 'react';

export interface IProvider {
  children?: ReactNode;
}

export interface ISearchable {
  canonical: string;
}

export interface ISearchableResults {
  queryMatches: boolean;
  results: ISearchable[];
}

export interface ISearchableContext {
  searchWithQuery: (query: string, value: string[]) => ISearchableResults;
  useSearchable: () => UseQueryResult<boolean, Error>;
}
