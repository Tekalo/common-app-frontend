import RankChoiceCard from '@/components/input/rankChoice/RankChoiceCard';
import { ERROR_TEXT } from '@/lang/en';
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

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
  tracesSampleRate: 0.25,
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
            {ERROR_TEXT.fallbackError}
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
