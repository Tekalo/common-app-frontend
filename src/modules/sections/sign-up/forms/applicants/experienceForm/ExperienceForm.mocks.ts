import { voidFn } from '@/lib/helpers/utilities';
import { IExperienceForm } from '@/sections/sign-up/forms/applicants/experienceForm/ExperienceForm';
import { Subject } from 'rxjs';

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
