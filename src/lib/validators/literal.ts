import { ERROR_TEXT } from '@/lang/en';
import { z } from 'zod';

export const EOE = z.literal(true, {
  errorMap: () => ({
    message: ERROR_TEXT.eoeRequired,
  }),
});

export const PrivacyPolicy = z.literal(true, {
  errorMap: () => ({
    message: ERROR_TEXT.privacyRequired,
  }),
});

export const ToS = z.literal(true, {
  errorMap: () => ({
    message: ERROR_TEXT.termsRequired,
  }),
});
