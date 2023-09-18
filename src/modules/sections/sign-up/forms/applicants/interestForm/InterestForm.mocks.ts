import { IInterestForm } from './InterestForm';

const base: IInterestForm = {
  isEditing: false,
  savedForm: {},
  handleSave: () => void {},
  handleSubmit: () => void {},
};

const editing: IInterestForm = {
  isEditing: true,
  savedForm: {},
  handleSave: () => void {},
  handleSubmit: () => void {},
};

export const mockInterestFormProps = {
  base,
  editing,
};
