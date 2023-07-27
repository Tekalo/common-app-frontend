import { ERROR_TEXT } from '@/lang/en';
import { UploadedFileId } from '@/lib/enums';
import * as FileUploadModule from '@/modules/components/input/fileUpload/FileUpload';
import { IFileUpload } from '@/modules/components/input/fileUpload/FileUpload';
import FileUploadField, {
  IFileUploadField,
} from '@/modules/sections/sign-up/fields/FileUploadField';

Cypress.Commands.add('mountFileUploadField', (props: IFileUploadField) => {
  let childProps: IFileUpload;

  const MockFileUpload: React.FC<IFileUpload> = ({
    id,
    initialValue,
    label,
    setFieldErrors,
    setValue,
    showUploadErrorModal,
    tooltipText,
  }) => {
    childProps = {
      id,
      initialValue,
      label,
      setFieldErrors,
      setValue,
      showUploadErrorModal,
      tooltipText,
    };

    return <>Mock FileUpload</>;
  };

  cy.stub(FileUploadModule, 'default').callsFake(MockFileUpload);

  cy.mount(
    <FileUploadField
      fieldName={props.fieldName}
      initialValue={props.initialValue}
      label={props.label}
      showUploadErrorModal={props.showUploadErrorModal}
      submitted={props.submitted}
      validator={props.validator}
      tooltipText={props.tooltipText}
    ></FileUploadField>
  ).then(() => {
    return childProps;
  });
});

describe('FileUploadField', () => {
  const fieldName = 'example-field-name';
  const label = 'Example Label';

  let props: IFileUploadField;

  beforeEach(() => {
    props = {
      fieldName,
      initialValue: undefined,
      label,
      showUploadErrorModal: () => void {},
      submitted: false,
      validator: UploadedFileId,
      tooltipText: undefined,
    };
  });

  it('should render', () => {
    cy.mountFileUploadField(props);

    cy.get('div[data-name=file-upload-field]').should('be.visible');
  });

  it('should show required error message', () => {
    props.submitted = true;

    cy.mountFileUploadField(props).then((childProps) => {
      childProps.setValue('');

      cy.get('p#errorMessage-input-example-field-name').should(
        'have.text',
        ERROR_TEXT.required
      );
    });
  });

  it('should display a field error from FileUpload', () => {
    cy.mountFileUploadField(props).then((childProps) => {
      const mockFieldError = 'This is an example field error!';

      childProps.setFieldErrors([mockFieldError]);

      cy.get('p#errorMessage-input-example-field-name').should(
        'have.text',
        mockFieldError
      );
    });
  });
});
