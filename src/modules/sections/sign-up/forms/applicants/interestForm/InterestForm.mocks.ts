import { Subject } from 'rxjs';
import { IInterestForm } from './InterestForm';

const $updateInterestValues = new Subject<void>();
const voidFn = () => void {};

const base: IInterestForm = {
  $updateInterestValues,
  handleSave: voidFn,
  handleSubmit: voidFn,
  isEditing: false,
  savedForm: {},
  updateFormValues: voidFn,
};

const editing: IInterestForm = {
  $updateInterestValues,
  handleSave: () => void {},
  handleSubmit: () => void {},
  isEditing: true,
  savedForm: {},
  updateFormValues: voidFn,
};

export const mockInterestFormProps = {
  base,
  editing,
};
