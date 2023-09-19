import { getMockAuth0Context } from '@/cypress/fixtures/mocks';
import {
  ACCOUNT_LINK,
  APPLICANT_FORM_TEXT,
  BASE_LINK,
  ERROR_MODAL_TEXT,
  SAVE_MODAL,
  TRACKING,
  UPLOAD_ERROR_TEXT,
} from '@/lang/en';
import {
  applicantDraftSubmissionsEndpoint,
  applicantSubmissionsEndpoint,
} from '@/lib/helpers/apiHelpers';
import { stripEmptyFields } from '@/lib/helpers/formHelpers';
import SubmissionProvider from '@/lib/providers/SubmissionProvider';
import {
  ExperienceFieldsType,
  InterestFieldsType,
  SubmissionResponseType,
} from '@/lib/types';
import ApplicantForms, {
  IApplicantForms,
} from '@/modules/components/pages/ApplicantForms';
import * as ExperienceFormModule from '@/modules/sections/sign-up/forms/applicants/experienceForm/ExperienceForm';
import { IExperienceForm } from '@/modules/sections/sign-up/forms/applicants/experienceForm/ExperienceForm';
import * as InterestFormModule from '@/modules/sections/sign-up/forms/applicants/interestForm/InterestForm';
import { IInterestForm } from '@/modules/sections/sign-up/forms/applicants/interestForm/InterestForm';
import { Auth0Context, Auth0ContextInterface, User } from '@auth0/auth0-react';
import { Interception } from 'cypress/types/net-stubbing';
import { SinonSpy } from 'cypress/types/sinon';
import router from 'next/router';
import { Subject } from 'rxjs';

export interface ExperienceAndInterestProps {
  experience: IExperienceForm;
  interest: IInterestForm;
}

