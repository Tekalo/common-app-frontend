// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes
import { TurnstileServerValidationResponse } from '@marsidev/react-turnstile';
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

type HeadersInit = [string, string][] | Record<string, string> | Headers;

const validateTurnstileAndPost = async (
  turnstileToken: string,
  turnstileSecret: string,
  turnstileEndpoint: string,
  url: string,
  req: NextRequest,
  headers: any
) => {
  // Validate the x-turnstile-token header
  const res = await fetch(turnstileEndpoint, {
    method: 'POST',
    body: `secret=${encodeURIComponent(
      turnstileSecret
    )}&response=${encodeURIComponent(turnstileToken)}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  });
  const data = (await res.json()) as TurnstileServerValidationResponse;
  if (data.success) {
    // Call our API
    return await fetch(url, {
      method: 'POST',
      body: req.body,
      headers,
    });
  }
  // Otherwise return an error
  return new Response(
    JSON.stringify({
      message:
        'Our robot guardians determined that you are likely a teapot - please try again and do your best to not be a teapot this time',
    }),
    {
      status: 418,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
};

const fetchAPIResponse = async (req: NextRequest, params: string[]) => {
  const BASE_URL = (() => {
    // Note: This process.env variable is picked from the Cloudflare Pages environment variables - others are set at build time in the github action
    switch (process.env.CF_PAGES_BRANCH) {
      case 'main':
      case 'test/pre-launch':
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
  const turnstileToken = req.headers.get('x-turnstile-token') || '';
  const turnstileSecret = process.env.TURNSTILE_SECRET || '';
  const turnstileEndpoint =
    'https://challenges.cloudflare.com/turnstile/v0/siteverify';

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
      if (params[0] === 'applicants' || params[0] === 'opportunities') {
        // Validate the x-turnstile-token header when a new POST request is made to the applicants or opportunities endpoints
        return validateTurnstileAndPost(
          turnstileToken,
          turnstileSecret,
          turnstileEndpoint,
          url,
          req,
          headers
        );
      } // Otherwise post to the server as usual
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
