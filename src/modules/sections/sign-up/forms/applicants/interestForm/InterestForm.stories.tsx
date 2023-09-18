import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import InterestForm, { IInterestForm } from './InterestForm';
import { mockInterestFormProps } from './InterestForm.mocks';

const DefaultComponent: React.FC<IInterestForm> = ({
  isEditing,
  savedForm,
  handleSave,
  handleSubmit,
}) => {
  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div className="m-auto max-w-[352px]">
        <InterestForm
          isEditing={isEditing}
          handleSave={handleSave}
          handleSubmit={handleSubmit}
          savedForm={savedForm}
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
