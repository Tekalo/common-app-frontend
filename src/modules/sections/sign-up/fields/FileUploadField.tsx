import { getInputId, printErrorMessages } from '@/lib/helpers/formHelpers';
import FileUpload from '@/modules/components/input/fileUpload/FileUpload';
import { Field } from 'houseform';
import { useState } from 'react';

export interface IFileUploadField {
  fieldName: string;
  initialValue: string | undefined;
  label: string;
  showUploadErrorModal: () => void;
  tooltipText?: string;
}

const FileUploadField: React.FC<IFileUploadField> = ({
  fieldName,
  initialValue,
  label,
  showUploadErrorModal,
  tooltipText,
}) => {
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  return (
    <Field<string> initialValue={initialValue} name={fieldName}>
      {({ value, setValue, onBlur, errors }) => {
        const inputId = getInputId(fieldName);

        return (
          <div>
            <FileUpload
              showUploadErrorModal={showUploadErrorModal}
              id={inputId}
              initialValue={initialValue}
              label={label}
              setFieldErrors={setFieldErrors}
              tooltipText={tooltipText}
            />
            {printErrorMessages(inputId, true, [...errors, ...fieldErrors])}
          </div>
        );
      }}
    </Field>
  );
};

export default FileUploadField;
