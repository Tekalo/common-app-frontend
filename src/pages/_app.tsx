import RankChoiceCard from '@/components/input/rankChoice/RankChoiceCard';
import { NextPageWithLayout } from '@/lib/types';
import '@/styles/globals.css';
import { Auth0Provider } from '@auth0/auth0-react';
import * as Sentry from '@sentry/react';
import type { AppProps } from 'next/app';
import { DndProvider } from 'react-dnd';
import { Preview } from 'react-dnd-preview';
import { TouchBackend } from 'react-dnd-touch-backend';
interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

let AUTH0_DOMAIN: string;
let AUTH0_CLIENT_ID: string;
let AUTH0_AUDIENCE: string;
let SENTRY_DSN: string;
let SENTRY_ENV: string;
let TEST_VAR: string;

const SET_ENV = () => {
  AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || '';
  AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || '';
  AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || '';
  SENTRY_DSN = process.env.SENTRY_DSN || '';
  SENTRY_ENV = process.env.SENTRY_ENV || '';
  TEST_VAR = process.env.TEST_VAR || '';
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  SET_ENV();

  console.log('TEST_VAR: ', TEST_VAR);
  console.log('AUTH DOMAIN: ', AUTH0_DOMAIN);
  console.log('AUTH0_AUDIENCE', AUTH0_AUDIENCE);
  console.log('AUTH0_CLIENT_ID', AUTH0_CLIENT_ID);
  console.log('SENTRY_DSN', SENTRY_DSN);
  console.log('SENTRY_ENV', SENTRY_ENV);

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENV,
    tracesSampleRate: 1.0,
  });

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    // TODO: Move to env variables
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        audience: AUTH0_AUDIENCE,
        redirect_uri:
          typeof window === 'undefined' ? undefined : window.location.origin,
      }}
    >
      <Sentry.ErrorBoundary // Enable Sentry by wrapping component with ErrorBoundary
        fallback={({ error }) => (
          <>
            {
              'An error occurred. Please try again later or contact support. Error:'
            }
            {error}
          </>
        )}
        showDialog
      >
        <DndProvider
          backend={TouchBackend}
          options={{ enableMouseEvents: true }}
        >
          {getLayout(<Component {...pageProps} />)}
          <Preview generator={RankChoiceCard.generatePreview} />
        </DndProvider>
      </Sentry.ErrorBoundary>
    </Auth0Provider>
  );
}

export default App;
