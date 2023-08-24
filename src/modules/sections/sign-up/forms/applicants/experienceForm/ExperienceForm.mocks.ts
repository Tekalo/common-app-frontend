import { IExperienceForm } from './ExperienceForm';

const base: IExperienceForm = {
  handleSave: () => void {},
  handleNext: () => void {},
  savedForm: {},
  showUploadErrorModal: () => void {},
};

export const mockExperienceFormProps = {
  base,
};
