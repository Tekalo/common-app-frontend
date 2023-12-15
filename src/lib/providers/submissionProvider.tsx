import { get, post, put } from '@/lib/helpers/api/apiHelpers';
import {
  applicantDraftSubmissionsEndpoint,
  applicantSubmissionsEndpoint,
} from '@/lib/helpers/api/endpoints';
import { IProvider } from '@/lib/providers/shared';
import { DraftSubmissionType, SubmissionResponseType } from '@/lib/types';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { QueryClient, UseQueryResult, useQuery } from 'react-query';

interface ISubmissionContext {
  getSubmissions: () => void;
  invalidateQuery: () => void;
  saveCandidateDraft: (
    values: DraftSubmissionType,
    authToken: string
  ) => Promise<Response>;
  submitCandidateApplication: (
    values: DraftSubmissionType,
    authToken: string
  ) => Promise<Response>;
  submitCandidateEdits: (
    values: DraftSubmissionType,
    authToken: string
  ) => Promise<Response>;
  useSubmission: () => UseQueryResult<SubmissionResponseType, Error>;
}

export const SubmissionContext = React.createContext<ISubmissionContext>(
  {} as ISubmissionContext
);

const SubmissionProvider: React.FC<IProvider> = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [shouldMakeRequest, setShouldMakeRequest] = useState(false);
  const qc = new QueryClient();
  const queryKey = 'submissionData';

  function useSubmission() {
    return useQuery<SubmissionResponseType, Error>({
      enabled: !isLoading && shouldMakeRequest,
      queryKey: [queryKey],
      queryFn: async () => {
        const res = await get(
          applicantSubmissionsEndpoint,
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

  const getSubmissions = (): void => {
    setShouldMakeRequest(true);
  };

  const invalidateQuery = () => {
    qc.invalidateQueries(queryKey);
  };

  const saveCandidateDraft = (
    values: DraftSubmissionType,
    authToken: string
  ): Promise<Response> => {
    return post(applicantDraftSubmissionsEndpoint, values, authToken);
  };

  const submitCandidateApplication = (
    values: DraftSubmissionType,
    authToken: string
  ): Promise<Response> => {
    return post(applicantSubmissionsEndpoint, values, authToken);
  };

  const submitCandidateEdits = (
    values: DraftSubmissionType,
    authToken: string
  ) => {
    return put(applicantSubmissionsEndpoint, values, authToken);
  };

  return (
    <SubmissionContext.Provider
      value={{
        getSubmissions,
        invalidateQuery,
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