describe('ApplicantForms', () => {
  const childProps: ExperienceAndInterestProps =
    {} as unknown as ExperienceAndInterestProps;
  const mockExperienceFields: ExperienceFieldsType = {
    lastRole: 'new role',
    lastOrg: 'new org',
    yoe: '2',
    skills: ['react'],
    otherSkills: ['new skill 1', 'new skill 2'],
    linkedInUrl: 'new linkedin url',
    githubUrl: 'new github url',
    portfolioUrl: 'new portfolio url',
    portfolioPassword: 'new portfolio password',
    resumeUpload: { id: 123, originalFilename: 'newOrigFilename.pdf' },
  };
  const mockInterestFields: InterestFieldsType = {
    hoursPerWeek: '40',
    interestWorkArrangement: ['full-time employee'],
    interestEmploymentType: ['full'],
    interestRoles: ['data analyst', 'product designer'],
    currentLocation: 'test location',
    openToRelocate: 'not sure',
    openToRemoteMulti: ['remote', 'hybrid'],
    desiredSalary: '200k',
    interestCauses: ['int 1', 'int 2'],
    otherCauses: ['other 1', 'other 2'],
    workAuthorization: 'authorized',
    interestGovt: true,
    interestGovtEmplTypes: ['paid', 'unpaid'],
    previousImpactExperience: false,
    essayResponse: 'essay response',
    referenceAttribution: 'linkedIn',
    referenceAttributionOther: null,
  };
  let mockAuth0Context: Auth0ContextInterface<User>;
  let mockSubmissionResponse: SubmissionResponseType;
  let setExpProps: SinonSpy;
  let setIntProps: SinonSpy;
  let applicantFormsProps: IApplicantForms;

  Cypress.Commands.add('mountApplicantForms', (auth0Context, props) => {
    const MockExperienceForm: React.FC<IExperienceForm> = ({
      handleNext,
      handleSave,
      savedForm,
      showUploadErrorModal,
    }) => {
      setExpProps(handleNext, handleSave, savedForm, showUploadErrorModal);

      return <>Experience Form</>;
    };

    const MockInterestForm: React.FC<IInterestForm> = ({
      handleSubmit,
      handleSave,
      savedForm,
    }) => {
      setIntProps(handleSubmit, handleSave, savedForm);

      return <>Interest Form</>;
    };

    cy.stub(ExperienceFormModule, 'default').callsFake(MockExperienceForm);
    cy.stub(InterestFormModule, 'default').callsFake(MockInterestForm);

    cy.mount(
      <Auth0Context.Provider value={auth0Context}>
        <SubmissionProvider>
          <ApplicantForms isEditing={props.isEditing} />
        </SubmissionProvider>
      </Auth0Context.Provider>
    );
  });

  beforeEach(() => {
    window.dataLayerEvent = cy.stub().as('dataLayerEvent');
    cy.stub(router, 'push').as('routerPush');

    cy.fixture('candidate-submission').then(
      (res) => (mockSubmissionResponse = res.maxSubmissionResponse)
    );

    cy.intercept(
      {
        method: 'GET',
        url: applicantSubmissionsEndpoint,
      },
      cy.stub().callsFake((req) => {
        req.reply(mockSubmissionResponse);
      })
    ).as('getSubmissions');

    mockAuth0Context = getMockAuth0Context();

    setExpProps = cy
      .stub()
      .as('setExpProps')
      .callsFake((handleNext, handleSave, savedForm, showUploadErrorModal) => {
        childProps.experience = {
          forceSubmitForm: new Subject<void>(),
          handleNext,
          handleSave,
          isEditing: false,
          savedForm,
          showUploadErrorModal,
        };
      });

    setIntProps = cy
      .stub()
      .as('setIntProps')
      .callsFake((handleSubmit, handleSave, savedForm) => {
        childProps.interest = {
          handleSave,
          handleSubmit,
          isEditing: false,
          savedForm,
        };
      });
  });

  describe('not editing', () => {
    beforeEach(() => {
      applicantFormsProps = { isEditing: false };
    });

    it('should render', () => {
      cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

      cy.get('h3[data-name=page-header]').should(
        'contain.text',
        APPLICANT_FORM_TEXT.HEADER
      );
      cy.get('[data-name=timeline] li[data-index=0]').should(
        'have.attr',
        'data-state',
        'enabled'
      );
      cy.get('[data-name=timeline] li[data-index=1]').should(
        'have.attr',
        'data-state',
        'disabled'
      );
      cy.get('div[data-name=form-area]').should(
        'contain.text',
        'Experience Form'
      );
    });

    it('should handle next button click and pass form values to interest form', () => {
      cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

      cy.wait('@getSubmissions');
      cy.get('@setExpProps')
        .should('have.been.calledTwice')
        .then(() => {
          childProps.experience.handleNext(mockExperienceFields);
        });

      cy.get('@setIntProps')
        .should('have.been.calledOnce')
        .then(() => {
          cy.get('div[data-name=form-area]').should(
            'contain.text',
            'Interest Form'
          );

          cy.get('@dataLayerEvent').should(
            'have.been.calledOnceWithExactly',
            TRACKING.CANDIDATE_NEXT_BTN
          );

          expect(JSON.stringify(childProps.interest.savedForm)).to.eq(
            JSON.stringify({
              ...mockSubmissionResponse.submission,
              ...mockExperienceFields,
            })
          );
        });
    });

    it('should show upload error modal when an upload error occurs', () => {
      cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

      cy.get('@setExpProps')
        .should('have.been.calledTwice')
        .then(() => {
          childProps.experience.showUploadErrorModal();

          cy.get('#error-modal-title')
            .should('be.visible')
            .should('have.text', UPLOAD_ERROR_TEXT.header);
          cy.get('#error-modal-description')
            .should('be.visible')
            .should('have.text', ERROR_MODAL_TEXT.somethingWrong);

          cy.get('#error-modal-button-container button').fastClick();

          cy.get('#error-modal-title').should('not.exist');
          cy.get('#error-modal-description').should('not.exist');
        });
    });

    describe('get submissions', () => {
      it('should get submissions and pass values to the savedForm', () => {
        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.wait('@getSubmissions');

        cy.get('@setExpProps')
          .should('have.been.calledTwice')
          .then(() => {
            expect(JSON.stringify(childProps.experience.savedForm)).to.eq(
              JSON.stringify(mockSubmissionResponse.submission)
            );
          });
      });

      it('should redirect the user to the home page if unauthorized', () => {
        cy.intercept(
          {
            method: 'GET',
            url: applicantSubmissionsEndpoint,
          },
          cy.stub().callsFake((req) => {
            req.reply({ statusCode: 401 });
          })
        ).as('getSubmissions');

        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.wait('@getSubmissions');
        cy.get('@routerPush').should('have.been.calledWithExactly', BASE_LINK);
      });

      it('should how error modal if there is a problem getting submissions (bad code)', () => {
        cy.intercept(
          {
            method: 'GET',
            url: applicantSubmissionsEndpoint,
          },
          cy.stub().callsFake((req) => {
            req.reply({ statusCode: 500 });
          })
        ).as('getSubmissions');

        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.wait('@getSubmissions');

        cy.get('#error-modal-title')
          .should('be.visible')
          .should('have.text', ERROR_MODAL_TEXT.requestFailed);
        cy.get('#error-modal-description')
          .should('be.visible')
          .should('have.text', ERROR_MODAL_TEXT.somethingWrong);

        cy.get('#error-modal-button-container button').fastClick();

        cy.get('#error-modal-title').should('not.exist');
        cy.get('#error-modal-description').should('not.exist');
      });

      it('should how error modal if there is a problem getting submissions (rejection)', () => {
        cy.intercept(
          {
            method: 'GET',
            url: applicantSubmissionsEndpoint,
          },
          { forceNetworkError: true }
        ).as('getSubmissions');

        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.wait('@getSubmissions');

        cy.get('#error-modal-title')
          .should('be.visible')
          .should('have.text', ERROR_MODAL_TEXT.requestFailed);
        cy.get('#error-modal-description')
          .should('be.visible')
          .should('have.text', ERROR_MODAL_TEXT.somethingWrong);

        cy.get('#error-modal-button-container button').fastClick();

        cy.get('#error-modal-title').should('not.exist');
        cy.get('#error-modal-description').should('not.exist');
      });
    });

    describe('handleSave', () => {
      let saveDraftResponse = { statusCode: 200 };

      beforeEach(() => {
        cy.intercept(
          {
            method: 'POST',
            url: applicantDraftSubmissionsEndpoint,
          },
          cy.stub().callsFake((req) => {
            req.reply(saveDraftResponse);
          })
        ).as('saveDraft');
      });

      it('should handle save on experience form', () => {
        const newLocation = 'new Location!';

        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.get('@setExpProps')
          .should('have.been.calledTwice')
          .then(() => {
            mockSubmissionResponse.submission.currentLocation = newLocation;
            childProps.experience.handleSave(mockSubmissionResponse.submission);

            cy.wait('@saveDraft').then((i: Interception) => {
              const expectedObj = stripEmptyFields({
                ...mockSubmissionResponse.submission,
                currentLocation: newLocation,
              });

              expect(JSON.stringify(i.request.body)).to.eq(
                JSON.stringify(expectedObj)
              );

              cy.get('div[data-name=Modal]').should('be.visible');
              cy.get('h2[data-name=modal-header]').should(
                'contain.text',
                'Your progress has been saved!'
              );
              cy.get('p[data-name=modal-description]').should(
                'have.text',
                SAVE_MODAL.BODY
              );
              cy.get('button[name=modal-confirm]')
                .should('have.text', SAVE_MODAL.CTA)
                .fastClick();

              cy.get('div[data-name=Modal]').should('not.exist');
            });
          });
      });

      it('should show error modal if saving fails (bad code)', () => {
        saveDraftResponse = { statusCode: 500 };

        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.get('@setExpProps')
          .should('have.been.calledTwice')
          .then(() => {
            childProps.experience.handleSave(mockSubmissionResponse.submission);

            cy.wait('@saveDraft');

            cy.get('#error-modal-title')
              .should('be.visible')
              .should('have.text', ERROR_MODAL_TEXT.requestFailed);
            cy.get('#error-modal-description')
              .should('be.visible')
              .should('have.text', ERROR_MODAL_TEXT.somethingWrong);

            cy.get('#error-modal-button-container button').fastClick();

            cy.get('#error-modal-title').should('not.exist');
            cy.get('#error-modal-description').should('not.exist');
          });
      });

      it('should show error modal if saving fails (rejection)', () => {
        cy.intercept(
          {
            method: 'POST',
            url: applicantDraftSubmissionsEndpoint,
          },
          { forceNetworkError: true }
        ).as('saveDraft');

        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.get('@setExpProps')
          .should('have.been.calledTwice')
          .then(() => {
            childProps.experience.handleSave(mockSubmissionResponse.submission);

            cy.wait('@saveDraft');

            cy.get('#error-modal-title')
              .should('be.visible')
              .should('have.text', ERROR_MODAL_TEXT.requestFailed);
            cy.get('#error-modal-description')
              .should('be.visible')
              .should('have.text', ERROR_MODAL_TEXT.somethingWrong);

            cy.get('#error-modal-button-container button').fastClick();

            cy.get('#error-modal-title').should('not.exist');
            cy.get('#error-modal-description').should('not.exist');
          });
      });
    });

    describe('submit', () => {
      let submissionResponse = { statusCode: 200 };

      beforeEach(() => {
        cy.intercept(
          {
            method: 'POST',
            url: applicantSubmissionsEndpoint,
          },
          cy.stub().callsFake((req) => {
            req.reply(submissionResponse);
          })
        ).as('applicationSubmission');
      });

      it('should submit form values correctly', () => {
        const expectedObj = {
          ...stripEmptyFields(mockExperienceFields),
          ...stripEmptyFields(mockInterestFields),
          originTag: '',
        };

        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.get('@setExpProps')
          .should('have.been.calledTwice')
          .then(() => {
            childProps.experience.handleNext(mockExperienceFields);

            cy.get('@setIntProps')
              .should('have.been.calledOnce')
              .then(() => {
                childProps.interest.handleSubmit(mockInterestFields);

                cy.wait('@applicationSubmission').then((i: Interception) => {
                  expect(JSON.stringify(i.request.body)).to.eq(
                    JSON.stringify(expectedObj)
                  );
                });
              });
          });
      });

      it('should show error modal if submission fails (bad code)', () => {
        submissionResponse = { statusCode: 500 };

        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.get('@setExpProps')
          .should('have.been.calledTwice')
          .then(() => {
            childProps.experience.handleNext(mockExperienceFields);

            cy.get('@setIntProps')
              .should('have.been.calledOnce')
              .then(() => {
                childProps.interest.handleSubmit(mockInterestFields);

                cy.wait('@applicationSubmission').then(() => {
                  cy.get('#error-modal-title')
                    .should('be.visible')
                    .should('have.text', ERROR_MODAL_TEXT.requestFailed);
                  cy.get('#error-modal-description')
                    .should('be.visible')
                    .should('have.text', ERROR_MODAL_TEXT.somethingWrong);

                  cy.get('#error-modal-button-container button').fastClick();

                  cy.get('#error-modal-title').should('not.exist');
                  cy.get('#error-modal-description').should('not.exist');
                });
              });
          });
      });

      it('should show error modal if submission fails (rejection)', () => {
        cy.intercept(
          {
            method: 'POST',
            url: applicantSubmissionsEndpoint,
          },
          { forceNetworkError: true }
        ).as('applicationSubmission');

        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.get('@setExpProps')
          .should('have.been.calledTwice')
          .then(() => {
            childProps.experience.handleNext(mockExperienceFields);

            cy.get('@setIntProps')
              .should('have.been.calledOnce')
              .then(() => {
                childProps.interest.handleSubmit(mockInterestFields);

                cy.wait('@applicationSubmission').then(() => {
                  cy.get('#error-modal-title')
                    .should('be.visible')
                    .should('have.text', ERROR_MODAL_TEXT.requestFailed);
                  cy.get('#error-modal-description')
                    .should('be.visible')
                    .should('have.text', ERROR_MODAL_TEXT.somethingWrong);

                  cy.get('#error-modal-button-container button').fastClick();

                  cy.get('#error-modal-title').should('not.exist');
                  cy.get('#error-modal-description').should('not.exist');
                });
              });
          });
      });
    });
  });

  describe('isEditing', () => {
    beforeEach(() => {
      applicantFormsProps = { isEditing: true };
    });

    it('should show editing elements', () => {
      cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

      cy.get('h3[data-name=page-header]').should(
        'have.text',
        APPLICANT_FORM_TEXT.EDIT.HEADER
      );
      cy.get('a[data-name=back-to-account-link]')
        .should('exist')
        .should('have.text', APPLICANT_FORM_TEXT.EDIT.BACK_TO_ACCOUNT)
        .should('have.attr', 'href', ACCOUNT_LINK);
    });
  });
});
