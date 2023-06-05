import { META_DESCRIPTION } from '@/lang/en';
import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  const gtmScript = {
    prod: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MQBC5JW');`,
    nonProd: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=eZwS2RflCR8tx2xt255HTw&gtm_preview=env-7&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MQBC5JW');`,
  };

  const gtmIframe = {
    prod: 'https://www.googletagmanager.com/ns.html?id=GTM-MQBC5JW',
    nonProd:
      'https://www.googletagmanager.com/ns.html?id=GTM-MQBC5JW&gtm_auth=eZwS2RflCR8tx2xt255HTw&gtm_preview=env-7&gtm_cookies_win=x',
  };

  return (
    <Html lang="en">
      <Head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
            ? gtmScript.prod
            : gtmScript.nonProd}
        </Script>
        <Script id="set-consent" strategy="afterInteractive">{`
            function consentGranted() {

            window.dataLayer.push({'event':'consent_form_submit', 'accept':true});
        }`}</Script>
        <meta name="description" content={META_DESCRIPTION} />
        {/* <link
          rel="preload"
          href="/fonts/Figtree-VariableFont_wght.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Figtree-Italic-VariableFont_wght.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GraphikMedium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
        <noscript>
          <iframe
            src={
              process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
                ? gtmIframe.prod
                : gtmIframe.nonProd
            }
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      </body>
    </Html>
  );
}
