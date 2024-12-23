import { get } from '@/lib/helpers/api/apiHelpers';
import { causesEndpoint } from '@/lib/helpers/api/endpoints';
import {
  IProvider,
  ISearchable,
  ISearchableContext,
  ISearchableResults,
  prioritySort,
} from '@/lib/providers/shared';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import { createContext, useEffect, useState } from 'react';

export type ICause = ISearchable;

export interface IGetCausesResponse {
  data: ICause[];
}

export interface ICausesSearchContext extends ISearchableContext {
  searchWithQuery: (query: string, value: string[]) => ISearchableResults;
  useSearchable: () => UseQueryResult<boolean, Error>;
}

export const CausesSearchContext = createContext<ICausesSearchContext>(
  {} as ICausesSearchContext
);

const CausesSearchProvider: React.FC<IProvider> = ({ children }) => {
  const [fuse, setFuse] = useState<Fuse<ICause>>();
  const [causes, setCauses] = useState<ICause[]>([]);
  const queryKey = 'causes';

  useEffect(() => {
    const createFuse = (): Fuse<ICause> => {
      const fuseOptions = {
        isCaseSensitive: false,
        shouldSort: true,
        includeMatches: false,
        findAllMatches: false,
        minMatchCharLength: 1,
        keys: ['canonical'],
      };

      const idx = Fuse.createIndex(fuseOptions.keys, causes);

      return new Fuse<ICause>(causes, fuseOptions, idx);
    };

    setFuse(createFuse());
  }, [causes]);

  function useCauses() {
    return useQuery<boolean, Error>({
      queryKey: [queryKey],
      queryFn: async () => {
        const res = await get(causesEndpoint, '');

        if (res.ok) {
          const causes: ICause[] = ((await res.json()) as IGetCausesResponse)
            .data;

          setCauses(causes);

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
  ): ISearchableResults => {
    const alreadySelected = (cause: ICause) => !value.includes(cause.canonical);
    const queryIncludes = (cause: ICause) =>
      cause.canonical.toLowerCase().includes(query.toLowerCase());
    const queryMatches = (cause: ICause) =>
      cause.canonical.toLowerCase() === query.toLowerCase();

    let results: ICause[];

    // If no query and none selected, show them the default options
    if (!query.length && !value.length) {
      results = causes
        .filter((c) => c.priority)
        .sort((a, b) => {
          if (a.canonical.charAt(0) > b.canonical.charAt(0)) {
            return 1;
          } else if (a.canonical.charAt(0) < b.canonical.charAt(0)) {
            return -1;
          } else return 0;
        });
    } else {
      if (fuse) {
        results = fuse.search<ICause>(query).map((r) => r.item);
      } else {
        results = causes.filter(queryIncludes);
      }

      results.sort(prioritySort);

      // Limit number of returned results for visibility reasons
      results = results.filter(alreadySelected).slice(0, 15);
    }

    return {
      queryMatches: causes.some(queryMatches),
      results,
    };
  };

  return (
    <CausesSearchContext.Provider
      value={{
        searchWithQuery,
        useSearchable: useCauses,
      }}
    >
      {children}
    </CausesSearchContext.Provider>
  );
};

export default CausesSearchProvider;
