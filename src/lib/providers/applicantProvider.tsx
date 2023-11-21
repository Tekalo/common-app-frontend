import React from 'react';
import {
  applicantStateEndpoint,
  deleteRequest,
  existingApplicantEndpoint,
  get,
  put,
} from '../helpers/apiHelpers';
import { IProvider } from './shared';

interface IApplicantContext {
  deleteApplicantData: (authToken: string) => Promise<Response>;
  getAccountData: (authToken: string) => Promise<Response>;
  updateMatchStatus: (pause: boolean, authToken: string) => Promise<Response>;
}

export const ApplicantContext = React.createContext<IApplicantContext>(
  {} as IApplicantContext
);

const ApplicantProvider: React.FC<IProvider> = ({ children }) => {
  const deleteApplicantData = (authToken: string): Promise<Response> => {
    return deleteRequest(existingApplicantEndpoint, authToken);
  };

  const getAccountData = (authToken: string): Promise<Response> => {
    return get(existingApplicantEndpoint, authToken);
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
        getAccountData,
        updateMatchStatus,
      }}
    >
      {children}
    </ApplicantContext.Provider>
  );
};

export default ApplicantProvider;
