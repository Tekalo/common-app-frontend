import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import { Field, Form } from 'houseform';

const OrganizationSignup: NextPageWithLayout = () => {
  return (
    <Form onSubmit={(values) => alert(values)}>
      {({ submit }) => (
        <div>
          <Field name="username" initialValue={''}>
            {({ value, setValue, onBlur }) => (
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
              />
            )}
          </Field>
          <button onClick={submit}>Submit</button>
        </div>
      )}
    </Form>
  );
};

export default OrganizationSignup;

OrganizationSignup.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
