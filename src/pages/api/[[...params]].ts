// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

type HeadersInit = [string, string][] | Record<string, string> | Headers;
const fetchResponse = async (req: NextRequest, params: string[]) => {
  const BASE_URL = (() => {
    // Note: This process.env variable is picked from the Cloudflare Pages environment variables - others are set at build time in the github action
    switch (process.env.CF_PAGES_BRANCH) {
      case 'main':
        return 'https://capp-api.prod-ext.apps.futurestech.cloud';
      case 'test/prelaunch':
        return 'https://capp-api.prod-ext.apps.futurestech.cloud';
      case 'staging':
        return 'https://capp-api.staging.apps.futurestech.cloud';
      case 'develop':
        return 'https://capp-api.dev.apps.futurestech.cloud';
      default:
        return 'http://localhost:3000';
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

  // If params is empty return proxy health
  if (params.length === 0 || params[0] === 'undefined') {
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
    // If params is not empty, pass the request directly the 3rd party API
    const result = await fetchResponse(req, params);
    const data: any = await result.json();

    // TODO: Decide how to handle various API status codes

    return new Response(JSON.stringify(data), {
      status: result.status,
      statusText: result.statusText,
      headers: result.headers as HeadersInit,
    });
  }
}
