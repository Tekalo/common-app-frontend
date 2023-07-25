import { getInputId, printErrorMessages } from '@/lib/helpers/formHelpers';
import FileUpload from '@/modules/components/input/fileUpload/FileUpload';
import { Field } from 'houseform';

export interface IFileUploadField {
  fieldName: string;
  initialValue: string | undefined;
  label: string;
  tooltipText?: string;
}

const FileUploadField: React.FC<IFileUploadField> = ({
  fieldName,
  initialValue,
  label,
  tooltipText,
}) => {
  return (
    <Field<string> initialValue={initialValue} name={fieldName}>
      {({ value, setValue, onBlur, errors }) => {
        const inputId = getInputId(fieldName);

        return (
          <div>
            <FileUpload
              id={inputId}
              initialValue={initialValue}
              label={label}
              tooltipText={tooltipText}
            />
            {printErrorMessages(inputId, true, errors)}
          </div>
        );
      }}
    </Field>
  );
};

export default FileUploadField;
