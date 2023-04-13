import sentryPlugin from '@cloudflare/pages-plugin-sentry';
import { NextRequest } from 'next/server';

const SENTRY_DSN = process.env.SENTRY_DSN;
const SENTRY_ENVIRONMENT = process.env.ENVIRONMENT;

export const config = { runtime: 'experimental-edge' };

// Cloudflare requires a different configuration than that recommended
// in the Sentry nextjs documentation.
// https://developers.cloudflare.com/pages/platform/functions/plugins/sentry/
// eslint-disable-next-line no-undef
export const onRequest: PagesFunction<{ SENTRY_DSN: string }> = (context) => {
  return sentryPlugin({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENVIRONMENT,
  })(context);
};

export default function middleware(request: NextRequest, context) {}
