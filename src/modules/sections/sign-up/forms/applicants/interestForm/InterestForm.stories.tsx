import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import InterestForm, { IInterestForm } from './InterestForm';
import { mockInterestFormProps } from './InterestForm.mocks';

const DefaultComponent: React.FC<IInterestForm> = ({
  handleSave,
  handleSubmit,
  savedForm,
}) => {
  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div className="m-auto max-w-[352px]">
        <InterestForm
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
