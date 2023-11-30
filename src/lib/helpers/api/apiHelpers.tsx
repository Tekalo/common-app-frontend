export const get = async (url: string, token = '') => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: generateTokenValue(token),
    },
  });
};

export const post = async (
  url: string,
  values: any,
  token = '',
  debug = ''
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: generateTokenValue(token),
  };

  if (debug.length) {
    headers['X-Debug'] = debug;
  }

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(values),
  });
};

export const postWithTurnstile = async (
  url: string,
  values: any,
  turnstileToken: string,
  authToken = ''
) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-turnstile-token': turnstileToken,
      Authorization: generateTokenValue(authToken),
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
