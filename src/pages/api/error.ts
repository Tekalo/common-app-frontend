import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  _res: NextApiResponse
): Promise<Response> {
  throw new Error('API throw error test');
  //   res.status(200).json({ name: 'John Doe' });
}
