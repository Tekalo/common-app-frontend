import { BOOL_ENUM_OPTIONS, ERROR_TEXT } from '@/lang/en/en';
import { defaultEnumErrorMap } from '@/lib/validators/errorMaps';
import { ZodString, z } from 'zod';

export const maxLengthString = (len: number): ZodString =>
  z
    .string({
      errorMap: () => ({
        message: ERROR_TEXT.unknownError,
      }),
    })
    .max(len, ERROR_TEXT.lengthError.replace('{{CHAR_LIMIT}}', `${len}`));

export const Email = z
  .string()
  .nonempty(ERROR_TEXT.required)
  .email(ERROR_TEXT.invalidEmail);

export const RequiredEssay = maxLengthString(5000).nonempty(
  ERROR_TEXT.required
);
export const OptionalEssay = maxLengthString(5000).optional();
export const RequiredString = maxLengthString(255).nonempty(
  ERROR_TEXT.required
);
export const OptionalString = maxLengthString(255).optional();
export const OptionalLongString = maxLengthString(500).optional();

export const TrueFalseString = z.enum(BOOL_ENUM_OPTIONS, {
  errorMap: defaultEnumErrorMap,
});

const phoneRegex = /^(?:[0-9] ?){6,14}[0-9]$/g;

export const PhoneNumber = z.string().refine((phoneNumber: string) => {
  return new RegExp(phoneRegex, 'g').test(phoneNumber);
});

export const OptionalPhoneNumber = z.string().refine(
  (phoneNumber: string) => {
    if (phoneNumber.length) {
      return new RegExp(phoneRegex, 'g').test(phoneNumber);
    } else {
      return true;
    }
  },
  { message: ERROR_TEXT.invalidPhone }
);
