import Button from '@/components/buttons/Button/Button';
import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import { Field, Form } from 'houseform';
import Link from 'next/link';
import { z } from 'zod';

const ApplicantSignup: NextPageWithLayout = () => {
  return (
    <div className="mb-40 grid w-[1120px] max-w-[1120px] grid-flow-col grid-cols-12 justify-center gap-8 text-center">
      {/* Title */}
      <div className="col-span-6 col-start-4 pt-16 font-display text-h3-desktop text-black-text">
        Join a network with over XX00 organizations to find your match.
      </div>
      {/* Navaway has an account*/}
      <div className="col-span-4 col-start-5">
        {'Already have an account? '}
        <span className="text-blue-1 underline underline-offset-4">
          <Link href="/sign-in">Sign in</Link>
        </span>
      </div>
      <div className="col-span-4 col-start-5">
        {/* The form */}
        <Form
          onSubmit={(values) => {
            alert('Form was submitted with: ' + JSON.stringify(values));
          }}
        >
          {({ isValid, isSubmitted, submit }) => (
            <>
              {/* Name */}
              <Field<string>
                name="name"
                onSubmitValidate={z.string({
                  required_error: 'Name is required',
                  invalid_type_error: 'Name must be a string',
                })}
                onChangeValidate={z.string({
                  required_error: 'Name is required',
                  invalid_type_error: 'Name must be a string',
                })}
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
                      {isSubmitted &&
                        errors.map((error) => <p key={error}>{error}</p>)}
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
                onChangeValidate={z
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
                      {isSubmitted &&
                        errors.map((error) => <p key={error}>{error}</p>)}
                    </div>
                  );
                }}
              </Field>
              {/* Pronouns */}
              <Field<string>
                name="pronouns"
                onSubmitValidate={z.string()}
                onChangeValidate={z.string()}
              >
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
                      {isSubmitted &&
                        errors.map((error) => <p key={error}>{error}</p>)}
                    </div>
                  );
                }}
              </Field>
              {/* Search Status */}
              <Field<string>
                name="searchStatus"
                onSubmitValidate={z
                  .literal('active')
                  .or(z.literal('passive'))
                  .or(z.literal('future'))}
                onChangeValidate={z
                  .literal('active')
                  .or(z.literal('passive'))
                  .or(z.literal('future'))}
              >
                {({ value, setValue, errors }) => {
                  return (
                    <div className="space-y-2 pt-8 text-left">
                      {/* TODO: Refactor this fieldset into component */}
                      <fieldset className="space-y-3">
                        <legend className="pb-1 text-component-extra-small text-black-text">
                          Which describes you best?
                        </legend>
                        {/* RADIO OPTIONS */}
                        <div className="space-x-2 align-middle">
                          <input
                            className="form-radio h-[10px] w-[10px] appearance-none align-middle checked:bg-blue-1 
                            checked:bg-none checked:ring-1 checked:ring-blue-1 checked:ring-offset-2 checked:hover:bg-blue-2 checked:hover:ring-blue-2 focus:ring-1 focus:ring-blue-2 checked:focus:bg-blue-2 checked:focus:ring-blue-2"
                            type="radio"
                            id="active"
                            name="searchStatus"
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

                        <div className="space-x-2 align-middle">
                          <input
                            className="form-radio h-[10px] w-[10px] appearance-none align-middle checked:bg-blue-1 
                            checked:bg-none checked:ring-1 checked:ring-blue-1 checked:ring-offset-2 checked:hover:bg-blue-2 checked:hover:ring-blue-2 focus:ring-1 focus:ring-blue-2 checked:focus:bg-blue-2 checked:focus:ring-blue-2"
                            type="radio"
                            id="passive"
                            name="searchStatus"
                            value="passive"
                            checked={value === 'passive'}
                            onChange={(e) => setValue(e.target.value)}
                          />
                          <label
                            htmlFor="passive"
                            className="align-middle text-component-medium text-black-text"
                          >
                            {'I’m flexible, casually looking for opportunities'}
                          </label>
                        </div>

                        <div className="w-[115%] space-x-2 align-middle">
                          <input
                            className="form-radio h-[10px] w-[10px] appearance-none align-middle checked:bg-blue-1 
                            checked:bg-none checked:ring-1 checked:ring-blue-1 checked:ring-offset-2 checked:hover:bg-blue-2 checked:hover:ring-blue-2 focus:ring-1 focus:ring-blue-2 checked:focus:bg-blue-2 checked:focus:ring-blue-2"
                            type="radio"
                            id="future"
                            name="searchStatus"
                            value="future"
                            checked={value === 'future'}
                            onChange={(e) => setValue(e.target.value)}
                          />
                          <label
                            htmlFor="future"
                            className="w-[115%] align-middle text-component-medium text-black-text"
                          >
                            {
                              'I want to stay in touch for opportunities in the future'
                            }
                          </label>
                        </div>
                      </fieldset>
                      {isSubmitted &&
                        errors.map((error) => <p key={error}>{error}</p>)}
                    </div>
                  );
                }}
              </Field>
              {/* Contact Method */}
              <Field<string>
                name="preferredContact"
                onSubmitValidate={z.union(
                  [z.literal('sms'), z.literal('whatsapp'), z.literal('email')],
                  {
                    errorMap: () => ({
                      message: 'Something is incorrect',
                    }),
                  }
                )}
                onChangeValidate={z.union(
                  [z.literal('sms'), z.literal('whatsapp'), z.literal('email')],
                  {
                    errorMap: () => ({
                      message: 'Something is incorrect',
                    }),
                  }
                )}
              >
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    // TODO: To style this we need to use headless UI or something similar. You cannot style native options
                    <div className="space-y-2 pt-8 text-left">
                      <label htmlFor="input-contactMethod">
                        Preferred contact method to receive matches
                      </label>
                      <select
                        name="input-contactMethod"
                        id="input-contactMethod"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={onBlur}
                        className="ring-black right-0 z-10  mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-opacity-5 focus:outline-none"
                      >
                        <option value="" className="text-gray-2" disabled>
                          Choose one
                        </option>
                        <option value="email">Email</option>
                        <option value="sms">Text message</option>
                        <option value="whatsapp">WhatsApp message</option>
                      </select>
                      {isSubmitted &&
                        errors.map((error) => <p key={error}>{error}</p>)}
                    </div>
                  );
                }}
              </Field>
              {/* Phone Number */}
              <Field<string>
                name="phone"
                onSubmitValidate={z.string()}
                onChangeValidate={z.string()}
              >
                {/* This componenent should be broken out
                  TODO: Chain zod validator for mobile numbers 
                  TODO: Break this into its own component using library for ui formatting + country flags
                */}
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="space-y-2 pt-8">
                      <div className="text-left text-component-extra-small text-black-text">
                        {'Phone number (optional)'}
                      </div>
                      <input
                        className="w-full rounded-[3px] border border-gray-2 p-2 text-component-medium placeholder:text-gray-2"
                        value={value}
                        onBlur={onBlur}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={'+1 (555) 555-5555'}
                        type="tel"
                      />
                      {isSubmitted &&
                        errors.map((error) => <p key={error}>{error}</p>)}
                    </div>
                  );
                }}
              </Field>
              {/* TODO Privacy Info */}
              <Field<boolean>
                name="acceptedPrivacy"
                initialValue={false}
                onSubmitValidate={z.literal(true, {
                  errorMap: () => ({
                    message: 'You must accept the privacy policy',
                  }),
                })}
                onChangeValidate={z.literal(true, {
                  errorMap: () => ({
                    message: 'You must accept the privacy policy',
                  }),
                })}
              >
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="space-y-2 pt-8 text-left">
                      <fieldset className="space-y-3">
                        <div className="space-x-2 align-middle">
                          <input
                            className="form-checkbox h-4 w-4 appearance-none align-middle checked:bg-blue-1 
                             checked:hover:bg-blue-2 checked:hover:ring-blue-2 focus:ring-1 focus:ring-blue-2 checked:focus:bg-blue-2 checked:focus:ring-blue-2"
                            type="checkbox"
                            id="active"
                            name="input-acceptedPrivacy"
                            checked={value}
                            onChange={(e) => setValue(e.target.checked)}
                          />
                          <label
                            htmlFor="input-acceptedPrivacy"
                            className="align-middle text-component-small text-black-text"
                          >
                            By signing up, you acknowledge the{' '}
                            <span className="text-blue-1 underline underline-offset-4">
                              <Link href="/sign-in">Privacy info</Link>
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      {isSubmitted &&
                        errors.map((error) => <p key={error}>{error}</p>)}
                    </div>
                  );
                }}
              </Field>
              {/* TODO Terms of Service */}
              <Field<boolean>
                name="acceptedTerms"
                initialValue={false}
                onSubmitValidate={z.literal(true, {
                  errorMap: () => ({
                    message: 'You must accept the terms of service',
                  }),
                })}
                onChangeValidate={z.literal(true, {
                  errorMap: () => ({
                    message: 'You must accept the terms of service',
                  }),
                })}
              >
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="space-y-2 pt-3 text-left">
                      <fieldset className="space-y-3">
                        <div className="space-x-2 align-middle">
                          <input
                            className="form-checkbox h-4 w-4 appearance-none align-middle checked:bg-blue-1 
                             checked:hover:bg-blue-2 checked:hover:ring-blue-2 focus:ring-1 focus:ring-blue-2 checked:focus:bg-blue-2 checked:focus:ring-blue-2"
                            type="checkbox"
                            id="active"
                            name="input-acceptedTerms"
                            checked={value}
                            onChange={(e) => setValue(e.target.checked)}
                          />
                          <label
                            htmlFor="input-acceptedTerms"
                            className="align-middle text-component-small text-black-text"
                          >
                            {'By signing up, you agree to the '}
                            <span className="text-blue-1 underline underline-offset-4">
                              <Link href="/sign-in">Terms of Service</Link>
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      {isSubmitted &&
                        errors.map((error) => <p key={error}>{error}</p>)}
                    </div>
                  );
                }}
              </Field>

              <Button
                className="mt-14 w-full"
                label="Sign up"
                type="submit"
                disabled={isSubmitted && !isValid}
                onClick={() => submit()}
              />
            </>
          )}
        </Form>
      </div>
      {/* Navaway for organizations */}
      <div className="col-span-4 col-start-5">
        {"If you're an organization, "}
        <span className="text-blue-1 underline underline-offset-4">
          <Link href="/sign-in">apply here</Link>
        </span>
      </div>
    </div>
  );
};

export default ApplicantSignup;

ApplicantSignup.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
