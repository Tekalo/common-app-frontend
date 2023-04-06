// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const port = process.env.PORT || 3000;
const url = `http://localhost:${port}/applicants`;

// TODO: Accept a typed body for a new applicant
// TODO: Return a typed response for the new applicant
// TODO: Figure out how the applicant receives a cookie/session from creation

const postData = async (body: any) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

export default async function handler(_req: NextRequest): Promise<Response> {
  const result = await postData({});
  console.log(result);
  return new Response(JSON.stringify(result));
}
