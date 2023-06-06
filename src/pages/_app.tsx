import RankChoiceCard from '@/components/input/rankChoice/RankChoiceCard';
import { COOKIE_CONSENT, ERROR_TEXT, TERMS_LINK } from '@/lang/en';
import { NextPageWithLayout } from '@/lib/types';
import '@/styles/globals.css';
import { Auth0Provider } from '@auth0/auth0-react';
import * as Sentry from '@sentry/react';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import CookieConsent, {
  OPTIONS,
  getCookieConsentValue,
} from 'react-cookie-consent';
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
  const cookieName = 'tekalo-opt-in-cookie';

  if (getCookieConsentValue(cookieName) === 'true') {
    // this fn is in `globals.d.ts` if you need to see it
    window.consentGranted();
  }

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  const cookieBtnClasses =
    'mt-4 text-black-text w-full bg-blue-1 rounded font-sans text-component-large transition-colors hover:bg-blue-2 focus-visible:ring-2 focus-visible:ring-[#A7C4DB] active:border-blue-3 active:bg-blue-3 text-white py-2 px-6 md:w-auto lg:mt-0';

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
          <CookieConsent
            onAccept={() => window.consentGranted()}
            enableDeclineButton
            declineButtonText={COOKIE_CONSENT.DECLINE_BTN}
            disableStyles={true}
            location={OPTIONS.BOTTOM}
            buttonText={COOKIE_CONSENT.ACCEPT_BTN}
            cookieName={cookieName}
            containerClasses="text-black-text text-p3-mobile px-6 py-4 items-center bg-gray-4 flex flex-col justify-between fixed bottom-0 left-0 right-0 z-50 md:py-6 lg:flex-row lg:items-start lg:text-p3-desktop"
            buttonWrapperClasses="w-full mt-2 md:flex md:justify-end md:gap-x-4 md:mt-0 lg:flex-1 lg:ml-10"
            buttonClasses={cookieBtnClasses}
            declineButtonClasses={cookieBtnClasses}
          >
            {COOKIE_CONSENT.COPY[0]}
            <Link
              className="text-blue-1 underline"
              href={TERMS_LINK}
              target="_blank"
            >
              {COOKIE_CONSENT.COPY[1]}
            </Link>
            {COOKIE_CONSENT.COPY[2]}
          </CookieConsent>
          <Preview generator={RankChoiceCard.generatePreview} />
        </DndProvider>
      </Sentry.ErrorBoundary>
    </Auth0Provider>
  );
}

export default App;
