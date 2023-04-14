import sentryPlugin from '@cloudflare/pages-plugin-sentry';
import { NextResponse } from 'next/server';

export const config = { runtime: 'experimental-edge' };

// Sentry plugin for capturing server-side errors
// https://developers.cloudflare.com/pages/platform/functions/plugins/sentry/
// eslint-disable-next-line no-undef
// export const onRequest: PagesFunction = sentryPlugin({
//   dsn: 'https://957fb85e991e41e1b624969dec7932ef@o4504962952724480.ingest.sentry.io/4504991639928833',
// });

export default function middleware(): Response {
  sentryPlugin({
    dsn: 'https://957fb85e991e41e1b624969dec7932ef@o4504962952724480.ingest.sentry.io/4504991639928833',
  });
  return NextResponse.next();
}
