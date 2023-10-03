import { Subject } from 'rxjs';
import { IExperienceForm } from './ExperienceForm';

const forceValidateForm = new Subject<void>();

const base: IExperienceForm = {
  $forceSubmitForm: forceValidateForm,
  handleNext: () => void {},
  handleSave: () => void {},
  isEditing: false,
  savedForm: {},
  showUploadErrorModal: () => void {},
};

const editing: IExperienceForm = {
  $forceSubmitForm: forceValidateForm,
  handleNext: () => void {},
  handleSave: () => void {},
  isEditing: true,
  savedForm: {},
  showUploadErrorModal: () => void {},
};

export const mockExperienceFormProps = {
  base,
  editing,
};
