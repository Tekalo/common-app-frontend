// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes
import { TurnstileServerValidationResponse } from '@marsidev/react-turnstile';
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

type HeadersInit = [string, string][] | Record<string, string> | Headers;

const validateTurnstileToken = async (request: Request) => {
  const { token } = (await request.json()) as { token: string };

  const secret = process.env.TURNSTILE_SECRET || '';
  const verifyEndpoint =
    'https://challenges.cloudflare.com/turnstile/v0/siteverify';

  const res = await fetch(verifyEndpoint, {
    method: 'POST',
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(
      token
    )}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  });

  const data = (await res.json()) as TurnstileServerValidationResponse;

  return new Response(JSON.stringify(data), {
    status: data.success ? 200 : 400,
    headers: {
      'content-type': 'application/json',
    },
  });
};

const fetchAPIResponse = async (req: NextRequest, params: string[]) => {
  const BASE_URL = (() => {
    // Note: This process.env variable is picked from the Cloudflare Pages environment variables - others are set at build time in the github action
    switch (process.env.CF_PAGES_BRANCH) {
      case 'main':
      case 'test/prelaunch':
        return 'https://capp-api.prod-ext.apps.futurestech.cloud';
      case 'staging':
        return 'https://capp-api.staging.apps.futurestech.cloud';
      case 'develop':
        return 'https://capp-api.dev.apps.futurestech.cloud';
      case 'local':
        return 'http://localhost:3000';
      default:
        return 'https://capp-api.dev.apps.futurestech.cloud';
    }
  })();

  const url = `${BASE_URL}/${params.join('/')}`;
  const sessionCookie = req.cookies.get('connect.sid');
  const cookieHeader = `${sessionCookie?.name}=${sessionCookie?.value}`;
  const authToken = req.headers.get('Authorization');

  const headers: any = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers.Authorization = authToken;
  } else if (sessionCookie?.value) {
    headers.Cookie = cookieHeader;
  }

  switch (req.method) {
    case 'POST':
      return await fetch(url, {
        method: 'POST',
        body: req.body,
        headers,
      });
    case 'PUT':
      return await fetch(url, {
        method: 'PUT',
        body: req.body,
        headers,
      });
    case 'PATCH':
      return await fetch(url, {
        method: 'PATCH',
        body: req.body,
        headers,
      });
    case 'DELETE':
      return await fetch(url, {
        method: 'DELETE',
        headers,
      });
    default:
      return await fetch(url, {
        method: 'GET',
        headers,
      });
  }
};

export default async function handler(req: NextRequest): Promise<Response> {
  const params = req.nextUrl.searchParams.getAll('params');

  if (params.length === 0 || params[0] === 'undefined') {
    // Return proxy health if no parameters are provided
    return new Response(
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
  } else if (params.length === 1 && params.includes('verify')) {
    // Validate the Turnstile token if the request is to the /verify endpoint
    return await validateTurnstileToken(req);
  } else {
    // Pass the request directly the 3rd party API
    const result = await fetchAPIResponse(req, params);
    const data: unknown = await result.json();

    return new Response(JSON.stringify(data), {
      status: result.status,
      statusText: result.statusText,
      headers: result.headers as HeadersInit,
    });
  }
}
