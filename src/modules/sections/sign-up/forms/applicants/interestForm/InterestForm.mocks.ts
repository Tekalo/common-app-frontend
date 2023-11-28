import { voidFn } from '@/lib/helpers/utilities';
import { Subject } from 'rxjs';
import { IInterestForm } from './InterestForm';

const $updateInterestValues = new Subject<void>();

const base: IInterestForm = {
  $updateInterestValues,
  changeHasOcurred: voidFn,
  handleSave: voidFn,
  handleSubmit: voidFn,
  isEditing: false,
  savedForm: {},
  updateFormValues: voidFn,
};

const editing: IInterestForm = {
  $updateInterestValues,
  changeHasOcurred: voidFn,
  handleSave: voidFn,
  handleSubmit: voidFn,
  isEditing: true,
  savedForm: {},
  updateFormValues: voidFn,
};

export const mockInterestFormProps = {
  base,
  editing,
};
