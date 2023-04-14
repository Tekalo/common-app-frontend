import Button from '@/components/buttons/Button/Button';
import FreeText from '@/components/input/freeText/FreeText';
import RadioGroup from '@/components/input/radioGroup/RadioGroup';
import ListBox from '@/components/input/singleSelect/SingleSelect';
import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import {
  PreferredContact,
  SearchStatus,
  contactPhoneLinkedValidation,
  validations,
} from '@/lib/schemas';
import { NextPageWithLayout } from '@/lib/types';
import PrivacyModal from '@/modules/components/modal/Modal/Modal';
import { Field, Form } from 'houseform';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';
import { z } from 'zod';

const ApplicantSignup: NextPageWithLayout = () => {
  let [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleSubmit = async (values: unknown) => {
    try {
      const response = await fetch('/api/applicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      console.log(response);

      if (response.ok) {
        // Success -- Move them to the next page
        router.push('/sign-up/applicants/experience-and-interests');
        // TODO: Use iron-session or similar to authenticate the user
      } else {
        // Handle error response
        // TODO -- Show error modal
        console.error('Failed to submit form data');
        alert(await response.text());
      }
    } catch (error) {
      // Handle fetch error
      console.error('Failed to fetch', error);
      alert('Failed to submit form data!');
    }
  };

  const errMsgClasses = 'mt-1 text-left text-component-small text-red-error';
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

  const printErrorMessages = (isSubmitted: boolean, errors: string[]) => {
    const errorMessage =
      isSubmitted && errors.length ? (
        <p className={`${errMsgClasses}`} key={errors[0]}>
          {errors[0]}
        </p>
      ) : (
        ''
      );
    return errorMessage;
  };

  const headerText = 'Privacy Info';

  const bodyText =
    'This Privacy Info is meant to help you understand what information we collect, why we collect it, and how you can manage and delete your information lorem.';

  const extras = (
    <div className="text-p3-desktop">
      See our&nbsp;
      <span className="text-blue-1 underline underline-offset-4">
        <Link href="/privacy-info">Privacy FAQ</Link>
      </span>
      &nbsp;for more information
    </div>
  );

  return (
    <div className="px-6 pb-28 pt-10 md:px-24">
      {/* Title */}
      <div className="mb-4 px-2 text-center text-h3-desktop md:mb-6 md:max-w-[584px]">
        Join a network with over XX00 organizations to find your match.
      </div>
      {/* Navaway has an account*/}
      <div className="text-center text-component-medium">
        {'Already have an account? '}
        <span className="text-blue-1 underline underline-offset-4">
          <Link href="/sign-in">Sign in</Link>
        </span>
      </div>
      <div className="m-auto mt-8 max-w-[344px] md:mt-10 lg:mt-8">
        {/* The form */}
        <Form onSubmit={(values) => handleSubmit(values)}>
          {({ isValid, isSubmitted, submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {/* Name */}
              <Field<string>
                name="name"
                onSubmitValidate={validations.requiredString}
                onChangeValidate={validations.requiredString}
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
                      {printErrorMessages(isSubmitted, errors)}
                    </div>
                  );
                }}
              </Field>
              {/* Email */}
              <Field<string>
                name="email"
                onSubmitValidate={validations.email}
                onChangeValidate={validations.email}
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
                      {printErrorMessages(isSubmitted, errors)}
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
                      {printErrorMessages(isSubmitted, errors)}
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
                    <div className="mt-8 md:w-[120%]">
                      <RadioGroup
                        value={value}
                        setValue={setValue}
                        radioOptions={searchStatusOptions}
                        legendText="Which describes you best?"
                      />
                      {printErrorMessages(isSubmitted, errors)}
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
                      {printErrorMessages(isSubmitted, errors)}
                    </div>
                  );
                }}
              </Field>
              {/* Phone Number */}
              <Field<string>
                listenTo={['preferredContact']}
                name="phone"
                onSubmitValidate={contactPhoneLinkedValidation}
                onChangeValidate={contactPhoneLinkedValidation}
              >
                {/* This componenent should be broken out
                  TODO: Break this into its own component using library for ui formatting + country flags
                  
                  This might be a good library to use:
                  https://www.npmjs.com/package/react-telephone
                */}
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <div className="mt-8 space-y-2">
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
                      {printErrorMessages(isSubmitted, errors)}
                    </div>
                  );
                }}
              </Field>
              {/* TODO: Templatize these */}
              <Field<boolean>
                name="acceptedPrivacy"
                initialValue={false}
                onSubmitValidate={validations.privacyPolicy}
                onChangeValidate={validations.privacyPolicy}
              >
                {({ value, setValue, errors }) => {
                  return (
                    <div className="mt-8 space-y-2 text-left">
                      <fieldset className="space-y-3">
                        <div className="flex space-x-2 align-middle">
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
                            <span
                              className="text-blue-1 underline underline-offset-4"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowPrivacyModal(true);
                              }}
                            >
                              Privacy info
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      {printErrorMessages(isSubmitted, errors)}
                    </div>
                  );
                }}
              </Field>
              {/* TODO Terms of Service */}
              <Field<boolean>
                name="acceptedTerms"
                initialValue={false}
                onSubmitValidate={validations.termsOfService}
                onChangeValidate={validations.termsOfService}
              >
                {({ value, setValue, errors }) => {
                  return (
                    <div className="mt-4 space-y-2 text-left">
                      <fieldset className="space-y-3">
                        <div className="flex space-x-2 align-middle">
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
                              <Link
                                target="_blank"
                                href="/terms-and-conditions"
                              >
                                Terms of Service
                              </Link>
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      {printErrorMessages(isSubmitted, errors)}
                    </div>
                  );
                }}
              </Field>

              {/* OnClick run submit against our API endpoint*/}
              <Button
                className="mt-10 w-full lg:mt-14"
                label="Sign up"
                type="submit"
                disabled={isSubmitted && !isValid}
                onClick={() => submit()}
              />
            </form>
          )}
        </Form>
      </div>
      {/* Navaway for organizations */}
      <div className="mt-6 text-center">
        {"If you're an organization, "}
        <span className="text-blue-1 underline underline-offset-4">
          <Link href="/sign-in">apply here</Link>
        </span>
      </div>
      <PrivacyModal
        headerText={headerText}
        bodyText={bodyText}
        extras={extras}
        isOpen={showPrivacyModal}
        closeModal={() => {
          setShowPrivacyModal(false);
        }}
      />
    </div>
  );
};

export default ApplicantSignup;

ApplicantSignup.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
