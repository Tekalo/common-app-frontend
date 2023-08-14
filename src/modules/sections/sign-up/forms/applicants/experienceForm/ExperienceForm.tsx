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

export interface IExperienceForm {
  handleNext: (_values: ExperienceFieldsType) => void;
  handleSave: (_values: DraftSubmissionType) => void;
  savedForm: DraftSubmissionType | undefined;
  showUploadErrorModal: () => void;
}

const ExperienceForm: React.FC<IExperienceForm> = ({
  handleNext,
  handleSave,
  savedForm,
  showUploadErrorModal,
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

  return (
    <Form<ExperienceFieldsType>
      onSubmit={(values) => handleNext(values)}
      ref={formRef}
    >
      {({ isSubmitted, submit, errors }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit().then(() => {
              jumpToFirstErrorMessage();
            });
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
              APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.skills.selectionLabelSingle
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
            fieldName="resume-upload"
            initialValue={undefined}
            label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.label}
            showUploadErrorModal={showUploadErrorModal}
            submitted={isSubmitted}
            validator={UploadedFile}
          />

          {/* Resume */}
          {/* <FreeTextField
            fieldName="resumeUrl"
            label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.resumeUrl.label}
            placeholder={
              APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.resumeUrl.placeholder
            }
            tooltipText={
              APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.resumeUrl.tooltipText
            }
            isSubmitted={isSubmitted}
            initialValue={savedForm?.resumeUrl || ''}
            validator={OptionalLongString}
          /> */}

          {/* Resume Password */}
          {/* <FreeTextField
            fieldName="resumePassword"
            label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.resumePassword.label}
            placeholder={
              APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.resumePassword.placeholder
            }
            isSubmitted={isSubmitted}
            initialValue={savedForm?.resumePassword || ''}
            validator={OptionalString}
          /> */}

          {/* Form Buttons */}
          <div className="pt-2">
            <Button
              disabled={hasLengthError(errors)}
              name="experience-save"
              className="w-full text-component-large"
              label={APPLICANT_EXPERIENCE_FORM_TEXT.BUTTONS.save.label}
              type="button"
              variant={ButtonVariant.OUTLINED}
              onClick={doSave}
            />

            <Button
              disabled={hasLengthError(errors)}
              name="experience-next"
              type="submit"
              className="mt-4 w-full text-component-large"
              label={APPLICANT_EXPERIENCE_FORM_TEXT.BUTTONS.submit.label}
            />
          </div>
        </form>
      )}
    </Form>
  );
};

export default ExperienceForm;
