import { deleteRequest, get, put } from '@/lib/helpers/api/apiHelpers';
import {
  applicantStateEndpoint,
  existingApplicantEndpoint,
} from '@/lib/helpers/api/endpoints';
import { IProvider } from '@/lib/providers/shared';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { QueryClient, UseQueryResult, useQuery } from 'react-query';
import { AccountResponseType } from '../types';

interface IApplicantContext {
  deleteApplicantData: (authToken: string) => Promise<Response>;
  getAccountInfo: () => void;
  invalidateQuery: () => void;
  updateMatchStatus: (pause: boolean, authToken: string) => Promise<Response>;
  useAccount: () => UseQueryResult<AccountResponseType, Error>;
}

export const ApplicantContext = React.createContext<IApplicantContext>(
  {} as IApplicantContext
);

const ApplicantProvider: React.FC<IProvider> = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [shouldMakeRequest, setShouldMakeRequest] = useState(false);
  const qc = new QueryClient();
  const queryKey = 'accountData';

  function useAccount() {
    return useQuery<AccountResponseType, Error>({
      enabled: !isLoading && shouldMakeRequest,
      queryKey: [queryKey],
      queryFn: async () => {
        const res = await get(
          existingApplicantEndpoint,
          isAuthenticated ? await getAccessTokenSilently() : ''
        ).catch((e) => {
          throw e;
        });

        if (res.ok) {
          return await res.json();
        } else {
          throw new Error(res.status.toString(), { cause: res });
        }
      },
      retry: 1,
    });
  }

  const getAccountInfo = (): void => {
    setShouldMakeRequest(true);
  };

  const deleteApplicantData = (authToken: string): Promise<Response> => {
    return deleteRequest(existingApplicantEndpoint, authToken);
  };

  const invalidateQuery = () => {
    qc.invalidateQueries(queryKey);
  };

  const updateMatchStatus = (
    pause: boolean,
    authToken: string
  ): Promise<Response> => {
    return put(applicantStateEndpoint, { pause }, authToken);
  };

  return (
    <ApplicantContext.Provider
      value={{
        deleteApplicantData,
        getAccountInfo,
        invalidateQuery,
        updateMatchStatus,
        useAccount,
      }}
    >
      {children}
    </ApplicantContext.Provider>
  );
};

export default ApplicantProvider;
