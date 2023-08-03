/// <reference types="cypress" />

import { IMultiSelect } from '@/modules/components/input/multiSelect/MultiSelect';
import { IPhoneNumberField } from '@/modules/sections/sign-up/fields/PhoneNumberField';
import { IInterestForm } from '@/modules/sections/sign-up/forms/applicants/interestForm/InterestForm';
import { ISignupForm } from '@/modules/sections/sign-up/forms/applicants/signupForm/SignupForm';
import { IRoleForm } from '@/modules/sections/sign-up/forms/organizations/roleForm/RoleForm';

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
      mountOrgRoleForm(props: IRoleForm): Chainable<MountReturn>;
      mountInterestForm(props: IInterestForm): Chainable<MountReturn>;
      mountCandidateSignupFormPage(
        auth0Context: Auth0ContextInterface<User>
      ): Chainable<ISignupForm>;
      mountMultiSelect(props: IMultiSelect): Chainable<void>;
      mountPhoneNumberField(props: IPhoneNumberField): Chainable<void>;
    }
  }
}
