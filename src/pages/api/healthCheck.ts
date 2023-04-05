// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const url = `http://localhost:3000/health`;

const fetchData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default async function handler(_req: NextRequest): Promise<Response> {
  const result = await fetchData();
  console.log(result);
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
