import { voidFn } from '@/lib/helpers/utilities';
import { DraftSubmissionType } from '@/lib/types';
import { IInterestForm } from '@/sections/sign-up/forms/applicants/interestForm/InterestForm';
import { Subject } from 'rxjs';

const $updateInterestValues = new Subject<void>();

const base: IInterestForm = {
  $updateInterestValues,
  changeHasOcurred: voidFn,
  handleSave: voidFn,
  handleSubmit: voidFn,
  isEditing: false,
  savedForm: {} as DraftSubmissionType,
  updateFormValues: voidFn,
};

const editing: IInterestForm = {
  $updateInterestValues,
  changeHasOcurred: voidFn,
  handleSave: voidFn,
  handleSubmit: voidFn,
  isEditing: true,
  savedForm: {} as DraftSubmissionType,
  updateFormValues: voidFn,
};

export const mockInterestFormProps = {
  base,
  editing,
};
