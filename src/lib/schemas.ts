import { FormInstance } from 'houseform';
import { z } from 'zod';

const errorMessages = {
  currentLocation: 'Current location is required',
  interestCauses: 'You must select at least one cause',
  interestRoles: 'You must select at least one role',
  invalidEmail: 'This must be a valid email address',
  invalidPhone: 'This must be a valid phone number',
  orgRequired: 'Organization is required',
  privacyRequired: 'You must accept the privacy policy',
  required: 'This is a required field',
  requiredSelectGroup: 'You must select at least one option',
  roleRequired: 'Role is required',
  termsRequired: 'You must accept the terms of service',
  unknownError: 'An unknown error has occurred',
};

/* This makes phone number required if sms or whatsapp are selected in preferredContact */
export const contactPhoneLinkedValidation = (v: string, f: FormInstance) => {
  const isValid = Promise.resolve(true);
  const preferredContactVal = f.getFieldValue('preferredContact')?.value;
  const hasValue = v.length > 0;

  if (
    hasValue ||
    preferredContactVal === 'sms' ||
    preferredContactVal === 'whatsapp'
  ) {
    return validations.phoneNumber.safeParse(v).success
      ? isValid
      : Promise.reject(
          hasValue ? errorMessages.invalidPhone : errorMessages.required
        );
  }

  return isValid;
};

const defaultEnumErrorMap = (err: z.ZodIssueOptionalMessage) => {
  const errorMsg =
    err.code === 'invalid_enum_value'
      ? errorMessages.required
      : errorMessages.unknownError;

  return { message: errorMsg };
};

export const PreferredContact = z.enum(['sms', 'whatsapp', 'email'], {
  errorMap: defaultEnumErrorMap,
});

export const SearchStatus = z.enum(['active', 'passive', 'future'], {
  errorMap: defaultEnumErrorMap,
});

export const InterestGovtEmplTypes = z.enum(['paid', 'unpaid']);

export const YOE = z.enum(
  ['<1', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '>11'],
  { errorMap: defaultEnumErrorMap }
);

export const TrueFalseString = z.enum(['true', 'false'], {
  errorMap: defaultEnumErrorMap,
});

export const Skills = z.enum([
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
]);

export const Roles = z.enum([
  'data analyst',
  'product manager',
  'software engineer',
  'software engineeer backend',
  'software engineer frontend',
  'product designer',
  'ux/ui designer',
  'ux researcher',
]);

export const Causes = z.enum([
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
]);

export const OpenToRelocate = z.enum(['yes', 'no', 'not sure'], {
  errorMap: defaultEnumErrorMap,
});
export const OpenToRemote = z.enum(
  ['only remote', 'no remote', 'both', 'not sure'],
  {
    errorMap: defaultEnumErrorMap,
  }
);
// This is optional and .optional() doesn't work with an enum
// so we need to let it be empty string
export const WorkAuthorization = z.enum(['authorized', 'sponsorship', '']);
export const ReferenceAttribution = z.enum(
  [
    'website',
    'linkedin',
    'social media',
    'partner organization',
    'career fair',
    'other',
  ],
  { errorMap: defaultEnumErrorMap }
);

export const EmploymentType = z.enum(['full', 'part']);

export const NewApplicant = z.object({
  name: z.string().max(255),
  email: z.string().email(),
  pronoun: z.string().max(255).optional(),
  preferredContact: PreferredContact,
  searchStatus: SearchStatus,
  acceptedTerms: z.literal(true),
  acceptedPrivacy: z.literal(true),
});

const ApplicantResponseBodySchema = z.object({
  id: z.number(),
  auth0Id: z.string().nullable(),
  email: z.string(),
});

const ApplicantQueryParamsSchema = z.object({
  auth0: z
    .string()
    .optional()
    .refine((val) => val === undefined || val === 'true' || val === 'false'),
});

export const ApplicantExperience = z.object({
  lastRole: z.string(),
  lastOrg: z.string(),
  yoe: YOE,
  skills: z.array(Skills),
  otherSkills: z.array(z.string()),
  linkedInUrl: z.string().nullable().optional(),
  githubUrl: z.string().nullable().optional(),
  portfolioUrl: z.string().nullable().optional(),
  portfolioPassword: z.string().nullable().optional(),
  resumeUrl: z.string(),
  resumePassword: z.string().nullable().optional(),
});

