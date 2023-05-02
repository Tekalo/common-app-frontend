const baseApiUrl = '/api/';
export const applicantsEndpoint = `${baseApiUrl}applicants`;
export const existingApplicantEndpoint = `${applicantsEndpoint}/me`;
export const applicantStateEndpoint = `${existingApplicantEndpoint}/state`;
export const applicantSubmissionsEndpoint = `${existingApplicantEndpoint}/submissions`;
export const applicantDraftSubmissionsEndpoint = `${existingApplicantEndpoint}/submissions/draft`;

export const get = async (url: string, token = '') => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: generateTokenValue(token),
    },
  });
};

export const post = async (url: string, values: any, token = '') => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: generateTokenValue(token),
    },
    body: JSON.stringify(values),
  });
};

export const put = async (url: string, values: any, token = '') => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: generateTokenValue(token),
    },
    body: JSON.stringify(values),
  });
};

export const deleteRequest = async (url: string, token = '') => {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: generateTokenValue(token),
    },
  });
};

const generateTokenValue = (token: string) => (token ? `Bearer ${token}` : '');
