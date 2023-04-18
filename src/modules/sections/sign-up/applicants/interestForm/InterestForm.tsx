import Button from '@/components/buttons/Button/Button';
import { Form, FormInstance } from 'houseform';
import { useRef } from 'react';

export interface IInterestForm {
  handleSubmit: (_values: unknown) => void;
  handleSave: (_values: unknown) => void;
  savedForm: any;
}

const InterestForm: React.FC<IInterestForm> = ({
  handleSubmit,
  handleSave,
  savedForm,
}) => {
  const formRef = useRef<FormInstance<Record<string, any>>>(null);

  const doSave = () => {
    if (formRef.current) {
      handleSave(formRef.current.value);
    }
  };

  return (
    <Form onSubmit={(values) => handleSubmit(values)} ref={formRef}>
      {({ isSubmitted, submit }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          {/* EXPERIENCE FORM FIELDS */}
          {/* TODO: Employment */}
          {/* TODO: Hours per week */}
          {/* TODO: Roles */}
          {/* TODO: Location */}
          {/* TODO: Reloaction*/}
          {/* TODO: Remote */}
          {/* TODO: Salary*/}
          {/* TODO: Causes */}
          {/* TODO: Cause Rank*/}
          {/* TODO: Other Causes*/}
          {/* TODO: Work Auth*/}
          {/* TODO: Gov Opps*/}
          {/* TODO: What Gov*/}
          {/* TODO: Previous XP*/}
          {/* TODO: Unlimited Resources*/}
          {/* TODO: Reference*/}

          <Button
            className="mt-14 w-full text-component-large"
            label="Save your progress"
            type="button"
            outlined
            onClick={doSave}
          />

          <Button
            className="mt-4 w-full text-component-large"
            label="Submit"
            type="submit"
          />
        </form>
      )}
    </Form>
  );
};

export default InterestForm;
