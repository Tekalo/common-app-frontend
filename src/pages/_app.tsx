import { NextPageWithLayout } from '@/lib/types';
import '@/styles/globals.css';
import { Auth0Provider } from '@auth0/auth0-react';
import type { AppProps } from 'next/app';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Auth0Provider
      domain="sf-capp-dev.us.auth0.com"
      clientId="bk8hnOe5NfVA8xsVFy69iYJ1XEn42DTi"
      authorizationParams={{
        audience: 'https://auth0.capp.com',
        redirect_uri:
          typeof window === 'undefined' ? undefined : window.location.origin,
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </Auth0Provider>
  );
}
