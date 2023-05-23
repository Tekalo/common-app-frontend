import RankChoiceCard from '@/components/input/rankChoice/RankChoiceCard';
import { COOKIE_CONSENT_COPY } from '@/lang/en';
import { NextPageWithLayout } from '@/lib/types';
import '@/styles/globals.css';
import { Auth0Provider } from '@auth0/auth0-react';
import * as Sentry from '@sentry/react';
import type { AppProps } from 'next/app';
import CookieConsent, { OPTIONS } from 'react-cookie-consent';
import { DndProvider } from 'react-dnd';
import { Preview } from 'react-dnd-preview';
import { TouchBackend } from 'react-dnd-touch-backend';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
  tracesSampleRate: 1.0,
});

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    // TODO: Move to env variables
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
      authorizationParams={{
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
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
          <CookieConsent
            disableStyles={true}
            location={OPTIONS.BOTTOM}
            buttonText="Accept"
            cookieName="tekalo-opt-in-cookie"
            containerClasses="text-black-text px-6 py-4 items-center bg-gray-4 flex justify-between fixed bottom-0 left-0 right-0"
            buttonClasses="text-black-text bg-blue-1 rounded font-sans
            text-component-large transition-colors hover:bg-blue-2
            focus-visible:ring-2 focus-visible:ring-[#A7C4DB]
            active:border-blue-3 active:bg-blue-3 text-white py-2 px-6"
          >
            {COOKIE_CONSENT_COPY}
          </CookieConsent>
          <Preview generator={RankChoiceCard.generatePreview} />
        </DndProvider>
      </Sentry.ErrorBoundary>
    </Auth0Provider>
  );
}

export default App;
