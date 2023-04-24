import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import { Field, Form } from 'houseform';
import { z } from 'zod';

const OrganizationSignup: NextPageWithLayout = () => {
  // State for org contact info
  // State array for org opportunities

  return (
    <Form onSubmit={(values) => alert(JSON.stringify(values))}>
      {({ isValid, submit, errors }) => (
        <div>
          <Field
            name="username"
            initialValue={''}
            onSubmitValidate={z.literal('hello')}
          >
            {({ value, setValue, onBlur }) => (
              <>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={onBlur}
                />
                {errors.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </>
            )}
          </Field>
          <button disabled={!isValid} onClick={submit}>
            Submit
          </button>
        </div>
      )}
    </Form>
  );
};

export default OrganizationSignup;

OrganizationSignup.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
