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

const GTMProvider: React.FC<IProvider> = ({ children }) => {
  // Lib classes
  const cookies = new Cookies(null, { path: '/' });
  const router = useRouter();
  const [paramsReady, setParamsReady] = useState(false);

  // Const
  const gtmCookieName = 'tklo_gtm_params';
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

  useEffect(() => {
    // This grabs most of the params needed from the url and assigns them
    // to an object.
    // Then, it appends the client and session ids from Google Analytics
    // It then stores them in a cookie
    const setGtmValues = async () => {
      const ga_ids = await getSessionIds(window.gaMeasurementId);
      const routerQuery = router.query;

      const gtmParams = paramList.reduce(
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
      window.gtag('get', id, valueName, resolve);
    } else {
      null;
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
      const clientIdPromise = new Promise<string>((resolve) => {
        getGtagValue('client_id', id, resolve);
      });
      const sessionIdPromise = new Promise<string>((resolve) => {
        getGtagValue('session_id', id, resolve);
      });

      Promise.all([clientIdPromise, sessionIdPromise]).then((values) => {
        resolve(values);
      });
    });
  };

  return (
    <GTMContext.Provider value={{ getGtmParams, paramsSet: paramsReady }}>
      {children}
    </GTMContext.Provider>
  );
};

export default GTMProvider;
