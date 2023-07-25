import { ERROR_TEXT } from '@/lang/en';
import { ISelectItem } from '@/lib/types';
import { FormInstance } from 'houseform';
import { RefObject } from 'react';

// Helper that prints error messages from Houseforms consistently
export const printErrorMessages = (
  inputId: string,
  isSubmitted: boolean,
  errors: string[],
  disabled?: boolean
) => {
  let errorText: string;

  // Check if errors array contains length error
  const hasLengthError = errors.some((e) => {
    const match = e.match(/Cannot be over (\d+) characters/);
    if (match) {
      errorText = `${ERROR_TEXT.lengthError[0]}${match[1]}${ERROR_TEXT.lengthError[1]}`;
      return true;
    }
  });

  if (hasLengthError || (!disabled && isSubmitted && errors.length)) {
    return errors.map((error) => (
      <p
        id={`errorMessage-${inputId}`}
        className={
          'form-error-message mt-1 text-left text-component-small text-red-error'
        }
        key={error}
      >
        {hasLengthError ? errorText : error}
      </p>
    ));
  }
};

export const executeScroll = () =>
  window.scrollTo({ top: 0, behavior: 'auto' });

export const capitalizeEveryWord = (str: string): string => {
  return str
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeFirstWord = (str: string): string => {
  const strArray = str.split(' ');
  strArray[0] = strArray[0].toUpperCase();

  return strArray.join(' ');
};

// Helper to create option selects given supporting Zod enums
export const createOptionList = (
  enumOptions: Array<string>
): Array<ISelectItem> => {
  return enumOptions.map((option: string) => ({
    value: option,
    displayText: capitalizeFirstLetter(option),
  }));
};

export const getErrorMessageId = (inputId: string): string =>
  `errorMessage-${inputId}`;

export const getInputId = (fieldName: string): string => `input-${fieldName}`;

export const stripEmptyFields = (obj: any): any => {
  const result = Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v !== '')
  );

  return result;
};

export const jumpToFirstErrorMessage = (): void => {
  const scrollOffset = 150;
  const firstError = document.querySelector(
    'input[aria-invalid=true], button[aria-invalid=true]'
  ) as HTMLElement;

  if (firstError) {
    firstError.focus();
    const scrollTop =
      firstError.getBoundingClientRect().top + window.scrollY - scrollOffset;

    window.scroll({ top: scrollTop });
  }
};

export const mapArrayToList = (arr?: string[]): string => {
  return arr ? arr.join(', ') : '';
};

export const mapBoolToYesNo = (bool: boolean): string => {
  return bool ? 'Yes' : 'No';
};

export const mapBoolToString = (bool: boolean | undefined): string => {
  if (bool === true) {
    return 'true';
  } else if (bool === false) {
    return 'false';
  } else {
    return '';
  }
};

export const mapStringToBool = (
  string: string | undefined
): boolean | undefined => {
  if (string === 'true') {
    return true;
  } else if (string === 'false') {
    return false;
  } else {
    return undefined;
  }
};

export const mapDateToString = (date?: Date): string => {
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return date
    ? `${formatNumber(date.getMonth() + 1)}/${formatNumber(
        date.getDate()
      )}/${date.getFullYear()}`
    : '';
};

export const resetForm = (formRef: RefObject<FormInstance<any>>): void => {
  if (formRef.current) {
    formRef.current?.reset();
    formRef.current?.setIsSubmitted(false);
    formRef.current?.setIsDirty(false);
    formRef.current?.setIsTouched(false);
  }
};
