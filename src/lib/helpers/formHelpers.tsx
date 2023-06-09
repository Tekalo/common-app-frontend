import { ISelectItem } from '@/lib/types';
import { FormInstance } from 'houseform';
import { RefObject } from 'react';

// Helper that prints error messages from Houseforms consistently
export const printErrorMessages = (
  isSubmitted: boolean,
  errors: string[],
  disabled?: boolean
) => {
  const errorMessage =
    !disabled && isSubmitted && errors.length ? (
      <div
        className={
          'form-error-message mt-1 text-left text-component-small text-red-error'
        }
        key={errors[0]}
      >
        {errors[0]}
      </div>
    ) : null;
  return errorMessage;
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeEveryWord = (str: string): string => {
  return str
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
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

export const stripEmptyFields = (obj: any): any => {
  const result = Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v !== '')
  );

  return result;
};

export const jumpToFirstErrorMessage = (): void => {
  const scrollOffset = 150;
  const firstError = document.querySelector('.form-error-message');

  if (firstError) {
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
