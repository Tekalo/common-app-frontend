const baseApiUrl = '/api/';
export const applicantsEndpoint = `${baseApiUrl}applicants`;
export const existingApplicantEndpoint = `${applicantsEndpoint}/me`;
export const applicantSubmissionsEndpoint = `${existingApplicantEndpoint}/submissions`;
export const applicantDraftSubmissionsEndpoint = `${existingApplicantEndpoint}/submissions/draft`;

export const get = async (url: string) => {
  return fetch(url, {
    method: 'GET',
  });
};

export const post = async (url: string, values: any) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
};
