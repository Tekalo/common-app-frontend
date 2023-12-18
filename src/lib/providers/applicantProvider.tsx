import {
  deleteRequest,
  get,
  post,
  postWithTurnstile,
  put,
} from '@/lib/helpers/api/apiHelpers';
import {
  applicantStateEndpoint,
  applicantsEndpoint,
  existingApplicantEndpoint,
} from '@/lib/helpers/api/endpoints';
import { IProvider } from '@/lib/providers/shared';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { QueryClient, UseQueryResult, useQuery } from 'react-query';
import { AccountResponseType, NewCandidateType } from '../types';

interface IApplicantContext {
  deleteApplicantData: (authToken: string) => Promise<Response>;
  submitCandidateDebugSignup: (
    applicantPayload: NewCandidateType,
    debugSecret: string
  ) => Promise<Response>;
  submitCandidateSignup: (
    applicantPayload: NewCandidateType,
    turnstileToken: string
  ) => Promise<Response>;
  updateMatchStatus: (pause: boolean, authToken: string) => Promise<Response>;
  useAccount: () => UseQueryResult<AccountResponseType, Error>;
}

export const ApplicantContext = React.createContext<IApplicantContext>(
  {} as IApplicantContext
);

const ApplicantProvider: React.FC<IProvider> = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const qc = new QueryClient();
  const queryKey = 'accountData';

  function useAccount() {
    return useQuery<AccountResponseType, Error>({
      enabled: !isLoading,
      queryKey: [queryKey],
      queryFn: async () => {
        const res = await get(
          existingApplicantEndpoint,
          isAuthenticated ? await getAccessTokenSilently() : ''
        );

        if (res.ok) {
          return await res.json();
        } else {
          throw new Error(res.status.toString(), { cause: res });
        }
      },
      retry: 1,
    });
  }

  const deleteApplicantData = async (authToken: string): Promise<Response> => {
    return deleteRequest(existingApplicantEndpoint, authToken).then(
      queryHandler
    );
  };

  const submitCandidateSignup = async (
    applicantPayload: NewCandidateType,
    turnstileToken: string
  ): Promise<Response> => {
    return postWithTurnstile(
      applicantsEndpoint,
      applicantPayload,
      turnstileToken,
      isAuthenticated ? await getAccessTokenSilently() : ''
    ).then(queryHandler);
  };

  const submitCandidateDebugSignup = async (
    applicantPayload: NewCandidateType,
    debugSecret: string
  ): Promise<Response> => {
    return post(
      applicantsEndpoint,
      applicantPayload,
      isAuthenticated ? await getAccessTokenSilently() : '',
      debugSecret
    ).then(queryHandler);
  };

  const queryHandler = (res: Response) => {
    if (res.ok) {
      qc.invalidateQueries(queryKey);
    }

    return res;
  };

  const updateMatchStatus = async (
    pause: boolean,
    authToken: string
  ): Promise<Response> => {
    return put(applicantStateEndpoint, { pause }, authToken).then(queryHandler);
  };

  return (
    <ApplicantContext.Provider
      value={{
        deleteApplicantData,
        submitCandidateSignup,
        submitCandidateDebugSignup,
        updateMatchStatus,
        useAccount,
      }}
    >
      {children}
    </ApplicantContext.Provider>
  );
};

export default ApplicantProvider;
