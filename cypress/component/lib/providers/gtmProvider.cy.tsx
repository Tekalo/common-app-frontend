import {
  gtag_mockClientId,
  gtag_mockSessionId,
  mockGtag,
} from '@/cypress/fixtures/mocks';
import { gtmCookieName } from '@/lib/constants/strings';
import { voidFn } from '@/lib/helpers/utilities';
import CookiesProvider from '@/lib/providers/cookiesProvider';
import GTMProvider, {
  GTMContext,
  IGtmParams,
} from '@/lib/providers/gtmProvider/gtmProvider';
import * as RouterModule from 'next/router';
import { useContext, useEffect, useState } from 'react';

const TestComponent: React.FC = () => {
  const gtmCtx = useContext(GTMContext);
  const [utmParams, setUtmParams] = useState<IGtmParams>({});

  useEffect(() => {
    const params = gtmCtx.getGtmParams();
    setUtmParams(params);
  }, [gtmCtx.paramsSet]);

  return (
    <div id="content">
      <p id="ga_client_id">{utmParams?.ga_client_id}</p>
      <p id="ga_session_id">{utmParams?.ga_session_id}</p>
      <p id="utm_campaign">{utmParams?.utm_campaign}</p>
      <p id="utm_content">{utmParams?.utm_content}</p>
      <p id="utm_id">{utmParams?.utm_id}</p>
      <p id="utm_medium">{utmParams?.utm_medium}</p>
      <p id="utm_source_platform">{utmParams?.utm_source_platform}</p>
      <p id="utm_source">{utmParams?.utm_source}</p>
      <p id="utm_term">{utmParams?.utm_term}</p>
    </div>
  );
};

Cypress.Commands.add('mountGtmProvider', () => {
  cy.mount(
    <>
      <CookiesProvider>
        <GTMProvider>
          <TestComponent />
        </GTMProvider>
      </CookiesProvider>
    </>
  );
});

describe('GTM Provider', () => {
  const emptyVal = '';
  let mockQueryContents: any;

  beforeEach(() => {
    const getQueryContents = () => mockQueryContents;
    window.gtag = mockGtag;

    cy.stub(RouterModule, 'useRouter').callsFake(() => {
      const mockRouter = {
        isReady: true,
        query: getQueryContents(),
      };

      return mockRouter;
    });
  });

  it('should display no params, just session ids', () => {
    mockQueryContents = null;

    cy.mountGtmProvider();

    cy.get('#utm_campaign').should('have.text', emptyVal);
    cy.get('#utm_content').should('have.text', emptyVal);
    cy.get('#utm_id').should('have.text', emptyVal);
    cy.get('#utm_medium').should('have.text', emptyVal);
    cy.get('#utm_source_platform').should('have.text', emptyVal);
    cy.get('#utm_source').should('have.text', emptyVal);
    cy.get('#utm_term').should('have.text', emptyVal);
    cy.get('#ga_client_id').should('have.text', gtag_mockClientId);
    cy.get('#ga_session_id').should('have.text', gtag_mockSessionId);
  });

  it('should display all params', () => {
    mockQueryContents = {
      utm_campaign: 1,
      utm_content: 2,
      utm_id: 3,
      utm_medium: 4,
      utm_source_platform: 5,
      utm_source: 6,
      utm_term: 7,
    };

    cy.mountGtmProvider();

    cy.get('#ga_client_id').should('have.text', gtag_mockClientId);
    cy.get('#ga_session_id').should('have.text', gtag_mockSessionId);
    cy.get('#utm_campaign').should('have.text', '1');
    cy.get('#utm_content').should('have.text', '2');
    cy.get('#utm_id').should('have.text', '3');
    cy.get('#utm_medium').should('have.text', '4');
    cy.get('#utm_source_platform').should('have.text', '5');
    cy.get('#utm_source').should('have.text', '6');
    cy.get('#utm_term').should('have.text', '7');
  });

  it('should grab the available params', () => {
    mockQueryContents = {
      utm_campaign: 1,
      utm_content: 2,
      utm_medium: 4,
      utm_source: 6,
      utm_term: 7,
    };

    cy.mountGtmProvider();

    cy.get('#ga_client_id').should('have.text', gtag_mockClientId);
    cy.get('#ga_session_id').should('have.text', gtag_mockSessionId);
    cy.get('#utm_campaign').should('have.text', '1');
    cy.get('#utm_content').should('have.text', '2');
    cy.get('#utm_id').should('have.text', emptyVal);
    cy.get('#utm_medium').should('have.text', '4');
    cy.get('#utm_source_platform').should('have.text', emptyVal);
    cy.get('#utm_source').should('have.text', '6');
    cy.get('#utm_term').should('have.text', '7');
  });

  it('should set empty strings for session and client id if gtag is blocked', () => {
    mockQueryContents = {
      utm_source: 123,
      utm_campaign: 345,
    };
    window.gtag = voidFn;

    cy.mountGtmProvider();

    cy.get('#utm_campaign').should('have.text', '345');
    cy.get('#utm_content').should('have.text', emptyVal);
    cy.get('#utm_id').should('have.text', emptyVal);
    cy.get('#utm_medium').should('have.text', emptyVal);
    cy.get('#utm_source_platform').should('have.text', emptyVal);
    cy.get('#utm_source').should('have.text', '123');
    cy.get('#utm_term').should('have.text', emptyVal);
    cy.get('#ga_client_id').should('have.text', emptyVal);
    cy.get('#ga_session_id').should('have.text', emptyVal);
  });

  it('should display the already-set cookie values', () => {
    const mockUtm = {
      utm_source: 123,
      utm_campaign: 345,
      ga_client_id: gtag_mockClientId,
      ga_session_id: gtag_mockSessionId,
    };
    cy.setCookie(gtmCookieName, JSON.stringify(mockUtm));

    cy.mountGtmProvider();

    cy.get('#ga_client_id').should('have.text', gtag_mockClientId);
    cy.get('#ga_session_id').should('have.text', gtag_mockSessionId);
    cy.get('#utm_campaign').should('have.text', '345');
    cy.get('#utm_source').should('have.text', '123');
  });
});
