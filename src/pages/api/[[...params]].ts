// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes
import {
  debugHeaderName,
  turnstileEndpoint,
  turnstileTokenHeaderName,
} from '@/lib/api/constants';
import { requestWithBody, requestWithoutBody } from '@/lib/api/requests';
import { validateTurnstileAndPost } from '@/lib/api/turnstile';
import {
  getBaseUrl,
  getProxyHealthResponse,
  setAuthHeader,
  setDebugHeader,
} from '@/lib/api/util';
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

type HeadersInit = [string, string][] | Record<string, string> | Headers;

const fetchAPIResponse = async (req: NextRequest, params: string[]) => {
  const BASE_URL = getBaseUrl();
  const turnstileSecret = process.env.TURNSTILE_SECRET || '';
  const turnstileToken = req.headers.get(turnstileTokenHeaderName) || '';
  const url = `${BASE_URL}/${params.join('/')}`;

  const headers: any = {
    'Content-Type': 'application/json',
  };

  setAuthHeader(req, headers);
  setDebugHeader(req, headers);

  const debugValueIsValid = headers[debugHeaderName] ? true : false;

  switch (req.method) {
    case 'POST':
      if (
        !debugValueIsValid &&
        params.length === 1 &&
        (params[0] === 'applicants' || params[0] === 'opportunities')
      ) {
        // Validate the x-turnstile-token header when a new POST request is made to the applicants or opportunities endpoints
        return validateTurnstileAndPost(
          turnstileToken,
          turnstileSecret,
          turnstileEndpoint,
          url,
          req,
          headers
        );
      }

      // Otherwise post to the server as usual
      return await requestWithBody('POST', url, req, headers);
    case 'PUT':
      return await requestWithBody('PUT', url, req, headers);
    case 'PATCH':
      return await requestWithBody('PATCH', url, req, headers);
    case 'DELETE':
      return await requestWithoutBody('DELETE', url, headers);
    default:
      return await requestWithoutBody('GET', url, headers);
  }
};

export default async function handler(req: NextRequest): Promise<Response> {
  const params = req.nextUrl.searchParams.getAll('params');

  if (params.length === 0 || params[0] === 'undefined') {
    // Return proxy health if no parameters are provided
    return getProxyHealthResponse();
  } else {
    // Pass the request directly the 3rd party API
    const result = await fetchAPIResponse(req, params);
    let data: unknown;

    try {
      data = await result.json();
    } catch {
      data = { message: 'Error decoding JSON body from API' };
    }

    return new Response(JSON.stringify(data), {
      status: result.status,
      statusText: result.statusText,
      headers: result.headers as HeadersInit,
    });
  }
}
