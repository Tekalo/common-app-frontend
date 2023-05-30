import type { TurnstileServerValidationResponse } from '@marsidev/react-turnstile';

const verifyEndpoint =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const secret = process.env.TURNSTILE_SECRET || '';

export async function POST(request: Request) {
  const { token } = (await request.json()) as { token: string };

  const res = await fetch(verifyEndpoint, {
    method: 'POST',
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(
      token
    )}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  });

  console.log('in api, res', res);

  const data = (await res.json()) as TurnstileServerValidationResponse;

  console.log(data);

  return new Response(JSON.stringify(data), {
    status: data.success ? 200 : 400,
    headers: {
      'content-type': 'application/json',
    },
  });
}
