import { TurnstileServerValidationResponse } from '@marsidev/react-turnstile';
import { NextRequest } from 'next/server';

export const validateTurnstileAndPost = async (
  turnstileToken: string,
  turnstileSecret: string,
  turnstileEndpoint: string,
  url: string,
  req: NextRequest,
  headers: any
) => {
  // Validate the x-turnstile-token header
  const res = await fetch(turnstileEndpoint, {
    method: 'POST',
    body: `secret=${encodeURIComponent(
      turnstileSecret
    )}&response=${encodeURIComponent(turnstileToken)}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  });
  const data = (await res.json()) as TurnstileServerValidationResponse;
  if (data.success) {
    // Call our API
    return await fetch(url, {
      method: 'POST',
      body: req.body,
      headers,
    });
  }
  // Otherwise return an error
  return getTurnstileRejectionResponse();
};

export const getTurnstileRejectionResponse = () =>
  new Response(
    JSON.stringify({
      message:
        'Our robot guardians determined that you are likely a teapot - please try again and do your best to not be a teapot this time',
    }),
    {
      status: 418,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
