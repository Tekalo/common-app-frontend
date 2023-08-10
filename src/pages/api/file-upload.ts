import { IFileUploadBody } from '@/lib/providers/fileUploadProvider';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest): Promise<Response> {
  const fileDetails = (await req.json()) as IFileUploadBody;

  return await fetch(fileDetails.signedLink, {
    method: 'PUT',
    body: Buffer.from(fileDetails.file, 'base64'),
    headers: {
      'Content-Type': fileDetails.type,
    },
  });
}
