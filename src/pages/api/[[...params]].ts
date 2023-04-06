// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const BASE_URL = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://api.example.com';
    case 'test':
      return 'https://staging-api.example.com';
    case 'development':
      return 'https://capp-api.dev.apps.futurestech.cloud';
    default:
      return 'http://localhost:3000';
  }
};

const fetchResponse = async (req: NextRequest, params: string[]) => {
  const url = `${BASE_URL}/${params.join('/')}`;
  const response = await fetch(url, {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  const data = await response.json();
  return data;
};

export default async function handler(req: NextRequest): Promise<Response> {
  const params = req.nextUrl.searchParams.getAll('params');

  // If params is empty return proxy health
  if (params.length === 0) {
    return new Response(
      JSON.stringify({
        proxy: 'OK',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // If params is not empty, pass the request directly the 3rd party API
  const result = await fetchResponse(req, params);

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
