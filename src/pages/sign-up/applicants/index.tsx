import Button from '@/components/buttons/Button/Button';
import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { PreferredContact, SearchStatus } from '@/lib/schemas';
import { NextPageWithLayout } from '@/lib/types';
import FreeText from '@/modules/components/input/freeText/FreeText';
import ListBox from '@/modules/components/input/listbox/ListBox';
import RadioGroup from '@/modules/components/input/radioGroup/RadioGroup';
import { Field, Form } from 'houseform';
import Link from 'next/link';
import { z } from 'zod';

const ApplicantSignup: NextPageWithLayout = () => {
  const searchStatusOptions = [
    {
      value: SearchStatus.Values.active,
      displayText: "I'm actively looking for a new role",
    },
    {
      value: SearchStatus.Values.passive,
      displayText: "I'm flexible, casually looking for opportunities",
    },
    {
      value: SearchStatus.Values.future,
      displayText: 'I want to stay in touch for opportunities in the future',
    },
  ];

  const preferredContactOptions = [
    {
      value: PreferredContact.Values.email,
      displayText: 'Email',
    },
    {
      value: PreferredContact.Values.sms,
      displayText: 'Text message',
    },
    {
      value: PreferredContact.Values.whatsapp,
      displayText: 'Whatsapp message',
    },
  ];

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
                    <div className="">
                      <FreeText
                        name="input-name"
                        label="Name"
                        placeholder="Full name"
                        value={value}
                        setValue={setValue}
                        onBlur={onBlur}
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
                    <div className="mt-8">
                      <FreeText
                        name="input-email"
                        label="Email"
                        placeholder="Your email address"
                        value={value}
                        setValue={setValue}
                        onBlur={onBlur}
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
                    <div className="mt-8">
                      <FreeText
                        name="input-pronouns"
                        label="Pronouns (optional)"
                        placeholder="E.g. she/her/hers"
                        value={value}
                        setValue={setValue}
                        onBlur={onBlur}
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
                onSubmitValidate={SearchStatus}
                onChangeValidate={SearchStatus}
              >
                {({ value, setValue, errors }) => {
                  return (
                    <div className="mt-8">
                      <RadioGroup
                        value={value}
                        setValue={setValue}
                        radioOptions={searchStatusOptions}
                        legendText="Which describes you best?"
                      />
                      {isSubmitted &&
                        errors.map((error) => <p key={error}>{error}</p>)}
                    </div>
                  );
                }}
              </Field>
              {/* Contact Method */}
              <Field<string>
                name="preferredContact"
                onSubmitValidate={PreferredContact}
                onChangeValidate={PreferredContact}
              >
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="mt-8">
                      <ListBox
                        name="input-preferredContact"
                        placeholder="Choose one"
                        labelText="Preferred contact method to receive matches"
                        value={value}
                        setValue={setValue}
                        onBlur={onBlur}
                        listOptions={preferredContactOptions}
                      />
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
                  
                  This might be a good library to use:
                  https://www.npmjs.com/package/react-telephone
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
                {({ value, setValue, errors }) => {
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
                {({ value, setValue, errors }) => {
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
