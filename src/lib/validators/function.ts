import { ERROR_TEXT } from '@/lang/en/en';
import { PhoneNumber } from '@/lib/validators/string';
import { FormInstance } from 'houseform';

export const contactPhoneLinkedValidation = (v: string, f: FormInstance) => {
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
