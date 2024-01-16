import { ERROR_TEXT } from '@/lang/en/en';
import {
  CommitmentType,
  EmploymentType,
  OpenToRemoteMulti,
  Roles,
} from '@/lib/validators/enums';
import { OptionalString, RequiredString } from '@/lib/validators/string';
import { z } from 'zod';

export const CausesValidator = RequiredString.array().refine(
  (v: string[]) => !!v.length,
  {
    message: ERROR_TEXT.interestCauses,
  }
);

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
  .max(8);

export const CausesSelectValidator = z
  .array(RequiredString)
  .min(1, ERROR_TEXT.required)
  .max(8);
