// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

type HeadersInit = [string, string][] | Record<string, string> | Headers;
const fetchResponse = async (req: NextRequest, params: string[]) => {
  const BASE_URL = (() => {
    switch (process.env.ENVIRONMENT) {
      case 'production':
        return 'https://capp-api.prod.apps.futurestech.cloud';
      case 'staging':
        return 'https://capp-api.dev.apps.futurestech.cloud';
      case 'development':
        return 'https://localhost:3000';
      default:
        return 'http://localhost:3000';
    }
  })();

  const url = `${BASE_URL}/${params.join('/')}`;
  const sessionCookie = req.cookies.get('connect.sid');
  const cookieHeader = `${sessionCookie?.name}=${sessionCookie?.value}`;

  switch (req.method) {
    case 'POST':
      return await fetch(url, {
        method: 'POST',
        body: req.body,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieHeader,
        } as HeadersInit,
      });
    case 'PUT':
      return await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(req.body),
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieHeader,
        } as HeadersInit,
      });
    case 'PATCH':
      return await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(req.body),
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieHeader,
        } as HeadersInit,
      });
    case 'DELETE':
      return await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieHeader,
        } as HeadersInit,
      });
    default:
      return await fetch(url, {
        method: 'GET',
        headers: {
          Cookie: cookieHeader,
          auth: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFCV3V5NkRFZUpweVlvQUFXTW95UCJ9.eyJhdXRoMC5jYXBwLmNvbS9lbWFpbCI6InRoYXdraW5zQHNjaG1pZHRmdXR1cmVzLmNvbSIsImlzcyI6Imh0dHBzOi8vY2FwcC1hdXRoLmRldi5hcHBzLmZ1dHVyZXN0ZWNoLmNsb3VkLyIsInN1YiI6ImF1dGgwfDY0NGFjNWZmNWVmOWIyNTE5MTU4NjdmYSIsImF1ZCI6WyJhdXRoMC5jYXBwLmNvbSIsImh0dHBzOi8vc2YtY2FwcC1kZXYudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4MjY5ODQzOSwiZXhwIjoxNjgyNzg0ODM5LCJhenAiOiJiazhobk9lNU5mVkE4eHNWRnk2OWlZSjFYRW40MkRUaSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.Zeht2RTmAdda9hkGeM-rnuhYnXW84XJZ2F0e8JxhpoIAITUn3Wm5MHvwkrkFas-w8usyE-X6eba_O-Vb8HLzgUSqpUvyPbmT2cq4AxRaGVC9n7ye4r5U9XTZEPk8E_bZD8jx2_3M6zvC66cfI-qwrTVfYSyLfONgAAeXuoRfHdGfziC5a8pBOJnpaJrlUBuHATWIq72MkEJ3qywso0WBckwJu9xeUkMDGsD3JCd2NHjB80nDYnL6KXRYnR3HzEIY5WT0SFOb7iMp42Mu23FmSljISBg-NO1BQofBJJ5uEt_w3PFqRwMlSMnPpGYcNXSBZhOSmL2EHMDJtZpnGNcgYA',
        },
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

    // TODO: Handle the various status codes

    return new Response(JSON.stringify(data), {
      status: result.status,
      statusText: result.statusText,
      headers: result.headers as HeadersInit,
    });
  }
}
