import type { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/require-await
export default async function handler(req: NextRequest) {
  return new Response(
    JSON.stringify({
      name: "Seth Martin",
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}

export const config = {
  runtime: "edge",
};
