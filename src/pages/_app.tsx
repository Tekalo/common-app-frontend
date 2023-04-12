import { NextPageWithLayout } from '@/lib/types';
import '@/styles/globals.css';
import { Auth0Provider } from '@auth0/auth0-react';
import * as Sentry from '@sentry/browser';
import type { AppProps } from 'next/app';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const SENTRY_DSN = process.env.SENTRY_DSN;
const SENTRY_ENVIRONMENT = process.env.ENVIRONMENT;

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  Sentry.init({
    dsn: SENTRY_DSN,
    release: process.env.npm_package_version,
    environment: SENTRY_ENVIRONMENT,
    integrations: [new Sentry.BrowserTracing()],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Auth0Provider
      domain="sf-capp-dev.us.auth0.com"
      clientId="bk8hnOe5NfVA8xsVFy69iYJ1XEn42DTi"
      authorizationParams={{
        redirect_uri:
          typeof window === 'undefined' ? undefined : window.location.origin,
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </Auth0Provider>
  );
}
