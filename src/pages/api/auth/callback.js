import { handleCallback } from '@auth0/nextjs-auth0';

export const config = {
  runtime: 'edge',
};

export default async function login(req, res) {
  try {
    await handleCallback(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
