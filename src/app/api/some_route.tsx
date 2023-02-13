// ./pages/api/some_route.ts

import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

// eslint-disable-next-line @typescript-eslint/require-await
export default async function handler(req: NextRequest) {
  return new Response(
    JSON.stringify({
      name: process.env.NEXT_RUNTIME,
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
