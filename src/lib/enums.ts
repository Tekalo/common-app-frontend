import { FormInstance } from 'houseform';
import { z } from 'zod';

/** Helpers
 */
const errorMessages = {
  currentLocation: 'Current location is required',
  interestCauses: 'You must select at least one cause',
  interestRoles: 'You must select at least one role',
  invalidEmail: 'This must be a valid email address',
  invalidPhone: 'This must be a valid phone number',
  orgRequired: 'Organization is required',

  privacyRequired: 'You must accept the privacy policy',
  required: 'This is a required field',
  termsRequired: 'You must accept the terms of service',
  eoeRequired:
    'Tekalo only works with Equal Opportunity Employers as defined by the EEOC.',
  unknownError: 'An unknown error has occurred',
  requiredSelectGroup: 'You must select at least one option',
  roleRequired: 'Role is required',
};

const defaultEnumErrorMap = (err: z.ZodIssueOptionalMessage) => {
  const errorMsg =
    err.code === 'invalid_enum_value'
      ? errorMessages.required
      : errorMessages.unknownError;

  return { message: errorMsg };
};

/** Enums
 */
const Email = z
  .string()
  .nonempty(errorMessages.required)
  .email(errorMessages.invalidEmail);

const PhoneNumber = z.string().refine((phoneNumber: string) => {
  return new RegExp(
    /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm
  ).test(phoneNumber);
});

const PrivacyPolicy = z.literal(true, {
  errorMap: () => ({
    message: errorMessages.privacyRequired,
  }),
});

const ToS = z.literal(true, {
  errorMap: () => ({
    message: errorMessages.termsRequired,
  }),
});

const EOE = z.literal(true, {
  errorMap: () => ({
    message: errorMessages.eoeRequired,
  }),
});

const RequiredEssay = z.string().nonempty(errorMessages.required).max(5000);
const OptionalEssay = z
  .string({
    errorMap: () => ({
      message: errorMessages.unknownError,
    }),
  })
  .max(5000)
  .optional();
const RequiredString = z.string().nonempty(errorMessages.required).max(255);
const OptionalString = z.string().max(255).optional();

const CausesValidator = RequiredString.array().refine((v) => !!v.length, {
  message: errorMessages.interestCauses,
});

const OptionalStringArr = z.array(OptionalString).optional();

const RequiredDate = z.coerce.date();
const OptionalDate = z
  .string()
  .optional()
  .refine((str) => {
    if (!str) return true;
    const date = new Date(str);
    return !isNaN(date.getTime());
  }, 'Invalid date');
const OrgType = z.enum(['501(c)(3)', '501(c)(4)', 'LLC', 'other'], {
  errorMap: defaultEnumErrorMap,
});

const OrgSize = z.enum(
  ['<20', '20-50', '51-100', '101-200', '201-500', '500+'],
  { errorMap: defaultEnumErrorMap }
);

const EmploymentType = z.enum(
  [
    'full-time employee',
    'volunteer',
    'contractor',
    'consultant',
    'advisor',
    'internship',
    'other',
  ],
  { errorMap: defaultEnumErrorMap }
);

const CommitmentType = z.enum(['full', 'part'], {
  errorMap: defaultEnumErrorMap,
});

const CommitmentTypeValidator = CommitmentType.array().refine(
  (v) => !!v.length,
  { message: errorMessages.requiredSelectGroup }
);

const GovtJobType = z.enum(['paid', 'unpaid'], {
  errorMap: defaultEnumErrorMap,
});

const YOE = z.enum(
  ['<1', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '>11'],
  { errorMap: defaultEnumErrorMap }
);

const YOE_RANGE = z.enum(['0-2', '2-4', '4-8', '8-12', '12-15', '15+'], {
  errorMap: defaultEnumErrorMap,
});

export const TrueFalseString = z.enum(['true', 'false'], {
  errorMap: defaultEnumErrorMap,
});

const Skills = z.enum(
  [
    'react',
    'javascript',
    'python',
    'java',
    'sql',
    'privacy',
    'security',
    'devops',
    'figma',
    'sketch',
    'prototyping',
    'user research',
    'product development',
    'project management',
  ],
  { errorMap: defaultEnumErrorMap }
);

const Roles = z.enum(
  [
    'software engineer',
    'software engineer - backend',
    'software engineer - frontend',
    'product manager',
    'product designer',
    'ux/ui designer',
    'ux researcher',
    'other',
  ],
  { errorMap: defaultEnumErrorMap }
);

const RolesValidator = Roles.array().refine((v) => !!v.length, {
  message: errorMessages.requiredSelectGroup,
});

const Causes = z.enum(
  [
    'climate change',
    'environment',
    'human rights & social equality',
    'international development',
    'education',
    'health & well being',
    'government tech',
    'tech policy',
    'trust & safety',
    'other',
  ],
  { errorMap: defaultEnumErrorMap }
);

const VisaSponsorship = z.enum(['yes', 'no', 'sometimes'], {
  errorMap: defaultEnumErrorMap,
});

const OpenToRelocate = z.enum(['yes', 'no', 'not sure'], {
  errorMap: defaultEnumErrorMap,
});

const OpenToRemote = z.enum(['only remote', 'no remote', 'both', 'not sure'], {
  errorMap: defaultEnumErrorMap,
});

const WorkAuthorization = z.enum(['authorized', 'sponsorship', ''], {
  errorMap: defaultEnumErrorMap,
});

const ReferenceAttribution = z.enum(
  [
    'website',
    'linkedin',
    'social media',
    'partner organization',
    'career fair',
    'other',
    '',
  ],
  { errorMap: defaultEnumErrorMap }
);

const PreferredContact = z.enum(['email', 'sms', 'whatsapp'], {
  errorMap: defaultEnumErrorMap,
});

const SearchStatus = z.enum(['active', 'passive', 'future'], {
  errorMap: defaultEnumErrorMap,
});

// Functions
const contactPhoneLinkedValidation = (v: string, f: FormInstance) => {
  /* This makes phone number required if sms or whatsapp are selected in preferredContact */
  const isValid = Promise.resolve(true);
  const preferredContactVal = f.getFieldValue('preferredContact')?.value;
  const hasValue = v.length > 0;

  if (
    hasValue ||
    preferredContactVal === 'sms' ||
    preferredContactVal === 'whatsapp'
  ) {
    return PhoneNumber.safeParse(v).success
      ? isValid
      : Promise.reject(
          hasValue ? errorMessages.invalidPhone : errorMessages.required
        );
  }

  return isValid;
};

export {
  Causes,
  CausesValidator,
  CommitmentType,
  CommitmentTypeValidator,
  EOE,
  Email,
  EmploymentType,
  GovtJobType,
  OpenToRelocate,
  OpenToRemote,
  OptionalDate,
  OptionalEssay,
  OptionalString,
  OptionalStringArr,
  OrgSize,
  OrgType,
  PhoneNumber,
  PreferredContact,
  PrivacyPolicy,
  ReferenceAttribution,
  RequiredDate,
  RequiredEssay,
  RequiredString,
  Roles,
  RolesValidator,
  SearchStatus,
  Skills,
  ToS,
  VisaSponsorship,
  WorkAuthorization,
  YOE,
  YOE_RANGE,
  contactPhoneLinkedValidation,
};
