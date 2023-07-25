import {
  BOOL_ENUM_OPTIONS,
  CAUSE_ENUM_OPTIONS,
  COMMITMENT_ENUM_OPTIONS,
  CONTACT_ENUM_OPTIONS,
  EMPLOYMENT_TYPE_ENUM_OPTIONS,
  ERROR_TEXT,
  ORG_SIZE_ENUM_OPTIONS,
  ORG_TYPE_ENUM_OPTIONS,
  PAID_ENUM_OPTIONS,
  REF_ENUM_OPTIONS,
  RELOCATION_ENUM_OPTIONS,
  REMOTE_ENUM_OPTIONS,
  ROLE_ENUM_OPTIONS,
  SEARCH_STATUS_ENUM_OPTIONS,
  SKILL_ENUM_OPTIONS,
  VISA_ENUM_OPTIONS,
  WORKAUTH_ENUM_OPTIONS,
  YOE_ENUM_OPTIONS,
  YOE_RANGE_ENUM_OPTIONS,
} from '@/lang/en';
import { FormInstance } from 'houseform';
import { z } from 'zod';

/** Helpers
 */

const defaultEnumErrorMap = (err: z.ZodIssueOptionalMessage) => {
  const errorMsg =
    err.code === 'invalid_enum_value'
      ? ERROR_TEXT.required
      : ERROR_TEXT.unknownError;

  return { message: errorMsg };
};

const chooseOneErrorMap = (err: z.ZodIssueOptionalMessage) => {
  console.log(err);
  const errorMsg =
    err.code === 'invalid_type'
      ? ERROR_TEXT.chooseOne
      : ERROR_TEXT.unknownError;

  return { message: errorMsg };
};

/** Enums
 */
const Email = z
  .string()
  .nonempty(ERROR_TEXT.required)
  .email(ERROR_TEXT.invalidEmail);

const PrivacyPolicy = z.literal(true, {
  errorMap: () => ({
    message: ERROR_TEXT.privacyRequired,
  }),
});

const ToS = z.literal(true, {
  errorMap: () => ({
    message: ERROR_TEXT.termsRequired,
  }),
});

const EOE = z.literal(true, {
  errorMap: () => ({
    message: ERROR_TEXT.eoeRequired,
  }),
});

const RequiredEssay = z.string().nonempty(ERROR_TEXT.required).max(5000);
const OptionalEssay = z
  .string({
    errorMap: () => ({
      message: ERROR_TEXT.unknownError,
    }),
  })
  .max(5000)
  .optional();
const RequiredString = z.string().nonempty(ERROR_TEXT.required).max(255);
const OptionalString = z.string().max(255).optional();
const OptionalLongString = z.string().max(500).optional();
const CausesValidator = RequiredString.array().refine((v) => !!v.length, {
  message: ERROR_TEXT.interestCauses,
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
  }, ERROR_TEXT.invalidDate);

const OrgType = z.enum(ORG_TYPE_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

const OrgSize = z.enum(ORG_SIZE_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

const EmploymentType = z.enum(EMPLOYMENT_TYPE_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

const EmploymentTypeValidator = EmploymentType.array().refine(
  (v) => !!v.length,
  { message: ERROR_TEXT.requiredSelectGroup }
);

const CommitmentType = z.enum(COMMITMENT_ENUM_OPTIONS, {
  errorMap: chooseOneErrorMap,
});

const CommitmentTypeValidator = CommitmentType.array().refine(
  (v) => !!v.length,
  { message: ERROR_TEXT.requiredSelectGroup }
);

const GovtJobType = z.enum(PAID_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

const YOE = z.enum(YOE_ENUM_OPTIONS, { errorMap: defaultEnumErrorMap });

const YOE_RANGE = z.enum(YOE_RANGE_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

export const TrueFalseString = z.enum(BOOL_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

const Skills = z.enum(SKILL_ENUM_OPTIONS, { errorMap: defaultEnumErrorMap });

const Roles = z.enum(ROLE_ENUM_OPTIONS, { errorMap: defaultEnumErrorMap });

const RolesValidator = Roles.array().refine((v) => !!v.length, {
  message: ERROR_TEXT.requiredSelectGroup,
});

const Causes = z.enum(CAUSE_ENUM_OPTIONS, { errorMap: defaultEnumErrorMap });

const VisaSponsorship = z.enum(VISA_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

const OpenToRelocate = z.enum(RELOCATION_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

const openToRemoteMulti = z.enum(REMOTE_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

const RemoteValidator = openToRemoteMulti.array().refine((v) => !!v.length, {
  message: ERROR_TEXT.requiredSelectGroup,
});

const WorkAuthorization = z.enum(WORKAUTH_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

const ReferenceAttribution = z.enum(REF_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

const PreferredContact = z.enum(CONTACT_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

const SearchStatus = z.enum(SEARCH_STATUS_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

const phoneRegex = /^(?:[0-9] ?){6,14}[0-9]$/g;

const PhoneNumber = z.string().refine((phoneNumber: string) => {
  return new RegExp(phoneRegex, 'g').test(phoneNumber);
});

const OptionalPhoneNumber = z.string().refine(
  (phoneNumber: string) => {
    if (phoneNumber.length) {
      return new RegExp(phoneRegex, 'g').test(phoneNumber);
    } else {
      return true;
    }
  },
  { message: ERROR_TEXT.invalidPhone }
);

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
          hasValue ? ERROR_TEXT.invalidPhone : ERROR_TEXT.required
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
  EmploymentTypeValidator,
  GovtJobType,
  OpenToRelocate,
  OptionalDate,
  OptionalEssay,
  OptionalPhoneNumber,
  OptionalString,
  OptionalLongString,
  OptionalStringArr,
  OrgSize,
  OrgType,
  PhoneNumber,
  PreferredContact,
  PrivacyPolicy,
  ReferenceAttribution,
  RemoteValidator,
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
  openToRemoteMulti,
};
