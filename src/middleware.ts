import sentryPlugin from '@cloudflare/pages-plugin-sentry';
import { NextRequest, NextResponse } from 'next/server';

const SENTRY_DSN = process.env.SENTRY_DSN;
const SENTRY_ENVIRONMENT = process.env.ENVIRONMENT;

// Cloudflare requires a different configuration than that recommended
// in the Sentry nextjs documentation.
// https://developers.cloudflare.com/pages/platform/functions/plugins/sentry/
// eslint-disable-next-line no-undef
export const onRequest: PagesFunction = sentryPlugin({
  dsn: SENTRY_DSN,
  environment: SENTRY_ENVIRONMENT,
});

export const config = {
  runtime: 'experimental-edge',
};

async function middleware(req: NextRequest, res: NextResponse) {
  return NextResponse.next();
}

export default middleware;
