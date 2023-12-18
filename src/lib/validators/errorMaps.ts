import { ERROR_TEXT } from '@/lang/en/en';
import { z } from 'zod';

export const defaultEnumErrorMap = (err: z.ZodIssueOptionalMessage) => {
  const errorMsg =
    err.code === 'invalid_enum_value'
      ? ERROR_TEXT.required
      : ERROR_TEXT.unknownError;

  return { message: errorMsg };
};

export const chooseOneErrorMap = (err: z.ZodIssueOptionalMessage) => {
  const errorMsg =
    err.code === 'invalid_type'
      ? ERROR_TEXT.chooseOne
      : ERROR_TEXT.unknownError;

  return { message: errorMsg };
};
