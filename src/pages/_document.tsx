import { META } from '@/lang/en/en';
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
          }

          function dataLayerEvent(eventName) {
            window.dataLayer.push({'event': eventName});
          }        
        `}</Script>
        <meta name="title" content="" />
        <meta name="description" content={META.DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tekalo.org/" />
        <meta property="og:title" content={META.TITLE} />
        <meta property="og:description" content={META.DESCRIPTION} />
        <meta property="og:image" content={META.IMAGE} />

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content="https://www.tekalo.org/" />
        <meta property="twitter:title" content={META.TITLE} />
        <meta property="twitter:site" content={META.TWITTER_HANDLE} />
        <meta property="twitter:description" content={META.DESCRIPTION} />
        <meta property="twitter:image" content={META.IMAGE} />
        <meta property="twitter:image:alt" content={META.ALT_TEXT} />
        <link
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
        />
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
