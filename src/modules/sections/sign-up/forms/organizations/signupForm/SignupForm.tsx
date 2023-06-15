import {
  AttributionOtpions,
  CauseOptions,
  CommitmentOptions,
  OrgSizeOptions,
  OrgTypeOptions,
  TrueFalseOptions,
} from '@/lib/constants/selects';
import {
  Causes,
  CommitmentType,
  Email,
  EOE,
  OptionalPhoneNumber,
  OrgSize,
  OrgType,
  ReferenceAttribution,
  RequiredString,
} from '@/lib/enums';

import Button from '@/components/buttons/Button/Button';
import { ERROR_TEXT, ORG_SIGNUP_FORM_TEXT } from '@/lang/en';
import { jumpToFirstErrorMessage } from '@/lib/helpers/formHelpers';
import { NewOrgType } from '@/lib/types';
import {
  FreeTextField,
  MultiSelectField,
  SelectBooleanField,
  SelectGroupField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import { Form } from 'houseform';
import { useEffect } from 'react';

export interface ISignupForm {
  handleSubmit: (values: NewOrgType) => void;
  previousForm: NewOrgType | undefined;
}

const SignupForm: React.FC<ISignupForm> = ({ previousForm, handleSubmit }) => {
  const executeScroll = () => window.scrollTo({ top: 0, behavior: 'auto' });
  useEffect(executeScroll, []);

  return (
    <Form<NewOrgType>
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ isSubmitted, submit, getFieldValue }) => (
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
          <MultiSelectField
            fieldName="organization.impactAreas"
            label={ORG_SIGNUP_FORM_TEXT.FIELDS.orgImpactAreas.label}
            placeholder={ORG_SIGNUP_FORM_TEXT.FIELDS.orgImpactAreas.placeholder}
            selectionLabelMulti={
              ORG_SIGNUP_FORM_TEXT.FIELDS.orgImpactAreas.selectionLabelMulti
            }
            selectionLabelSingle={
              ORG_SIGNUP_FORM_TEXT.FIELDS.orgImpactAreas.selectionLabelSingle
            }
            listOptions={CauseOptions}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.organization.impactAreas || []}
            validator={Causes.array().min(1, {
              message: ERROR_TEXT.impactAreasRequired,
            })}
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
          <FreeTextField
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

          <FreeTextField
            fieldName="referenceAttributionOther"
            label={ORG_SIGNUP_FORM_TEXT.FIELDS.referenceOptional.label}
            placeholder={
              ORG_SIGNUP_FORM_TEXT.FIELDS.referenceOptional.placeholder
            }
            isSubmitted={isSubmitted}
            initialValue={''}
          />

          {/* Form Control Button*/}
          <div className="pt-2">
            <Button
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
