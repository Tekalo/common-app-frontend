// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: NextRequest
): Promise<Response> {
  return new Response(JSON.stringify({ name: "John Doe" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}