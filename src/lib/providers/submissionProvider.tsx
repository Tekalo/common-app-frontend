import { get, post, put } from '@/lib/helpers/api/apiHelpers';
import {
  applicantDraftSubmissionsEndpoint,
  applicantSubmissionsEndpoint,
} from '@/lib/helpers/api/endpoints';
import { IProvider } from '@/lib/providers/shared';
import {
  DraftSubmissionType,
  FinalSubmissionType,
  SubmissionResponseType,
} from '@/lib/types';
import { useAuth0 } from '@auth0/auth0-react';
import { QueryClient, UseQueryResult, useQuery } from '@tanstack/react-query';
import React from 'react';

interface ISubmissionContext {
  saveCandidateDraft: (
    values: DraftSubmissionType,
    authToken: string
  ) => Promise<Response>;
  submitCandidateApplication: (
    values: FinalSubmissionType,
    authToken: string
  ) => Promise<Response>;
  submitCandidateEdits: (
    values: FinalSubmissionType,
    authToken: string
  ) => Promise<Response>;
  useSubmission: () => UseQueryResult<SubmissionResponseType, Error>;
}

export const SubmissionContext = React.createContext<ISubmissionContext>(
  {} as ISubmissionContext
);

const SubmissionProvider: React.FC<IProvider> = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const qc = new QueryClient();
  const queryKey = 'submissionData';

  function useSubmission() {
    return useQuery<SubmissionResponseType, Error>({
      enabled: !isLoading,
      queryKey: [queryKey],
      queryFn: async () => {
        const res = await get(
          applicantSubmissionsEndpoint,
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

  const queryHandler = (res: Response) => {
    if (res.ok) {
      qc.invalidateQueries({ queryKey: [queryKey] });
    }

    return res;
  };

  const saveCandidateDraft = async (
    values: DraftSubmissionType,
    authToken: string
  ): Promise<Response> => {
    return post(applicantDraftSubmissionsEndpoint, values, authToken).then(
      queryHandler
    );
  };

  const submitCandidateApplication = async (
    values: FinalSubmissionType,
    authToken: string
  ): Promise<Response> => {
    return post(applicantSubmissionsEndpoint, values, authToken).then(
      queryHandler
    );
  };

  const submitCandidateEdits = async (
    values: FinalSubmissionType,
    authToken: string
  ) => {
    return put(applicantSubmissionsEndpoint, values, authToken).then(
      queryHandler
    );
  };

  return (
    <SubmissionContext.Provider
      value={{
        saveCandidateDraft,
        submitCandidateApplication,
        submitCandidateEdits,
        useSubmission,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};

export default SubmissionProvider;
