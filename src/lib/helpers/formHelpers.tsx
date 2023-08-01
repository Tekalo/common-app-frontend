import { ISelectItem } from '@/lib/types';
import { FormInstance } from 'houseform';
import { RefObject } from 'react';

export const hasLengthError = (errors: string[]): boolean => {
  return errors.some((e) => {
    const match = e.match(/Cannot be over (\d+) characters/);
    if (match) {
      return true;
    }
  });
};

// Helper that prints error messages from Houseforms consistently
export const printErrorMessages = (
  inputId: string,
  isSubmitted: boolean,
  errors: string[],
  disabled?: boolean
) => {
  if (hasLengthError(errors) || (!disabled && isSubmitted && errors.length)) {
    return errors.map((error) => (
      <p
        id={`errorMessage-${inputId}`}
        className={
          'form-error-message mt-1 text-left text-component-small text-red-error'
        }
        key={error}
      >
        {error}
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

/** YOE Transition Helper
 * maps previous YOE to the correct YOE range. Temporary until we can get the
 * backend to return the correct YOE range at all times.
 *
 * TODO: REMOVE ME WHEN BACKEND IS FIXED
 * TODO: Write a test to validate I work like you think I do ;)
 */
export const mapYOEHelper = (
  yoe_array: string[] | undefined
): string[] | undefined => {
  if (yoe_array !== undefined) {
    const newArr = yoe_array.map((yoe) => {
      if (yoe === '0-2') {
        return '0-2';
      } else if (yoe === '2-4' || yoe === '3-5') {
        return '3-5';
      } else if (yoe === '4-8' || yoe === '6-8') {
        return '6-8';
      } else if (yoe === '8-12' || yoe === '9-12') {
        return '9-12';
      } else if (yoe === '12-15' || yoe === '13-15') {
        return '13-15';
      } else if (yoe === '15+') {
        return '15+';
      } else {
        return yoe;
      }
    });
    return newArr;
  }
};
