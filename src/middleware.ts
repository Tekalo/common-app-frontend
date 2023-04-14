import sentryPlugin from '@cloudflare/pages-plugin-sentry';

export const config = { runtime: 'edge' };

// eslint-disable-next-line no-undef
export const onRequest: PagesFunction = sentryPlugin({
  dsn: 'https://957fb85e991e41e1b624969dec7932ef@o4504962952724480.ingest.sentry.io/4504991639928833',
});

export default function middleware() {}
