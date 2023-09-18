import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import { SkillOptions, YOEOptions } from '@/lib/constants/selects';
import {
  OptionalString,
  OptionalStringArr,
  RequiredString,
  Skills,
  UploadedFile,
  YOE,
} from '@/lib/enums';
import {
  executeScroll,
  hasLengthError,
  jumpToFirstErrorMessage,
  resetForm,
} from '@/lib/helpers/formHelpers';
import {
  DraftSubmissionType,
  ExperienceFieldsType,
  ExperienceRefType,
  UploadedFileType,
} from '@/lib/types';
import {
  FreeTagField,
  FreeTextField,
  MultiSelectField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import FileUploadField from '@/sections/sign-up/fields/FileUploadField';
import { Form } from 'houseform';
import { useEffect, useRef } from 'react';
import { Observable } from 'rxjs';

export interface IExperienceForm {
  handleNext: (_values: ExperienceFieldsType) => void;
  handleSave: (_values: DraftSubmissionType) => void;
  showUploadErrorModal: () => void;
  forceValidateForm: Observable<void>;
  isEditing: boolean;
  savedForm: DraftSubmissionType | undefined;
}

const ExperienceForm: React.FC<IExperienceForm> = ({
  handleNext,
  handleSave,
  showUploadErrorModal,
  forceValidateForm,
  isEditing,
  savedForm,
}) => {
  useEffect(executeScroll, []);

  useEffect(() => {
    // Need to use the inital value once we get it,
    // so we have to reset the form for it to initialize
    resetForm(formRef);
  }, [savedForm]);

  const formRef = useRef<ExperienceRefType>(null);

  const doSave = () => {
    if (formRef.current) {
      handleSave({ ...savedForm, ...formRef.current.value });
    }
  };

  forceValidateForm.subscribe(async () => {
    await formRef?.current?.submit();
    jumpToFirstErrorMessage();
  });

  return (
    <Form<ExperienceFieldsType>
      onSubmit={(values) => handleNext(values)}
      ref={formRef}
    >
      {({ isSubmitted, submit, errors }) => {
        return (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await submit();
              jumpToFirstErrorMessage();
            }}
            className="space-y-8"
          >
            {/* Current Role */}
            <FreeTextField
              fieldName="lastRole"
              label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.lastRole.label}
              placeholder={
                APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.lastRole.placeholder
              }
              isSubmitted={isSubmitted}
              initialValue={savedForm?.lastRole}
              validator={RequiredString}
            />

            {/* Current Org */}
            <FreeTextField
              fieldName="lastOrg"
              label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.lastOrg.label}
              placeholder={
                APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.lastOrg.placeholder
              }
              isSubmitted={isSubmitted}
              initialValue={savedForm?.lastOrg}
              validator={RequiredString}
            />

            {/* Years Experience */}
            <SingleSelectField
              fieldName="yoe"
              label="Years of relevant experience"
              placeholder="Choose one"
              listOptions={YOEOptions}
              isSubmitted={isSubmitted}
              initialValue={savedForm?.yoe}
              validator={YOE}
            />

            {/* Skills */}
            <MultiSelectField
              fieldName="skills"
              label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.skills.label}
              placeholder={
                APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.skills.placeholder
              }
              selectionLabelMulti={
                APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.skills.selectionLabelMulti
              }
              selectionLabelSingle={
                APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.skills
                  .selectionLabelSingle
              }
              listOptions={SkillOptions}
              isSubmitted={isSubmitted}
              initialValue={savedForm?.skills || []}
              validator={Skills.array().optional()}
            />

            {/* Other Skills */}
            <FreeTagField
              fieldName="otherSkills"
              label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.otherSkills.label}
              placeholder={
                APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.otherSkills.placeholder
              }
              isSubmitted={isSubmitted}
              initialValue={savedForm?.otherSkills || []}
              validator={OptionalStringArr}
            />

            {/* LinkedIn */}
            <FreeTextField
              fieldName="linkedInUrl"
              label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.linkedInUrl.label}
              placeholder={
                APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.linkedInUrl.placeholder
              }
              isSubmitted={isSubmitted}
              initialValue={savedForm?.linkedInUrl || ''}
              validator={OptionalString}
            />

            {/* Portfolio */}
            <FreeTextField
              fieldName="portfolioUrl"
              label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.portfolioUrl.label}
              placeholder={
                APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.portfolioUrl.placeholder
              }
              isSubmitted={isSubmitted}
              initialValue={savedForm?.portfolioUrl || ''}
              validator={OptionalString}
            />

            {/* Portfolio Password */}
            <FreeTextField
              fieldName="portfolioPassword"
              label={
                APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.portfolioPassword.label
              }
              placeholder={
                APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.portfolioPassword
                  .placeholder
              }
              tooltipText={
                APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.portfolioPassword
                  .tooltipText
              }
              isSubmitted={isSubmitted}
              initialValue={savedForm?.portfolioPassword || ''}
              validator={OptionalString}
            />

            {/* Github */}
            <FreeTextField
              fieldName="githubUrl"
              label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.githubUrl.label}
              placeholder={
                APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.githubUrl.placeholder
              }
              isSubmitted={isSubmitted}
              initialValue={savedForm?.githubUrl || ''}
              validator={OptionalString}
            />

            {/* Resume Upload */}
            <FileUploadField
              fieldName="resumeUpload"
              initialValue={savedForm?.resumeUpload || ({} as UploadedFileType)}
              label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.label}
              showUploadErrorModal={showUploadErrorModal}
              submitted={isSubmitted}
              validator={UploadedFile}
            />

            {/* Form Buttons */}
            <div className="pt-2">
              {!isEditing && (
                <Button
                  disabled={hasLengthError(errors)}
                  name="experience-save"
                  className="w-full text-component-large"
                  label={APPLICANT_EXPERIENCE_FORM_TEXT.BUTTONS.save.label}
                  type="button"
                  variant={ButtonVariant.OUTLINED}
                  onClick={doSave}
                />
              )}

              <Button
                disabled={hasLengthError(errors)}
                name="experience-next"
                type="submit"
                className="mt-4 w-full text-component-large"
                label={APPLICANT_EXPERIENCE_FORM_TEXT.BUTTONS.submit.label}
              />
            </div>
          </form>
        );
      }}
    </Form>
  );
};

export default ExperienceForm;
