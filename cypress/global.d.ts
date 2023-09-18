/// <reference types="cypress" />

import { IFileUpload } from '@/modules/components/input/fileUpload/FileUpload';
import { IMultiSelect } from '@/modules/components/input/multiSelect/MultiSelect';
import { IApplicantForms } from '@/modules/components/pages/ApplicantForms';
import { IFileUploadField } from '@/modules/sections/sign-up/fields/FileUploadField';
import { IPhoneNumberField } from '@/modules/sections/sign-up/fields/PhoneNumberField';
import { IExperienceForm } from '@/modules/sections/sign-up/forms/applicants/experienceForm/ExperienceForm';
import { IInterestForm } from '@/modules/sections/sign-up/forms/applicants/interestForm/InterestForm';
import { ISignupForm } from '@/modules/sections/sign-up/forms/applicants/signupForm/SignupForm';
import { IRoleDetailReview } from '@/modules/sections/sign-up/forms/organizations/reviewForm/sections/RoleDetailReview';
import { IRoleForm } from '@/modules/sections/sign-up/forms/organizations/roleForm/RoleForm';

import { ISignupForm as IOrgSignupForm } from '@/modules/sections/sign-up/forms/organizations/signupForm/SignupForm';
import { Auth0ContextInterface } from '@auth0/auth0-react';
import { mount } from 'cypress/react';

declare global {
  namespace Cypress {
    interface Chainable {
      // common
      fastType(text: string): Chainable<Subject>;
      fastClick(): Chainable<Subject>;
      // e2e test methods
      setupTestingEnvironment(): Chainable<void>;
      deleteTestData(deleteUrl: string): Chainable<void>;
      login(): Chainable<void>;
      validateLogin(): Chainable<void>;
      // Unit test methods
      mount: typeof mount;
      mountApplicantForms(
        auth0Context: Auth0ContextInterface<User>,
        props: IApplicantForms
      ): Chainable<void>;
      mountCandidateSignupForm(props: ISignupForm): Chainable<MountReturn>;
      mountCandidateSignupForm(props: ISignupForm): Chainable<void>;
      mountCandidateSignupFormPage(
        auth0Context: Auth0ContextInterface<User>
      ): Chainable<ISignupForm>;
      mountExperienceForm(props: IExperienceForm): Chainable<void>;
      mountFileUpload(props: IFileUpload): Chainable<void>;
      mountFileUploadField(props: IFileUploadField): Chainable<IFileUpload>;
      mountFileUploadProvider(
        action: 'upload' | 'validate',
        auth0Context: Auth0ContextInterface<User>
      ): Chainable<void>;
      mountInterestForm(props: IInterestForm): Chainable<void>;
      mountMultiSelect(props: IMultiSelect): Chainable<void>;
      mountOrganizationSignupForm(
        props: IOrgSignupForm
      ): Chainable<MountReturn>;
      mountOrganizationSignupForm(
        props: IOrgSignupForm
      ): Chainable<MountReturn>;
      mountOrgRoleForm(props: IRoleForm): Chainable<void>;
      mountPhoneNumberField(props: IPhoneNumberField): Chainable<void>;
      mountRoleDetailReview(props: IRoleDetailReview): Chainable<void>;
      mountSignInActionPage(
        auth0Context: Auth0ContextInterface<User>
      ): Chainable<void>;
      mountViewResumePage(
        auth0Context: Auth0ContextInterface<User>
      ): Chainable<void>;
    }
  }
}
