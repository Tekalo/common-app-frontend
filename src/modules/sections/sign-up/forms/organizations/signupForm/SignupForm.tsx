import {
  AttributionOtpions,
  CommitmentOptions,
  OrgSizeOptions,
  OrgTypeOptions,
  TrueFalseOptions,
} from '@/lib/constants/selects';
import {
  CommitmentType,
  OrgSize,
  OrgType,
  ReferenceAttribution,
} from '@/lib/validators/enums';

import Button from '@/components/buttons/Button/Button';
import { ORG_SIGNUP_FORM_TEXT } from '@/lang/en/en';
import {
  executeScroll,
  hasLengthError,
  jumpToFirstErrorMessage,
} from '@/lib/helpers/utilities';
import { NewOrgType } from '@/lib/types';
import { CausesSelectValidator } from '@/lib/validators/array';
import { EOE } from '@/lib/validators/literal';
import {
  Email,
  OptionalPhoneNumber,
  RequiredString,
} from '@/lib/validators/string';
import OrgAdditionalInfoBox from '@/modules/components/application/OrgAdditionalInfoBox';
import {
  FreeTextField,
  PhoneNumberField,
  SelectBooleanField,
  SelectGroupField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import CausesSelectField from '@/sections/sign-up/fields/CausesSelectField';
import { Form } from 'houseform';
import { useEffect } from 'react';

export interface ISignupForm {
  handleSubmit: (values: NewOrgType) => void;
  previousForm: NewOrgType | undefined;
}

const SignupForm: React.FC<ISignupForm> = ({ previousForm, handleSubmit }) => {
  useEffect(executeScroll, []);

  return (
    <Form<NewOrgType>
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ isSubmitted, submit, getFieldValue, value, errors }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getFieldValue('otherRef')?.setValue(0, '');
            submit().then(() => {
              jumpToFirstErrorMessage();
            });
          }}
          className="flex flex-col space-y-8 lg:space-y-7"
        >
          {/* Org Name */}
          <FreeTextField
            fieldName="organization.name"
            label={ORG_SIGNUP_FORM_TEXT.FIELDS.orgName.label}
            placeholder={ORG_SIGNUP_FORM_TEXT.FIELDS.orgName.placeholder}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.organization.name}
            validator={RequiredString}
          />

          {/* Org Type */}
          <SingleSelectField
            fieldName="organization.type"
            label={ORG_SIGNUP_FORM_TEXT.FIELDS.orgType.label}
            placeholder={ORG_SIGNUP_FORM_TEXT.FIELDS.orgType.placeholder}
            listOptions={OrgTypeOptions}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.organization.type}
            tooltipText={ORG_SIGNUP_FORM_TEXT.FIELDS.orgType.tooltipText}
            validator={OrgType}
          />

          {/* Org Size */}
          <SingleSelectField
            fieldName="organization.size"
            label={ORG_SIGNUP_FORM_TEXT.FIELDS.orgSize.label}
            placeholder={ORG_SIGNUP_FORM_TEXT.FIELDS.orgSize.placeholder}
            listOptions={OrgSizeOptions}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.organization.size}
            validator={OrgSize}
          />

          {/* Org Impact Areas */}
          <CausesSelectField
            fieldName="organization.impactAreas"
            initialValue={previousForm?.organization.impactAreas || []}
            isSubmitted={isSubmitted}
            label={ORG_SIGNUP_FORM_TEXT.FIELDS.orgImpactAreas.label}
            validator={CausesSelectValidator}
          />

          {/* Contact name */}
          <FreeTextField
            fieldName="contact.name"
            label={ORG_SIGNUP_FORM_TEXT.FIELDS.orgContactName.label}
            placeholder={ORG_SIGNUP_FORM_TEXT.FIELDS.orgContactName.placeholder}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.contact.name}
            validator={RequiredString}
          />

          {/* Contact email */}
          <FreeTextField
            fieldName="contact.email"
            label={ORG_SIGNUP_FORM_TEXT.FIELDS.orgContactEmail.label}
            placeholder={
              ORG_SIGNUP_FORM_TEXT.FIELDS.orgContactEmail.placeholder
            }
            isSubmitted={isSubmitted}
            initialValue={previousForm?.contact.email}
            validator={Email}
          />

          {/* Contact number */}
          <PhoneNumberField
            fieldName="contact.phone"
            label={ORG_SIGNUP_FORM_TEXT.FIELDS.orgContactPhone.label}
            placeholder={
              ORG_SIGNUP_FORM_TEXT.FIELDS.orgContactPhone.placeholder
            }
            isSubmitted={isSubmitted}
            initialValue={previousForm?.contact.phone}
            validator={OptionalPhoneNumber}
            tooltipText={
              ORG_SIGNUP_FORM_TEXT.FIELDS.orgContactPhone.tooltipText
            }
          />

          {/* Org Employment Types */}
          <SelectGroupField
            fieldName="commitmentTypes"
            label={ORG_SIGNUP_FORM_TEXT.FIELDS.orgEmploymentTypes.label}
            helperText={
              ORG_SIGNUP_FORM_TEXT.FIELDS.orgEmploymentTypes.helperText
            }
            listOptions={CommitmentOptions}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.commitmentTypes}
            validator={CommitmentType.array()}
          />

          {/* Org EOE */}
          <SelectBooleanField
            fieldName="organization.eoe"
            label={ORG_SIGNUP_FORM_TEXT.FIELDS.orgEOE.label}
            placeholder={ORG_SIGNUP_FORM_TEXT.FIELDS.orgEOE.placeholder}
            listOptions={TrueFalseOptions}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.organization.eoe}
            validator={EOE}
          />

          {/* Reference */}
          <SingleSelectField
            fieldName="referenceAttribution"
            label={ORG_SIGNUP_FORM_TEXT.FIELDS.referenceAttribution.label}
            placeholder={
              ORG_SIGNUP_FORM_TEXT.FIELDS.referenceAttribution.placeholder
            }
            listOptions={AttributionOtpions}
            isSubmitted={isSubmitted}
            initialValue={''}
            validator={ReferenceAttribution}
          />

          {value.referenceAttribution === 'other' && (
            <FreeTextField
              fieldName="referenceAttributionOther"
              label={ORG_SIGNUP_FORM_TEXT.FIELDS.referenceOptional.label}
              placeholder={
                ORG_SIGNUP_FORM_TEXT.FIELDS.referenceOptional.placeholder
              }
              isSubmitted={isSubmitted}
              initialValue={''}
            />
          )}

          <OrgAdditionalInfoBox />

          {/* Form Control Button*/}
          <div className="pt-2">
            <Button
              disabled={hasLengthError(errors)}
              className="w-full text-component-large"
              label={ORG_SIGNUP_FORM_TEXT.BUTTONS.submit.label}
              type="submit"
              name="submit-org-sign-up"
            />
          </div>
        </form>
      )}
    </Form>
  );
};

export default SignupForm;
