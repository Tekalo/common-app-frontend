import { printErrorMessages } from '@/lib/helpers/display';
import { getInputId } from '@/lib/helpers/utilities';
import { UploadedFileType } from '@/lib/types';
import FileUpload from '@/modules/components/input/fileUpload/FileUpload';
import { Field } from 'houseform';
import { useState } from 'react';
import { z } from 'zod';

export interface IFileUploadField {
  fieldName: string;
  initialValue: UploadedFileType | undefined;
  label: string;
  showUploadErrorModal: () => void;
  submitted: boolean;
  validator: z.ZodSchema;
  tooltipText?: string;
}

const FileUploadField: React.FC<IFileUploadField> = ({
  fieldName,
  initialValue,
  label,
  showUploadErrorModal,
  submitted,
  validator,
  tooltipText,
}) => {
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  return (
    <Field<UploadedFileType>
      initialValue={initialValue}
      onChangeValidate={validator}
      onSubmitValidate={validator}
      name={fieldName}
    >
      {({ setValue, errors }) => {
        const inputId = getInputId(fieldName);

        return (
          <div data-name="file-upload-field">
            <FileUpload
              errors={errors}
              showUploadErrorModal={showUploadErrorModal}
              id={inputId}
              initialValue={initialValue}
              label={label}
              setFieldErrors={setFieldErrors}
              setValue={setValue}
              tooltipText={tooltipText}
            />
            {printErrorMessages(inputId, submitted || !!fieldErrors.length, [
              ...fieldErrors,
              ...errors,
            ])}
          </div>
        );
      }}
    </Field>
  );
};

export default FileUploadField;
