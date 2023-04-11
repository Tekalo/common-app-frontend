import sentryPlugin from '@cloudflare/pages-plugin-sentry';

const SENTRY_DSN = process.env.SENTRY_DSN;

// Cloudflare requires a different configuration than that recommended
// in the Sentry nextjs documentation.
// https://developers.cloudflare.com/pages/platform/functions/plugins/sentry/
// eslint-disable-next-line no-undef
export const onRequest: PagesFunction = sentryPlugin({
  dsn: SENTRY_DSN,
});
