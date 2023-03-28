import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import Link from 'next/link';

import { Field, Form } from 'houseform';
import { z } from 'zod';

const ApplicantSignup: NextPageWithLayout = () => {
  return (
    <div className="grid w-[1120px] max-w-[1120px] grid-flow-col grid-cols-12 justify-center gap-8 text-center">
      {/* Title */}
      <div className="col-span-6 col-start-4 pt-16 font-display text-h3-desktop text-black-text">
        Join a network with over XX00 organizations to find your match.
      </div>
      {/* Navaway have an account*/}
      <div className="col-span-4 col-start-5">
        Already have an account?{' '}
        <span className="text-blue-1 underline underline-offset-4">
          <Link href="/sign-in">Sign in</Link>
        </span>
      </div>
      <div className="col-span-4 col-start-5">
        <Form
          onSubmit={(values) => {
            alert('Form was submitted with: ' + JSON.stringify(values));
          }}
        >
          {({ isValid, submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              {/* Name */}
              <Field<string>
                name="name"
                onBlurValidate={z.string({
                  required_error: 'Name is required',
                  invalid_type_error: 'Name must be a string',
                })}
                onSubmitValidate={isEmailUnique}
              >
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="space-y-2 text-left">
                      <label
                        className="text-component-extra-small text-black-text"
                        htmlFor="input-name"
                      >
                        Name
                      </label>
                      <input
                        name="input-name"
                        className="w-full rounded-[3px] border border-gray-2 p-2 text-component-medium placeholder:text-gray-2"
                        value={value}
                        onBlur={onBlur}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={'Full name'}
                      />
                      {errors.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  );
                }}
              </Field>
              {/* Email */}
              <Field<string>
                name="email"
                onSubmitValidate={z
                  .string()
                  .email('Must be a valid email address')}
              >
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="space-y-2 pt-8 text-left">
                      <label
                        className="text-component-extra-small text-black-text"
                        htmlFor="input-email"
                      >
                        Email
                      </label>
                      <input
                        name="input-email"
                        className="w-full rounded-[3px] border border-gray-2 p-2 text-component-medium placeholder:text-gray-2"
                        value={value}
                        onBlur={onBlur}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={'Your email address'}
                        type="email"
                      />
                      {errors.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  );
                }}
              </Field>
              {/* Pronouns */}
              <Field<string> name="pronouns" onBlurValidate={z.string()}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="space-y-2 pt-8 text-left">
                      <label
                        className="text-component-extra-small text-black-text"
                        htmlFor="input-pronouns"
                      >
                        Pronouns (optional)
                      </label>
                      <input
                        name="input-pronouns"
                        className="w-full rounded-[3px] border border-gray-2 p-2 text-component-medium placeholder:text-gray-2"
                        value={value}
                        onBlur={onBlur}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={'E.g. she/her/hers'}
                        type="string"
                      />
                      {errors.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  );
                }}
              </Field>
              {/* TODO Search Status */}
              <Field<string>
                name="searchStatus"
                onBlurValidate={z
                  .literal('active')
                  .or(z.literal('passive'))
                  .or(z.literal('future'))}
              >
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="space-y-2 pt-8 text-left">
                      <fieldset className="space-y-3">
                        <legend className="pb-1 text-component-extra-small text-black-text">
                          Which describes you best?
                        </legend>
                        <div className="space-x-2 align-middle">
                          <input
                            className="form-radio h-[10px] w-[10px] appearance-none align-middle checked:bg-blue-1 
                            checked:bg-none checked:ring-1 checked:ring-blue-1 checked:ring-offset-2 checked:hover:bg-blue-2 checked:hover:ring-blue-2 focus:ring-1 focus:ring-blue-2 checked:focus:bg-blue-2 checked:focus:ring-blue-2"
                            type="radio"
                            id="active"
                            name="game"
                            value="active"
                            checked={value === 'active'}
                            onChange={(e) => setValue(e.target.value)}
                          />
                          <label
                            htmlFor="active"
                            className="align-middle text-component-medium text-black-text"
                          >
                            {'I’m actively looking for a new role'}
                          </label>
                        </div>

                        <div>
                          <input
                            className="form-radio h-[10px] w-[10px] appearance-none align-middle checked:bg-blue-1 
                            checked:bg-none checked:ring-1 checked:ring-blue-1 checked:ring-offset-2 checked:hover:bg-blue-2 checked:hover:ring-blue-2 focus:ring-1 focus:ring-blue-2 checked:focus:bg-blue-2 checked:focus:ring-blue-2"
                            type="radio"
                            id="bloodborne"
                            name="game"
                            value="bloodborne"
                            checked={value === 'bloodborne'}
                            onChange={(e) => setValue(e.target.value)}
                          />
                          <label
                            htmlFor="bloodborne"
                            className="align-middle text-component-medium text-black-text"
                          >
                            Bloodborne
                          </label>
                        </div>

                        <div>
                          <input
                            className="form-radio h-[10px] w-[10px] appearance-none align-middle checked:bg-blue-1 
                            checked:bg-none checked:ring-1 checked:ring-blue-1 checked:ring-offset-2 checked:hover:bg-blue-2 checked:hover:ring-blue-2 focus:ring-1 focus:ring-blue-2 checked:focus:bg-blue-2 checked:focus:ring-blue-2"
                            type="radio"
                            id="sekiro"
                            name="game"
                            value="sekiro"
                            checked={value === 'sekiro'}
                            onChange={(e) => setValue(e.target.value)}
                          />
                          <label htmlFor="sekiro">Sekiro</label>
                        </div>
                      </fieldset>
                      {errors.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  );
                }}
              </Field>
              {/* TODO Contact Method */}
              <Field<string>
                name="email"
                onBlurValidate={z
                  .string()
                  .email('Must be a valid email address')}
              >
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="space-y-2 pt-8">
                      <div className="text-left text-component-extra-small text-black-text">
                        Email
                      </div>
                      <input
                        className="w-full rounded-[3px] border border-gray-2 p-2 text-component-medium placeholder:text-gray-2"
                        value={value}
                        onBlur={onBlur}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={'Your email address'}
                        type="email"
                      />
                      {errors.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  );
                }}
              </Field>
              {/* TODO Phone Number */}
              <Field<string>
                name="email"
                onBlurValidate={z
                  .string()
                  .email('Must be a valid email address')}
              >
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="space-y-2 pt-8">
                      <div className="text-left text-component-extra-small text-black-text">
                        Email
                      </div>
                      <input
                        className="w-full rounded-[3px] border border-gray-2 p-2 text-component-medium placeholder:text-gray-2"
                        value={value}
                        onBlur={onBlur}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={'Your email address'}
                        type="email"
                      />
                      {errors.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  );
                }}
              </Field>
              {/* TODO Privacy Info */}
              <Field<string>
                name="email"
                onBlurValidate={z
                  .string()
                  .email('Must be a valid email address')}
              >
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="space-y-2 pt-8">
                      <div className="text-left text-component-extra-small text-black-text">
                        Email
                      </div>
                      <input
                        className="w-full rounded-[3px] border border-gray-2 p-2 text-component-medium placeholder:text-gray-2"
                        value={value}
                        onBlur={onBlur}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={'Your email address'}
                        type="email"
                      />
                      {errors.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  );
                }}
              </Field>
              {/* TODO Terms of Service */}
              <Field<string>
                name="email"
                onBlurValidate={z
                  .string()
                  .email('Must be a valid email address')}
              >
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="space-y-2 pt-8">
                      <div className="text-left text-component-extra-small text-black-text">
                        Email
                      </div>
                      <input
                        className="w-full rounded-[3px] border border-gray-2 p-2 text-component-medium placeholder:text-gray-2"
                        value={value}
                        onBlur={onBlur}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={'Your email address'}
                        type="email"
                      />
                      {errors.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  );
                }}
              </Field>
              <button disabled={!isValid} type="submit">
                Submit
              </button>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

// This is simulating a check against a database
function isEmailUnique(val: string) {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      const isUnique = !val.startsWith('crutchcorn');
      if (isUnique) {
        resolve(true);
      } else {
        reject('That email is already taken');
      }
    }, 20);
  });
}

export default ApplicantSignup;

ApplicantSignup.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
