import InterestForm, {
  IInterestForm,
} from '@/sections/sign-up/forms/applicants/interestForm/InterestForm';
import { mockInterestFormProps } from '@/sections/sign-up/forms/applicants/interestForm/InterestForm.mocks';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

const DefaultComponent: React.FC<IInterestForm> = ({
  $updateInterestValues,
  changeHasOcurred,
  handleSave,
  handleSubmit,
  isEditing,
  savedForm,
  updateFormValues,
}) => {
  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div className="m-auto max-w-[352px]">
        <InterestForm
          handleSave={handleSave}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
          savedForm={savedForm}
          $updateInterestValues={$updateInterestValues}
          updateFormValues={updateFormValues}
          changeHasOcurred={changeHasOcurred}
        />
      </div>
    </DndProvider>
  );
};

export default { component: DefaultComponent };

export const Default = {
  args: { ...mockInterestFormProps.base },
};

export const Editing = {
  args: { ...mockInterestFormProps.editing },
};
