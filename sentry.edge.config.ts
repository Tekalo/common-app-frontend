import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;
const ENV = process.env.APP_ENV;

Sentry.init({
  dsn:
    SENTRY_DSN ||
    'https://957fb85e991e41e1b624969dec7932ef@o4504962952724480.ingest.sentry.io/4504991639928833',
  environment: ENV || 'dev',
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
