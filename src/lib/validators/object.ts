import { ERROR_TEXT } from '@/lang/en/en';
import { z } from 'zod';

export const OptionalDate = z
  .string()
  .optional()
  .refine((str) => {
    if (!str) return true;
    const date = new Date(str);
    return !isNaN(date.getTime());
  }, ERROR_TEXT.invalidDate);

export const RequiredDate = z.coerce.date();

export const UploadedFile = z
  .object({
    id: z.number({ required_error: ERROR_TEXT.required }).min(1),
    originalFilename: z
      .string({ required_error: ERROR_TEXT.required })
      .nonempty(),
  })
  .required();
