import {
  MockGTMProvider,
  getMockAuth0Context,
  mockGtag,
  mockUtmParams,
} from '@/cypress/fixtures/mocks';
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
import {
  convertStringFieldsToBool,
  stripEmptyFields,
} from '@/lib/helpers/formHelpers';
import SubmissionProvider from '@/lib/providers/SubmissionProvider';
import {
  DraftSubmissionType,
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
  const mockInterestFields: InterestFieldsType = {
    hoursPerWeek: '28',
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
  let applicantFormsProps: IApplicantForms;
  let mockAuth0Context: Auth0ContextInterface<User>;
  let mockExperienceFields: ExperienceFieldsType;
  let mockForceExpValues: any;
  let mockSubmissionResponse: SubmissionResponseType;
  let setExpProps: SinonSpy;
  let setIntProps: SinonSpy;

  Cypress.Commands.add('mountApplicantForms', (auth0Context, props) => {
    const MockExperienceForm: React.FC<IExperienceForm> = ({
      changeHasOcurred,
      handleNext,
      handleSave,
      isEditing,
      savedForm,
      showUploadErrorModal,
      $forceSubmitForm,
    }) => {
      setExpProps(
        changeHasOcurred,
        handleNext,
        handleSave,
        isEditing,
        savedForm,
        showUploadErrorModal
      );

      $forceSubmitForm.subscribe(() => {
        if (mockForceExpValues) {
          handleNext(mockForceExpValues);
        }
      });

      return <>Experience Form</>;
    };

    const MockInterestForm: React.FC<IInterestForm> = ({
      $updateInterestValues,
      changeHasOcurred,
      handleSave,
      handleSubmit,
      isEditing,
      savedForm,
      updateFormValues,
    }) => {
      setIntProps(
        changeHasOcurred,
        handleSave,
        handleSubmit,
        isEditing,
        savedForm,
        updateFormValues
      );

      $updateInterestValues.subscribe(() => {
        updateFormValues(
          convertStringFieldsToBool(mockInterestFields, savedForm)
        );
      });

      return <>Interest Form</>;
    };

    cy.stub(ExperienceFormModule, 'default').callsFake(MockExperienceForm);
    cy.stub(InterestFormModule, 'default').callsFake(MockInterestForm);

    cy.mount(
      <Auth0Context.Provider value={auth0Context}>
        <SubmissionProvider>
          <MockGTMProvider>
            <ApplicantForms
              isEditing={props.isEditing ? props.isEditing : undefined}
            />
          </MockGTMProvider>
        </SubmissionProvider>
      </Auth0Context.Provider>
    );
  });

  beforeEach(() => {
    window.dataLayerEvent = cy.stub().as('dataLayerEvent');
    mockExperienceFields = {
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

    cy.stub(router, 'push').as('routerPush');
    cy.stub(router.events, 'on').as('routerOn');
    window.gtag = mockGtag;

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
      .callsFake(
        (
          changeHasOcurred,
          handleNext,
          handleSave,
          isEditing,
          savedForm,
          showUploadErrorModal
        ) => {
          childProps.experience = {
            $forceSubmitForm: new Subject<void>(),
            changeHasOcurred,
            handleNext,
            handleSave,
            isEditing,
            savedForm,
            showUploadErrorModal,
          };
        }
      );

    setIntProps = cy
      .stub()
      .as('setIntProps')
      .callsFake(
        (
          changeHasOcurred,
          handleSave,
          handleSubmit,
          isEditing,
          savedForm,
          updateFormValues
        ) => {
          childProps.interest = {
            $updateInterestValues: new Subject<void>(),
            changeHasOcurred,
            handleSave,
            handleSubmit,
            isEditing,
            savedForm,
            updateFormValues,
          };
        }
      );
  });

  describe('not editing', () => {
    beforeEach(() => {
      applicantFormsProps = {};
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

    describe('interestFormHasBeenStarted', () => {
      beforeEach(() => {
        cy.fixture('candidate-submission').then(
          (res) => (mockSubmissionResponse = res.noInterestResponse)
        );
      });

      it('should enable navigating when interest form has been started', () => {
        mockSubmissionResponse.submission.currentLocation =
          'Brooklyn, New York';
        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.wait('@getSubmissions');

        cy.get('li[data-index=1]').should('have.attr', 'data-state', 'enabled');
      });

      it('should not enable navigating when interest form has not been started', () => {
        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.wait('@getSubmissions');

        cy.get('li[data-index=1]').should(
          'have.attr',
          'data-state',
          'disabled'
        );

        cy.get('div[data-name=nav-interest-form]').fastClick();

        cy.get('div[data-name=form-area]').should(
          'contain.text',
          'Experience Form'
        );
      });

      it('should navigate to interest form and back to experience form through click navigation', () => {
        mockForceExpValues = JSON.parse(JSON.stringify(mockExperienceFields));
        mockSubmissionResponse.submission.currentLocation =
          'Brooklyn, New York';
        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.get('@setExpProps').should('have.been.calledTwice');

        cy.wait('@getSubmissions');
        cy.get('div[data-name=nav-interest-form]').fastClick();

        cy.get('div[data-name=form-area]').should(
          'contain.text',
          'Interest Form'
        );

        cy.get('div[data-name=nav-experience-form]').fastClick();

        cy.get('div[data-name=form-area]').should(
          'contain.text',
          'Experience Form'
        );
      });

      it('should not navigate to interest form through click navigation when experience form is not valid', () => {
        mockForceExpValues = null;
        mockSubmissionResponse.submission.currentLocation =
          'Brooklyn, New York';
        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.wait('@getSubmissions');
        cy.get('div[data-name=nav-interest-form]').fastClick();

        cy.get('div[data-name=form-area]').should(
          'contain.text',
          'Experience Form'
        );
      });

      it('should check string length', () => {
        mockSubmissionResponse.submission.essayResponse = '';
        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.wait('@getSubmissions');

        cy.get('li[data-index=1]').should(
          'have.attr',
          'data-state',
          'disabled'
        );
      });

      it('should check null value', () => {
        mockSubmissionResponse.submission.hoursPerWeek = null;
        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.wait('@getSubmissions');

        cy.get('li[data-index=1]').should(
          'have.attr',
          'data-state',
          'disabled'
        );
      });

      it('should check undefined value', () => {
        mockSubmissionResponse.submission.hoursPerWeek = undefined;
        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.wait('@getSubmissions');

        cy.get('li[data-index=1]').should(
          'have.attr',
          'data-state',
          'disabled'
        );
      });

      it('should check array length', () => {
        mockSubmissionResponse.submission.interestCauses = [];
        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.wait('@getSubmissions');

        cy.get('li[data-index=1]').should(
          'have.attr',
          'data-state',
          'disabled'
        );
      });

      it('should check false booleans', () => {
        mockSubmissionResponse.submission.interestGovt = false;
        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.wait('@getSubmissions');

        cy.get('li[data-index=1]').should(
          'have.attr',
          'data-state',
          'disabled'
        );
      });

      it('should save interest form values when click navigating to experience form', () => {
        mockForceExpValues = JSON.parse(JSON.stringify(mockExperienceFields));
        mockSubmissionResponse.submission.currentLocation =
          'Brooklyn, New York';
        cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

        cy.get('@setExpProps').should('have.been.calledTwice');

        cy.wait('@getSubmissions');
        cy.get('div[data-name=nav-interest-form]').fastClick();

        cy.get('div[data-name=form-area]').should(
          'contain.text',
          'Interest Form'
        );

        cy.get('div[data-name=nav-experience-form]').fastClick();

        cy.get('div[data-name=form-area]')
          .should('contain.text', 'Experience Form')
          .then(() => {
            cy.wrap(childProps.experience.savedForm?.hoursPerWeek).should(
              'equal',
              mockInterestFields.hoursPerWeek
            );
          });
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
              const requestBody = i.request.body;

              const expectedObj = stripEmptyFields({
                ...mockSubmissionResponse.submission,
                currentLocation: newLocation,
              });

              expect(requestBody.currentLocation).to.equal(
                expectedObj.currentLocation
              );
              expect(requestBody.desiredSalary).to.equal(
                expectedObj.desiredSalary
              );
              expect(requestBody.essayResponse).to.equal(
                expectedObj.essayResponse
              );
              expect(requestBody.githubUrl).to.equal(expectedObj.githubUrl);
              expect(requestBody.hoursPerWeek).to.equal(
                expectedObj.hoursPerWeek
              );
              expect(requestBody.interestCauses).to.deep.equal(
                expectedObj.interestCauses
              );
              expect(requestBody.interestEmploymentType).to.deep.equal(
                expectedObj.interestEmploymentType
              );
              expect(requestBody.interestGovt).to.equal(
                expectedObj.interestGovt
              );
              expect(requestBody.interestGovtEmplTypes).to.deep.equal(
                expectedObj.interestGovtEmplTypes
              );
              expect(requestBody.interestRoles).to.deep.equal(
                expectedObj.interestRoles
              );
              expect(requestBody.interestWorkArrangement).to.deep.equal(
                expectedObj.interestWorkArrangement
              );
              expect(requestBody.lastOrg).to.equal(expectedObj.lastOrg);
              expect(requestBody.lastRole).to.equal(expectedObj.lastRole);
              expect(requestBody.linkedInUrl).to.equal(expectedObj.linkedInUrl);
              expect(requestBody.openToRelocate).to.equal(
                expectedObj.openToRelocate
              );
              expect(requestBody.openToRemoteMulti).to.deep.equal(
                expectedObj.openToRemoteMulti
              );
              expect(requestBody.otherCauses).to.deep.equal(
                expectedObj.otherCauses
              );
              expect(requestBody.otherSkills).to.deep.equal(
                expectedObj.otherSkills
              );
              expect(requestBody.portfolioPassword).to.equal(
                expectedObj.portfolioPassword
              );
              expect(requestBody.portfolioUrl).to.equal(
                expectedObj.portfolioUrl
              );
              expect(requestBody.previousImpactExperience).to.equal(
                expectedObj.previousImpactExperience
              );
              expect(requestBody.referenceAttribution).to.equal(
                expectedObj.referenceAttribution
              );
              expect(requestBody.referenceAttributionOther).to.equal(
                expectedObj.referenceAttributionOther
              );
              expect(requestBody.resumeUpload).to.deep.equal(
                expectedObj.resumeUpload
              );
              expect(requestBody.skills).to.deep.equal(expectedObj.skills);
              expect(requestBody.workAuthorization).to.equal(
                expectedObj.workAuthorization
              );
              expect(requestBody.yoe).to.equal(expectedObj.yoe);
              expect(requestBody.utmParams).to.deep.equal(mockUtmParams);

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
        mockExperienceFields.skills = [];
        mockInterestFields.hoursPerWeek = '';
        mockExperienceFields.githubUrl = null;

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
                  const requestBody = i.request.body as DraftSubmissionType;

                  expect(requestBody.currentLocation).to.equal('test location');
                  expect(requestBody.desiredSalary).to.equal('200k');
                  expect(requestBody.essayResponse).to.equal('essay response');
                  expect(requestBody.githubUrl).to.equal(null);
                  expect(requestBody.hoursPerWeek).to.equal(null);
                  expect(requestBody.interestCauses).to.deep.equal([
                    'int 1',
                    'int 2',
                  ]);
                  expect(requestBody.interestEmploymentType).to.deep.equal([
                    'full',
                  ]);
                  expect(requestBody.interestGovt).to.equal(true);
                  expect(requestBody.interestGovtEmplTypes).to.deep.equal([
                    'paid',
                    'unpaid',
                  ]);
                  expect(requestBody.interestRoles).to.deep.equal([
                    'data analyst',
                    'product designer',
                  ]);
                  expect(requestBody.interestWorkArrangement).to.deep.equal([
                    'full-time employee',
                  ]);
                  expect(requestBody.lastOrg).to.equal('new org');
                  expect(requestBody.lastRole).to.equal('new role');
                  expect(requestBody.linkedInUrl).to.equal('new linkedin url');
                  expect(requestBody.openToRelocate).to.equal('not sure');
                  expect(requestBody.openToRemoteMulti).to.deep.equal([
                    'remote',
                    'hybrid',
                  ]);
                  expect(requestBody.otherCauses).to.deep.equal([
                    'other 1',
                    'other 2',
                  ]);
                  expect(requestBody.otherSkills).to.deep.equal([
                    'new skill 1',
                    'new skill 2',
                  ]);
                  expect(requestBody.portfolioPassword).to.equal(
                    'new portfolio password'
                  );
                  expect(requestBody.portfolioUrl).to.equal(
                    'new portfolio url'
                  );
                  expect(requestBody.previousImpactExperience).to.equal(false);
                  expect(requestBody.referenceAttribution).to.equal('linkedIn');
                  expect(requestBody.referenceAttributionOther).to.equal(null);
                  expect(requestBody.resumeUpload).to.deep.equal({
                    id: 123,
                    originalFilename: 'newOrigFilename.pdf',
                  });
                  expect(requestBody.skills).to.deep.equal([]);
                  expect(requestBody.workAuthorization).to.equal('authorized');
                  expect(requestBody.yoe).to.equal('2');
                  expect(requestBody.utmParams).to.deep.equal(mockUtmParams);
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

        cy.wait('@getSubmissions');

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
      mockAuth0Context.isAuthenticated = true;

      cy.fixture('candidate-submission').then(
        (res) => (mockSubmissionResponse = res.maxSubmittedResponse)
      );
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

    it('should bounce the user to the account page if they have not submitted', () => {
      mockSubmissionResponse.isFinal = false;

      cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

      cy.get('@routerPush').should(
        'have.been.calledOnceWithExactly',
        ACCOUNT_LINK
      );
    });

    it('should return the user to the application page on submit', () => {
      cy.intercept(
        {
          method: 'PUT',
          url: applicantSubmissionsEndpoint,
        },
        cy.stub().callsFake((req) => {
          req.reply({ statusCode: 200, body: mockSubmissionResponse });
        })
      ).as('applicationSubmission');

      cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

      cy.get('@routerOn').should('not.have.been.called');
      cy.wait('@getSubmissions');

      cy.get('@setExpProps')
        .should('have.been.calledTwice')
        .then(() => {
          childProps.experience.handleNext(mockExperienceFields);

          cy.get('@setIntProps')
            .should('have.been.calledOnce')
            .then(() => {
              childProps.interest.handleSubmit(mockInterestFields);

              cy.wait('@applicationSubmission');

              cy.get('@routerPush').should(
                'have.been.calledOnceWithExactly',
                ACCOUNT_LINK
              );
            });
        });
    });

    it('should set navLock if changes are made to the experience form', () => {
      cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

      cy.wait('@getSubmissions');

      cy.get('@setExpProps')
        .should('have.been.calledTwice')
        .then(() => {
          childProps.experience.changeHasOcurred();

          cy.get('@routerOn').should('have.been.calledOnce');
        });
    });

    it('should set navLock if changes are made to the interest form', () => {
      cy.mountApplicantForms(mockAuth0Context, applicantFormsProps);

      cy.wait('@getSubmissions');

      cy.get('@setExpProps')
        .should('have.been.calledTwice')
        .then(() => {
          childProps.experience.handleNext(mockExperienceFields);

          cy.get('@setIntProps')
            .should('have.been.calledOnce')
            .then(() => {
              childProps.interest.changeHasOcurred();

              cy.get('@routerOn').should('have.been.calledOnce');
            });
        });
    });
  });
});
