// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

// const BASE_URL = (() => {
//   switch (process.env.NODE_ENV) {
//     case 'production':
//       return 'https://api.example.com';
//     case 'test':
//       return 'https://capp-api.dev.apps.futurestech.cloud';
//     case 'development':
//       return 'http://localhost:3000';
//     default:
//       return 'http://localhost:3000';
//   }
// })();

const fetchResponse = async (req: NextRequest, params: string[]) => {
  const url = `https://capp-api.dev.apps.futurestech.cloud/${params.join('/')}`;
  // const url = `${BASE_URL}/${params.join('/')}`;

  switch (req.method) {
    case 'POST':
      return await fetch(url, {
        method: 'POST',
        body: req.body,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    case 'PUT':
      return await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(req.body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    case 'PATCH':
      return await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(req.body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    case 'DELETE':
      return await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    default:
      return await fetch(url, {
        method: 'GET',
      });
  }
};

export default async function handler(req: NextRequest): Promise<Response> {
  const params = req.nextUrl.searchParams.getAll('params');

  // If params is empty return proxy health
  if (params.length === 0) {
    console.log('PARAMS LENGTH IS ZERO!');
    console.log('PARAMS LENGTH IS ZERO!');
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
  } else {
    console.log('PARAMS LENGTH IS NOT ZERO!');
    // If params is not empty, pass the request directly the 3rd party API
    const result = await fetchResponse(req, params);
    const data = await result.json();
    // TODO: Fixme if the response is not JSON the worker segfaults
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