export const ApplicantInterests = z.object({
  hoursPerWeek: z.string().nullable().optional(),
  interestEmploymentType: z.array(EmploymentType),
  interestRoles: z.array(Roles), // keep this as non-zod-enum?
  currentLocation: z.string(),
  openToRelocate: OpenToRelocate,
  openToRemote: OpenToRemote,
  desiredSalary: z.string().nullable().optional(),
  interestCauses: z.array(z.string()), // order matters
  otherCauses: z.array(z.string()).nullable().optional(),
  workAuthorization: WorkAuthorization,
  interestGovt: z.boolean(),
  interestGovtEmplTypes: z.array(InterestGovtEmplTypes).optional(),
  previousImpactExperience: z.boolean(),
  essayResponse: z.string(),
  referenceAttribution: ReferenceAttribution.nullable().optional(),
});

export const ApplicantExtras = z.object({
  originTag: z.string(),
});

export const ApplicantSubmission =
  ApplicantExtras.merge(ApplicantExperience).merge(ApplicantInterests);

export const ApplicantDraftSubmission = ApplicantSubmission.partial();

export const OrgType = z.enum(['501c(3)', '501c(4)', 'LLC', 'other']);

export const OrgSize = z.enum([
  '<20',
  '20-50',
  '51-100',
  '101-200',
  '201-500',
  '500+',
]);

const VisaSponsorship = z.enum(['yes', 'no', 'sometimes']);

export const OrgSchema = z.object({
  organization: z.object({
    name: z.string().max(255),
    employmentTypes: z.array(EmploymentType),
    type: OrgType,
    size: OrgSize,
    impactAreas: z.array(z.string().max(255)),
    eoe: z.boolean(),
  }),
  contact: z.object({
    name: z.string().max(255),
    email: z.string().max(255),
    phone: z.string().max(255).nullable().optional(),
  }),
});

export const SubmissionSchema = z.object({
  roleType: z.string().max(255),
  positionTitle: z.string().max(255),
  fullyRemote: z.boolean(),
  location: z.string(),
  paid: z.boolean(),
  pitchEssay: z.string().max(5000),
  source: z.string(),
  employmentType: EmploymentType,
  salaryRange: z.string().max(255),
  desiredHoursPerWeek: z.string().max(255).nullable().optional(),
  desiredStartDate: z.coerce.date().optional(),
  desiredEndDate: z.coerce.date().optional(),
  jdUrl: z.string().max(500).optional(),
  desiredYoe: z.array(YOE),
  desiredSkills: z.array(Skills),
  desiredOtherSkills: z.string().max(255).optional(),
  visaSponsorship: VisaSponsorship,
  similarStaffed: z.boolean(),
  desiredImpactExp: z.string().max(5000).optional(),
});

export const OpportunityBatchRequestBodySchema = OrgSchema.merge(
  z.object({ submissions: z.array(SubmissionSchema) })
);

export const validations = {
  email: z
    .string()
    .nonempty(errorMessages.required)
    .email(errorMessages.invalidEmail),
  phoneNumber: z
    .string()
    .refine((phoneNumber: string) => {
      return new RegExp(
        /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm
      ).test(phoneNumber);
    })
    .optional(),
  privacyPolicy: z.literal(true, {
    errorMap: () => ({
      message: errorMessages.privacyRequired,
    }),
  }),
  requiredString: z.string().nonempty(errorMessages.required),
  optionalString: z.string().optional(),
  termsOfService: z.literal(true, {
    errorMap: () => ({
      message: errorMessages.termsRequired,
    }),
  }),
  lastRole: z.string().nonempty({ message: errorMessages.roleRequired }),
  lastOrg: z.string().nonempty({ message: errorMessages.orgRequired }),
  interestEmploymentType: z
    .array(EmploymentType)
    .nonempty(errorMessages.requiredSelectGroup),
  interestRoles: z.array(Roles).nonempty(errorMessages.interestRoles),
  currentLocation: z.string().nonempty(errorMessages.currentLocation),
  interestCauses: z.array(z.string()).nonempty(errorMessages.interestCauses),
  otherCauses: z.array(z.string()).nullable().optional(),
  interestGovtEmplyTypes: z.array(InterestGovtEmplTypes).optional(),
};
