import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { IProvider } from './shared';

interface IGTMContext {
  getGtmParams: () => IGtmParams;
  paramsSet: boolean;
}

export const GTMContext = React.createContext<IGTMContext>({} as IGTMContext);

export interface IGtmParams {
  ga_client_id?: string;
  ga_session_id?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_id?: string;
  utm_medium?: string;
  utm_source_platform?: string;
  utm_source?: string;
  utm_term?: string;
}

export const gtmCookieName = 'tklo_gtm_params';

// TODO: Probably rename this to UTMProvider so we are consistent
const GTMProvider: React.FC<IProvider> = ({ children }) => {
  // Lib classes
  // TODO: Move this to a central provider
  const cookies = new Cookies(null, { path: '/' });
  const router = useRouter();
  const [paramsReady, setParamsReady] = useState(false);

  // Const
  const paramList = [
    'ga_client_id',
    'ga_session_id',
    'utm_campaign',
    'utm_content',
    'utm_id',
    'utm_medium',
    'utm_source_platform',
    'utm_source',
    'utm_term',
  ];
  const emptyValue = '';

  useEffect(() => {
    // This grabs most of the params needed from the url and assigns them
    // to an object.
    // Then, it appends the client and session ids from Google Analytics
    // It then stores them in a cookie
    const setGtmValues = async () => {
      const ga_ids = await getSessionIds(window.gaMeasurementId);
      const routerQuery = router.query;

      const gtmParams: IGtmParams = paramList.reduce(
        (k, v) => ({ ...k, [v]: getQueryStringValue(routerQuery, v) }),
        {}
      );

      const finalValues = {
        ...gtmParams,
        ga_client_id: ga_ids[0],
        ga_session_id: ga_ids[1],
      };

      cookies.set(gtmCookieName, finalValues);
      setParamsReady(true);
    };

    const hasCookieValue = !!cookies.get(gtmCookieName);

    if (!hasCookieValue && router.isReady) {
      setGtmValues();
    } else if (hasCookieValue) {
      setParamsReady(true);
    }
  }, [router.isReady]);

  // Calls gtag for a value
  const getGtagValue = (
    valueName: 'client_id' | 'session_id',
    id: string,
    resolve: (value: string | PromiseLike<string>) => void
  ): void => {
    if (window && window.gtag) {
      console.log(`getting ${valueName}`);
      window.gtag('get', id, valueName, resolve);

      // If gtag is blocked, this will never return, we must set default values
      let i = 0;
      const requestInt = setInterval(() => {
        i++;

        console.log('interval', i);

        const cookieValue = cookies.get(gtmCookieName);
        console.log(cookieValue);

        if (cookieValue) {
          console.log('present', cookieValue);
          clearInterval(requestInt);
          return;
        } else if (i === 10) {
          console.log('loops done');
          resolve(emptyValue);
          clearInterval(requestInt);
        }
      }, 500);
    } else {
      resolve(emptyValue);
    }
  };

  // Returns all params in an object, or null if not set
  const getGtmParams = () => cookies.get(gtmCookieName) ?? null;

  // Grabs a value from the query params and returns it as a string
  const getQueryStringValue = (
    query: ParsedUrlQuery,
    propertyName: string
  ): string | null => (query ? (query[propertyName] as string) : null);

  // Returns a promise resolving in the two session ids from gtag
  const getSessionIds = (id: string): Promise<string[]> => {
    return new Promise<string[]>((resolve) => {
      const clientIdPromise = pollForGtagValue('client_id', id);
      const sessionIdPromise = pollForGtagValue('session_id', id);

      Promise.all([clientIdPromise, sessionIdPromise]).then((values) => {
        resolve(values);
      });
    });
  };

  const pollForGtagValue = async (
    valueName: 'client_id' | 'session_id',
    id: string
  ) => {
    return new Promise<string>((resolve) => {
      let i = 0;

      const gtagInt = setInterval(() => {
        i++;

        console.log(`polling gtag ${valueName}`, i);

        if (window.gtag) {
          getGtagValue(valueName, id, resolve);
          clearInterval(gtagInt);
        } else if (i === 10) {
          clearInterval(gtagInt);
        }
      }, 500);
    });
  };

  return (
    <GTMContext.Provider value={{ getGtmParams, paramsSet: paramsReady }}>
      {children}
    </GTMContext.Provider>
  );
};

export default GTMProvider;
