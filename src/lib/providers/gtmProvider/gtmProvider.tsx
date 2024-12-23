import { gtmCookieName } from '@/lib/constants/strings';
import { CookiesContext } from '@/lib/providers/cookiesProvider';
import { GtagPoller } from '@/lib/providers/gtmProvider/gtagPoller';
import { IProvider } from '@/lib/providers/shared';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useContext, useEffect, useState } from 'react';

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

// TODO: Probably rename this to UTMProvider so we are consistent
const GTMProvider: React.FC<IProvider> = ({ children }) => {
  const cookiesCtx = useContext(CookiesContext);
  const router = useRouter();
  const [paramsReady, setParamsReady] = useState(false);
  const gtagGetter = new GtagPoller();

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

  useEffect(() => {
    // This grabs most of the params needed from the url and assigns them
    // to an object.
    // Then, it appends the client and session ids from Google Analytics
    // It then stores them in a cookie
    const setGtmValues = async () => {
      const ga_ids = await gtagGetter.getSessionIds(window.gaMeasurementId);
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

      cookiesCtx.set(gtmCookieName, finalValues);
      setParamsReady(true);
    };

    const hasCookieValue = !!cookiesCtx.get(gtmCookieName);

    if (!hasCookieValue && router.isReady) {
      setGtmValues();
    } else if (hasCookieValue) {
      setParamsReady(true);
    }
  }, [router.isReady]);

  // Returns all params in an object, or null if not set
  const getGtmParams = () => cookiesCtx.get(gtmCookieName) ?? null;

  // Grabs a value from the query params and returns it as a string
  const getQueryStringValue = (
    query: ParsedUrlQuery,
    propertyName: string
  ): string | null => (query ? (query[propertyName] as string) : null);

  return (
    <GTMContext.Provider value={{ getGtmParams, paramsSet: paramsReady }}>
      {children}
    </GTMContext.Provider>
  );
};

export default GTMProvider;
