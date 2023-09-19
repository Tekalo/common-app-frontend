import { Subject } from 'rxjs';
import { IExperienceForm } from './ExperienceForm';

const forceValidateForm = new Subject<void>();

const base: IExperienceForm = {
  forceSubmitForm: forceValidateForm,
  isEditing: false,
  savedForm: {},
  handleSave: () => void {},
  handleNext: () => void {},
  showUploadErrorModal: () => void {},
};

const editing: IExperienceForm = {
  isEditing: true,
  forceSubmitForm: forceValidateForm,
  handleSave: () => void {},
  handleNext: () => void {},
  savedForm: {},
  showUploadErrorModal: () => void {},
};

export const mockExperienceFormProps = {
  base,
  editing,
};
