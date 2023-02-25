import '@/styles/globals.css';
import { Auth0Provider } from '@auth0/auth0-react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain="sf-capp-dev.us.auth0.com"
      clientId="bk8hnOe5NfVA8xsVFy69iYJ1XEn42DTi"
      // authorizationParams={{ redirect_uri: window.location.origin }}
      // authorizationParams={{
      //   redirect_uri: 'http://localhost:3000',
      // }}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}
