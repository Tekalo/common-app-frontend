import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import {
  COMMITMENT_ENUM_TEXT,
  INTEREST_FORM_TEXT,
  ROLE_ENUM_TEXT,
} from '@/lang/en';
import {
  AttributionOtpions,
  AuthorizationOptions,
  CauseOptions,
  CommitmentOptions,
  RelocationOptions,
  RemoteOptions,
  RoleOptions,
  USDROptions,
  YesNoOptions,
} from '@/lib/constants/selects';
import {
  CausesValidator,
  CommitmentTypeValidator,
  GovtJobType,
  OpenToRelocate,
  OpenToRemote,
  OptionalString,
  ReferenceAttribution,
  RequiredEssay,
  RequiredString,
  RolesValidator,
  TrueFalseString,
  WorkAuthorization,
} from '@/lib/enums';
import {
  executeScroll,
  jumpToFirstErrorMessage,
  mapBoolToString,
  mapStringToBool,
  resetForm,
} from '@/lib/helpers/formHelpers';
import {
  DraftSubmissionType,
  InterestFieldsType,
  InterestRefType,
} from '@/lib/types';
import {
  FreeTagField,
  FreeTextField,
  LongTextField,
  MultiSelectField,
  RadioGroupField,
  RankChoiceField,
  SelectGroupField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import { Form } from 'houseform';
import { useEffect, useRef, useState } from 'react';

export interface IInterestForm {
  handleSubmit: (_values: InterestFieldsType) => void;
  handleSave: (_values: DraftSubmissionType) => void;
  savedForm: DraftSubmissionType | undefined;
}

const InterestForm: React.FC<IInterestForm> = ({
  handleSubmit,
  handleSave,
  savedForm,
}) => {
  useEffect(executeScroll, []);

  const formRef = useRef<InterestRefType>(null);
  const [employmentType, setEmploymentType] = useState(
    savedForm?.interestEmploymentType || []
  );
  const [interestGovt, setInterestGov] = useState(
    savedForm?.interestGovt || false
  );

  useEffect(() => {
    // Need to use the inital value once we get it,
    // so we have to reset the form for it to initialize
    setEmploymentType(savedForm?.interestEmploymentType || []);
    setInterestGov(savedForm?.interestGovt || false);
    resetForm(formRef);
  }, [savedForm]);

  const convertStringFieldsToBool = <T,>(value: T): T => {
    const newVals = { ...savedForm, ...value };

    // Bc of radio group weirdness, we need to convert the values here
    if (typeof newVals.interestGovt === 'string') {
      newVals.interestGovt = mapStringToBool(newVals.interestGovt);
    }

    if (typeof newVals.previousImpactExperience === 'string') {
      newVals.previousImpactExperience = mapStringToBool(
        newVals.previousImpactExperience
      );
    }

    return newVals as T;
  };

  const doSave = () => {
    if (formRef.current) {
      // We need to convert strings to booleans for specific fields
      // because radio inputs need to have string values
      handleSave(convertStringFieldsToBool(formRef.current.value));
    }
  };

  const doSubmit = (values: InterestFieldsType) => {
    if (formRef.current) {
      // We need to convert strings to booleans for specific fields
      // because radio inputs need to have string values
      handleSubmit(convertStringFieldsToBool(values));
    }
  };

  return (
    <Form<InterestFieldsType>
      onSubmit={(values) => doSubmit(values)}
      ref={formRef}
    >
      {({ isSubmitted, submit }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit().then(() => {
              jumpToFirstErrorMessage();
            });
          }}
          className="space-y-8"
        >
          {/* Employment */}
          <SelectGroupField
            fieldName="interestEmploymentType"
            label={INTEREST_FORM_TEXT.FIELDS.interestEmploymentType.label}
            helperText={
              INTEREST_FORM_TEXT.FIELDS.interestEmploymentType.helperText
            }
            onChange={(val) => {
              setEmploymentType(val);
            }}
            listOptions={CommitmentOptions}
            isSubmitted={isSubmitted}
            initialValue={employmentType}
            validator={CommitmentTypeValidator}
          />
          {/* Hours per week */}
          <FreeTextField
            fieldName="hoursPerWeek"
            listenTo={['interestEmploymentType']}
            label={INTEREST_FORM_TEXT.FIELDS.hoursPerWeek.label}
            placeholder={INTEREST_FORM_TEXT.FIELDS.hoursPerWeek.placeholder}
            disabled={
              employmentType.length === 1 &&
              employmentType[0] === COMMITMENT_ENUM_TEXT.full
            }
            isSubmitted={isSubmitted}
            initialValue={savedForm?.hoursPerWeek || ''}
            validator={OptionalString}
          />
          {/* Roles */}
          <MultiSelectField
            fieldName="interestRoles"
            label={INTEREST_FORM_TEXT.FIELDS.interestRoles.label}
            placeholder={INTEREST_FORM_TEXT.FIELDS.interestRoles.placeholder}
            selectionLabelMulti={
              INTEREST_FORM_TEXT.FIELDS.interestRoles.selectionLabelMulti
            }
            selectionLabelSingle={
              INTEREST_FORM_TEXT.FIELDS.interestRoles.selectionLabelSingle
            }
            listOptions={RoleOptions.filter(
              (role) => role.value !== ROLE_ENUM_TEXT.other
            )}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.interestRoles || []}
            validator={RolesValidator}
          />
          {/* Location */}
          <FreeTextField
            fieldName="currentLocation"
            label={INTEREST_FORM_TEXT.FIELDS.currentLocation.label}
            placeholder={INTEREST_FORM_TEXT.FIELDS.currentLocation.placeholder}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.currentLocation || ''}
            validator={RequiredString}
          />
          {/* Reloaction*/}
          <SingleSelectField
            fieldName="openToRelocate"
            label={INTEREST_FORM_TEXT.FIELDS.openToRelocate.label}
            placeholder={INTEREST_FORM_TEXT.FIELDS.openToRelocate.placeholder}
            listOptions={RelocationOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.openToRelocate}
            validator={OpenToRelocate}
          />
          {/* Remote */}
          <SingleSelectField
            fieldName="openToRemote"
            label={INTEREST_FORM_TEXT.FIELDS.openToRemote.label}
            placeholder={INTEREST_FORM_TEXT.FIELDS.openToRemote.placeholder}
            listOptions={RemoteOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.openToRemote}
            validator={OpenToRemote}
          />
          {/* Salary*/}
          <FreeTextField
            fieldName="desiredSalary"
            label={INTEREST_FORM_TEXT.FIELDS.desiredSalary.label}
            placeholder={INTEREST_FORM_TEXT.FIELDS.desiredSalary.placeholder}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.desiredSalary || ''}
            validator={OptionalString}
          />
          {/* Causes */}
          <RankChoiceField
            fieldName="interestCauses"
            selectLabel={INTEREST_FORM_TEXT.FIELDS.interestCauses.selectLabel}
            rankLabel={INTEREST_FORM_TEXT.FIELDS.interestCauses.rankLabel}
            placeholder={INTEREST_FORM_TEXT.FIELDS.interestCauses.placeholder}
            selectionLabelMulti={
              INTEREST_FORM_TEXT.FIELDS.interestCauses.selectionLabelMulti
            }
            selectionLabelSingle={
              INTEREST_FORM_TEXT.FIELDS.interestCauses.selectionLabelSingle
            }
            listOptions={CauseOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.interestCauses || []}
            validator={CausesValidator}
          />
          {/* Other Causes*/}
          <FreeTagField
            fieldName="otherCauses"
            label={INTEREST_FORM_TEXT.FIELDS.otherCauses.label}
            placeholder={INTEREST_FORM_TEXT.FIELDS.otherCauses.placeholder}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.otherCauses || []}
            validator={OptionalString.array()}
          />
          {/* Work Auth*/}
          <SingleSelectField
            fieldName="workAuthorization"
            label={INTEREST_FORM_TEXT.FIELDS.workAuthorization.label}
            placeholder={
              INTEREST_FORM_TEXT.FIELDS.workAuthorization.placeholder
            }
            listOptions={AuthorizationOptions}
            isSubmitted={isSubmitted}
            tooltipText={
              INTEREST_FORM_TEXT.FIELDS.workAuthorization.tooltipText
            }
            initialValue={savedForm?.workAuthorization || undefined}
            validator={WorkAuthorization}
          />
          {/* Gov Interest*/}
          <RadioGroupField
            fieldName="interestGovt"
            label={INTEREST_FORM_TEXT.FIELDS.interestGovt.label}
            helperText={INTEREST_FORM_TEXT.FIELDS.interestGovt.helperText}
            onChange={(val) => {
              setInterestGov(mapStringToBool(val) || false);
            }}
            rowAlign={true}
            listOptions={YesNoOptions}
            isSubmitted={isSubmitted}
            initialValue={mapBoolToString(interestGovt)}
            validator={TrueFalseString}
          />
          {/* Gov Opp Type*/}
          <MultiSelectField
            fieldName="interestGovtEmplTypes"
            listenTo={['interestGovt']}
            label={INTEREST_FORM_TEXT.FIELDS.interestGovtEmplTypes.label}
            placeholder={
              INTEREST_FORM_TEXT.FIELDS.interestGovtEmplTypes.placeholder
            }
            selectionLabelMulti={
              INTEREST_FORM_TEXT.FIELDS.interestGovtEmplTypes
                .selectionLabelMulti
            }
            selectionLabelSingle={
              INTEREST_FORM_TEXT.FIELDS.interestGovtEmplTypes
                .selectionLabelSingle
            }
            listOptions={USDROptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.interestGovtEmplTypes || []}
            validator={GovtJobType.array().optional()}
            disabled={interestGovt?.toString() !== 'true'}
          />
          {/* Previous XP */}
          <RadioGroupField
            fieldName="previousImpactExperience"
            label={INTEREST_FORM_TEXT.FIELDS.previousImpactExperience.label}
            rowAlign={true}
            listOptions={YesNoOptions}
            isSubmitted={isSubmitted}
            initialValue={mapBoolToString(
              savedForm?.previousImpactExperience || false
            )}
            validator={TrueFalseString}
          />
          {/* Essay */}
          <LongTextField
            fieldName="essayResponse"
            label={INTEREST_FORM_TEXT.FIELDS.essayResponse.label}
            placeholder={INTEREST_FORM_TEXT.FIELDS.essayResponse.placeholder}
            isSubmitted={isSubmitted}
            tooltipText={INTEREST_FORM_TEXT.FIELDS.essayResponse.tooltipText}
            initialValue={savedForm ? savedForm.essayResponse : ''}
            validator={RequiredEssay}
          />
          {/* Reference */}
          <SingleSelectField
            fieldName="referenceAttribution"
            label={INTEREST_FORM_TEXT.FIELDS.referenceAttribution.label}
            placeholder={
              INTEREST_FORM_TEXT.FIELDS.referenceAttribution.placeholder
            }
            listOptions={AttributionOtpions}
            isSubmitted={isSubmitted}
            initialValue={
              savedForm ? savedForm.referenceAttribution?.toString() : ''
            }
            validator={ReferenceAttribution}
          />
          {/* Form Control Buttons */}
          <div className="pt-2">
            <Button
              className="w-full text-component-large"
              label={INTEREST_FORM_TEXT.BUTTONS.save.label}
              type="button"
              name="interest-save"
              variant={ButtonVariant.OUTLINED}
              onClick={doSave}
            />
            <Button
              className="mt-4 w-full text-component-large"
              label={INTEREST_FORM_TEXT.BUTTONS.submit.label}
              name="candidate-application-submit"
              type="submit"
            />
          </div>
        </form>
      )}
    </Form>
  );
};

export default InterestForm;
