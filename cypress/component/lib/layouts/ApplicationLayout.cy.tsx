import { getMockAuth0Context } from '@/cypress/fixtures/mocks';
import {
  ACCOUNT_LINK,
  CONTACT_US_MAILTO_LINK,
  NAV_BAR_TEXT,
  NAV_LITE_FOOTER_TEXT,
  NAV_LITE_HEADER_TEXT,
  PRIVACY_LINK,
  TERMS_LINK,
} from '@/lang/en';
import ApplicationLayout, {
  IApplicationLayout,
} from '@/lib/layouts/forms/application/ApplicationLayout';
import { Auth0Context, Auth0ContextInterface, User } from '@auth0/auth0-react';

Cypress.Commands.add(
  'mountApplicationLayout',
  (auth0Context: Auth0ContextInterface<User>, props: IApplicationLayout) => {
    cy.mount(
      <Auth0Context.Provider value={auth0Context}>
        <ApplicationLayout
          isEditing={props.isEditing ? props.isEditing : undefined}
        >
          <div id="mock-content">Content</div>
        </ApplicationLayout>
      </Auth0Context.Provider>
    );
  }
);

describe('ApplicationLayout', () => {
  let mockAuth0Context: Auth0ContextInterface<User>;
  let props: IApplicationLayout;

  beforeEach(() => {
    mockAuth0Context = getMockAuth0Context();
  });

  describe('loading', () => {
    beforeEach(() => {
      mockAuth0Context.isLoading = true;
      props = {
        isEditing: false,
      };
    });

    it('should display the correct loading content', () => {
      cy.mountApplicationLayout(mockAuth0Context, props);

      cy.get('a[data-name=lite-navbar-logo-link]').should(
        'have.attr',
        'href',
        '/'
      );
      cy.get('img[data-name=lite-navbar-logo]').should(
        'have.attr',
        'src',
        '/images/logo_nav.png'
      );
      cy.get('div[data-name=lite-navbar-title]').should(
        'have.text',
        NAV_BAR_TEXT.FOR_CANDIDATES
      );
      cy.get('div[data-name=lite-navbar-loading-content]').should('be.visible');
    });
  });

  describe('not editing', () => {
    beforeEach(() => {
      props = {
        isEditing: false,
      };
    });

    it('should have correct navbar elements when not authenticated', () => {
      cy.mountApplicationLayout(mockAuth0Context, props);

      cy.get('a[data-name=lite-navbar-logo-link]').should(
        'have.attr',
        'href',
        '/'
      );
      cy.get('img[data-name=lite-navbar-logo]').should(
        'have.attr',
        'src',
        '/images/logo_nav.png'
      );
      cy.get('div[data-name=lite-navbar-title]').should(
        'have.text',
        NAV_BAR_TEXT.FOR_CANDIDATES
      );
      cy.get('a[data-name=lite-navbar-contact-btn]')
        .should('have.attr', 'href', CONTACT_US_MAILTO_LINK)
        .should('have.text', NAV_LITE_HEADER_TEXT.contactUs);
    });

    it('should display content', () => {
      cy.mountApplicationLayout(mockAuth0Context, props);

      cy.get('#mock-content').should('be.visible');
    });

    it('should have correct footer elements when not authenticated', () => {
      cy.mountApplicationLayout(mockAuth0Context, props);

      cy.get('img[data-name=lite-footer-logo]')
        .should('have.attr', 'src', '/images/logo_lite_footer.png')
        .should('have.attr', 'alt', 'Tekalo Logo');

      cy.get('div[data-name=lite-footer-link] a').then((footerLinks) => {
        expect(footerLinks).to.have.lengthOf(2);
        expect(footerLinks[0]).to.have.text('Privacy Info');
        expect(footerLinks[0]).to.have.attr('href', PRIVACY_LINK);
        expect(footerLinks[1]).to.have.text('Terms of Use');
        expect(footerLinks[1]).to.have.attr('href', TERMS_LINK);
      });

      cy.get('div[data-name=lite-footer-text]').should(
        'have.text',
        NAV_LITE_FOOTER_TEXT.RESERVED_RIGHTS
      );
    });
  });

  describe('editing', () => {
    beforeEach(() => {
      props = {
        isEditing: true,
      };
    });

    it('should have account button', () => {
      cy.mountApplicationLayout(mockAuth0Context, props);

      cy.get('a[data-name=lite-navbar-account-link]')
        .should('have.attr', 'href', ACCOUNT_LINK)
        .children('button')
        .its(0)
        .should('have.text', NAV_BAR_TEXT.MY_ACCOUNT);
    });
  });
});
