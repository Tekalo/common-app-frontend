import { voidFn } from '@/lib/helpers/utilities';
import { Subject } from 'rxjs';
import { IExperienceForm } from './ExperienceForm';

const forceValidateForm = new Subject<void>();

const base: IExperienceForm = {
  $forceSubmitForm: forceValidateForm,
  changeHasOcurred: voidFn,
  handleNext: voidFn,
  handleSave: voidFn,
  isEditing: false,
  savedForm: {},
  showUploadErrorModal: voidFn,
};

const editing: IExperienceForm = {
  $forceSubmitForm: forceValidateForm,
  changeHasOcurred: voidFn,
  handleNext: voidFn,
  handleSave: voidFn,
  isEditing: true,
  savedForm: {},
  showUploadErrorModal: voidFn,
};

export const mockExperienceFormProps = {
  base,
  editing,
};
