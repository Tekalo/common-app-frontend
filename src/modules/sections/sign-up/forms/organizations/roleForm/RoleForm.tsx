// TODO Breadcrumbs based on the number of submitted roles
// TODO Aware of what "type" of role form to render
// TODO On submit, add the current form to state, clear the form, move breadcrumb to the next form
// TODO Should allow someone to click a breadcrumb to "navigate" to that form and edit it!

/**
 * Therefore this component needs to know:
 * - How many forms have been submitted (to render breadcrumbs)
 * - Which form is currently being submitted
 * - Which type of form fields to render based on part time, full time, or both
 *
 * So the props need to be:
 * - formList: Array of forms that have been submitted
 * - currentForm: The form that is currently being submitted
 * - formType: The type of form to render (part time, full time, or both)
 *
 * GOOD MORNING! Current state is based on the previous commetns
 * You just wrote the aprent handleNewOpportunity function and needed to update this component props... then render the form...
 */

import Button from '@/components/buttons/Button/Button';
import { RoleType } from '@/lib/enums';
import { NewRole } from '@/lib/types';
import { Form } from 'houseform';

export interface IRoleForm {
  formList: [];
  formType: RoleType;
  handleNewRole: (values: NewRole) => void;
  handleEditRole: (values: NewRole) => void;
}

const RoleForm: React.FC<IRoleForm> = ({
  formList,
  formType,
  handleNewRole,
  handleEditRole,
}) => {
  return (
    <Form<NewRole>
      onSubmit={(values) => {
        console.log(values);
        handleNewRole(values);
      }}
    >
      {({ isSubmitted, submit }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex flex-col space-y-8"
        >
          {/* Form Control Button*/}
          <Button
            className="mt-4 w-full text-component-large"
            label="Next"
            type="submit"
          />
        </form>
      )}
    </Form>
  );
};

export default RoleForm;
