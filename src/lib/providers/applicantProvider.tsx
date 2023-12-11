import { deleteRequest, get, put } from '@/lib/helpers/api/apiHelpers';
import {
  applicantStateEndpoint,
  existingApplicantEndpoint,
} from '@/lib/helpers/api/endpoints';
import { IProvider } from '@/lib/providers/shared';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { UseQueryResult, useQuery } from 'react-query';
import { AccountResponseType } from '../types';

interface IApplicantContext {
  deleteApplicantData: (authToken: string) => Promise<Response>;
  updateMatchStatus: (pause: boolean, authToken: string) => Promise<Response>;
  useAccount: () => UseQueryResult<AccountResponseType, Error>;
}

export const ApplicantContext = React.createContext<IApplicantContext>(
  {} as IApplicantContext
);

const ApplicantProvider: React.FC<IProvider> = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();

  function useAccount() {
    return useQuery<AccountResponseType, Error>({
      queryKey: ['accountData'],
      queryFn: async () => {
        const res = await get(
          existingApplicantEndpoint,
          await getAccessTokenSilently()
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

  const deleteApplicantData = (authToken: string): Promise<Response> => {
    return deleteRequest(existingApplicantEndpoint, authToken);
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
        updateMatchStatus,
        useAccount,
      }}
    >
      {children}
    </ApplicantContext.Provider>
  );
};

export default ApplicantProvider;
