/// <reference types="cypress" />

import { IFileUpload } from '@/modules/components/input/fileUpload/FileUpload';
import { IMultiSelect } from '@/modules/components/input/multiSelect/MultiSelect';
import { IFileUploadField } from '@/modules/sections/sign-up/fields/FileUploadField';
import { IPhoneNumberField } from '@/modules/sections/sign-up/fields/PhoneNumberField';
import { IInterestForm } from '@/modules/sections/sign-up/forms/applicants/interestForm/InterestForm';
import { ISignupForm } from '@/modules/sections/sign-up/forms/applicants/signupForm/SignupForm';

import { ISignupForm as IOrgSignupForm } from '@/modules/sections/sign-up/forms/organizations/signupForm/SignupForm';
import { mount } from 'cypress/react';

declare global {
  namespace Cypress {
    interface Chainable {
      // e2e test methods
      setupTestingEnvironment(): Chainable<void>;
      deleteTestData(deleteUrl: string): Chainable<void>;
      login(): Chainable<void>;
      validateLogin(): Chainable<void>;
      // Unit test methods
      mount: typeof mount;
      mountCandidateSignupForm(props: ISignupForm): Chainable<MountReturn>;
      mountOrganizationSignupForm(
        props: IOrgSignupForm
      ): Chainable<MountReturn>;
      mountInterestForm(props: IInterestForm): Chainable<MountReturn>;
      mountCandidateSignupFormPage(
        auth0Context: Auth0ContextInterface<User>
      ): Chainable<ISignupForm>;
      mountFileUpload(props: IFileUpload): Chainable<void>;
      mountFileUploadField(props: IFileUploadField): Chainable<IFileUpload>;
      mountMultiSelect(props: IMultiSelect): Chainable<void>;
      mountPhoneNumberField(props: IPhoneNumberField): Chainable<void>;
    }
  }
}
