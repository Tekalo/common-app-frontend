import {
  APPLICANT_EXPERIENCE_FORM_TEXT,
  ERROR_TEXT,
  INTEREST_FORM_TEXT,
} from '@/lang/en/en';
import {
  CommitmentType,
  EmploymentType,
  OpenToRemoteMulti,
  Roles,
} from '@/lib/validators/enums';
import { OptionalString, RequiredString } from '@/lib/validators/string';
import { z } from 'zod';

export const CommitmentTypeValidator = CommitmentType.array().refine(
  (v) => !!v.length,
  { message: ERROR_TEXT.requiredSelectGroup }
);

export const EmploymentTypeValidator = EmploymentType.array().refine(
  (v) => !!v.length,
  { message: ERROR_TEXT.requiredSelectGroup }
);

export const OptionalStringArr = z.array(OptionalString).optional();

export const RemoteValidator = OpenToRemoteMulti.array().refine(
  (v) => !!v.length,
  {
    message: ERROR_TEXT.requiredSelectGroup,
  }
);

export const RolesValidator = Roles.array().refine((v) => !!v.length, {
  message: ERROR_TEXT.requiredSelectGroup,
});

export const SkillsSelectValidator = z
  .array(RequiredString)
  .min(1, ERROR_TEXT.required)
  .max(8, APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.skillsSelect.maxSkillsSelected);

export const CausesSelectValidator = z
  .array(RequiredString)
  .min(1, ERROR_TEXT.interestCauses)
  .max(5, INTEREST_FORM_TEXT.FIELDS.interestCauses.maxCausesSelected);
