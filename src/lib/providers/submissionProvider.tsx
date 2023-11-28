import {
  applicantDraftSubmissionsEndpoint,
  applicantSubmissionsEndpoint,
  get,
  post,
  put,
} from '@/lib/helpers/apiHelpers';
import { IProvider } from '@/lib/providers/shared';
import { DraftSubmissionType } from '@/lib/types';
import React from 'react';

interface ISubmissionContext {
  getCandidateSubmissions: (authToken: string) => Promise<Response>;
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
}

export const SubmissionContext = React.createContext<ISubmissionContext>(
  {} as ISubmissionContext
);

const SubmissionProvider: React.FC<IProvider> = ({ children }) => {
  const getCandidateSubmissions = (authToken: string) => {
    return get(applicantSubmissionsEndpoint, authToken);
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
        getCandidateSubmissions,
        saveCandidateDraft,
        submitCandidateApplication,
        submitCandidateEdits,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};

export default SubmissionProvider;