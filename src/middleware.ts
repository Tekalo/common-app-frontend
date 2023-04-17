import * as Sentry from '@sentry/react';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const SENTRY_DSN =
  'https://957fb85e991e41e1b624969dec7932ef@o4504962952724480.ingest.sentry.io/4504991639928833';

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
});

// Sentry plugin for capturing server-side errors
// https://developers.cloudflare.com/pages/platform/functions/plugins/sentry/
// eslint-disable-next-line no-undef
// export const onRequest: PagesFunction = sentryPlugin({
//   dsn: 'https://957fb85e991e41e1b624969dec7932ef@o4504962952724480.ingest.sentry.io/4504991639928833',
// });

export default async function middleware() {
  // sentryPlugin({
  //   dsn: 'https://957fb85e991e41e1b624969dec7932ef@o4504962952724480.ingest.sentry.io/4504991639928833',
  // });
  // return NextResponse.next();
  try {
    return await NextResponse.next();
  } catch (thrown) {
    Sentry.captureException(thrown);
    throw thrown;
  }
}

// eslint-disable-next-line no-undef
// export const onRequest: PagesFunction<{
//   SENTRY_DSN: string;
// }> = (context) => {
//   return sentryPlugin({
//     dsn: 'https://957fb85e991e41e1b624969dec7932ef@o4504962952724480.ingest.sentry.io/4504991639928833',
//   })(context);
// };
