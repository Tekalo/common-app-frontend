import { TurnstileServerValidationResponse } from '@marsidev/react-turnstile';

const baseApiUrl = '/api/';
export const verifyTurnstileEndpoint = `${baseApiUrl}verify`;
export const applicantsEndpoint = `${baseApiUrl}applicants`;
export const opportunityEndpoint = `${baseApiUrl}opportunities`;
export const opportunityBatchEndpoint = `${opportunityEndpoint}/batch`;
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

export const postWithTurnstile = async (
  url: string,
  values: any,
  turnstileToken: string
) => {
  const turnstileResponse: TurnstileServerValidationResponse = await (
    await checkTurnstile(turnstileToken)
  ).json();

  if (turnstileResponse.success) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  } else {
    throw new Error('Turnstile validation failed');
  }
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

const checkTurnstile = async (turnstileToken: string) => {
  return fetch(verifyTurnstileEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ turnstileToken }),
  });
};

const generateTokenValue = (token: string) => (token ? `Bearer ${token}` : '');
