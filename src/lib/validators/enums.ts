import {
  CAUSE_ENUM_OPTIONS,
  COMMITMENT_ENUM_OPTIONS,
  CONTACT_ENUM_OPTIONS,
  EMPLOYMENT_TYPE_ENUM_OPTIONS,
  ORG_SIZE_ENUM_OPTIONS,
  ORG_TYPE_ENUM_OPTIONS,
  PAID_ENUM_OPTIONS,
  REF_ENUM_OPTIONS,
  RELOCATION_ENUM_OPTIONS,
  REMOTE_ENUM_OPTIONS,
  ROLE_ENUM_OPTIONS,
  SEARCH_STATUS_ENUM_OPTIONS,
  VISA_ENUM_OPTIONS,
  WORKAUTH_ENUM_OPTIONS,
  YOE_ENUM_OPTIONS,
  YOE_RANGE_ENUM_OPTIONS,
} from '@/lang/en';
import {
  chooseOneErrorMap,
  defaultEnumErrorMap,
} from '@/lib/validators/errorMaps';
import { z } from 'zod';

export const Causes = z.enum(CAUSE_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

export const CommitmentType = z.enum(COMMITMENT_ENUM_OPTIONS, {
  errorMap: chooseOneErrorMap,
});

export const EmploymentType = z.enum(EMPLOYMENT_TYPE_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

export const GovtJobType = z.enum(PAID_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

export const OpenToRelocate = z.enum(RELOCATION_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

export const OpenToRemoteMulti = z.enum(REMOTE_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

export const OrgSize = z.enum(ORG_SIZE_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

export const OrgType = z.enum(ORG_TYPE_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

export const PreferredContact = z.enum(CONTACT_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

export const Roles = z.enum(ROLE_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

export const ReferenceAttribution = z.enum(REF_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

export const YOE = z.enum(YOE_ENUM_OPTIONS, { errorMap: defaultEnumErrorMap });

export const YOE_RANGE = z.enum(YOE_RANGE_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

export const VisaSponsorship = z.enum(VISA_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

export const WorkAuthorization = z.enum(WORKAUTH_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

export const SearchStatus = z.enum(SEARCH_STATUS_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});
