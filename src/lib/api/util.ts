import { debugHeaderName } from '@/lib/api/constants';
import { getTurnstileRejectionResponse } from '@/lib/api/turnstile';
import { NextRequest } from 'next/server';

export const getBaseUrl = (): string => {
  // Note: This process.env variable is picked from the Cloudflare Pages environment variables - others are set at build time in the github action
  switch (process.env.CF_PAGES_BRANCH) {
    case 'main':
      return 'https://capp-api.prod-ext.apps.futurestech.cloud';
    case 'staging':
      return 'https://capp-api.staging.apps.futurestech.cloud';
    case 'local':
      return 'http://localhost:3000';
    default:
      return 'https://capp-api.dev.apps.futurestech.cloud';
  }
};

export const getProxyHealthResponse = () =>
  new Response(
    JSON.stringify({
      proxy: 'OK',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      } as HeadersInit,
    }
  );

export const setAuthHeader = (req: NextRequest, headers: any) => {
  const authToken = req.headers.get('Authorization');
  const sessionCookie = req.cookies.get('connect.sid');
  const cookieHeader = `${sessionCookie?.name}=${sessionCookie?.value}`;

  if (authToken) {
    headers.Authorization = authToken;
  } else if (sessionCookie?.value) {
    headers.Cookie = cookieHeader;
  }
};

export const setDebugHeader = (req: NextRequest, headers: any) => {
  const debugHeader = req.headers.get(debugHeaderName);

  if (debugHeader) {
    if (debugHeader === process.env.DEBUG_MODE_SECRET) {
      headers['X-Debug'] = debugHeader;
    } else {
      // reject request
      return getTurnstileRejectionResponse();
    }
  }
};
