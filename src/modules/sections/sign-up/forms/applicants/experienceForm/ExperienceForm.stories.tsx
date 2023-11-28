import ExperienceForm from '@/sections/sign-up/forms/applicants/experienceForm/ExperienceForm';
import { mockExperienceFormProps } from '@/sections/sign-up/forms/applicants/experienceForm/ExperienceForm.mocks';

export default { component: ExperienceForm };

export const Default = {
  args: { ...mockExperienceFormProps.base },
};

export const Editing = {
  args: { ...mockExperienceFormProps.editing },
};
