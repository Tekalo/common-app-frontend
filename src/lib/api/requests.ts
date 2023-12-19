import { NextRequest } from 'next/server';

export const requestWithBody = (
  method: string,
  url: string,
  req: NextRequest,
  headers: any
) =>
  fetch(url, {
    method: method,
    body: req.body,
    headers,
  });

export const requestWithoutBody = (method: string, url: string, headers: any) =>
  fetch(url, {
    method: method,
    headers,
  });
