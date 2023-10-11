import { DraftSubmissionType, ISelectItem } from '@/lib/types';
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
    const error = errors[0];

    return (
      <p
        id={`errorMessage-${inputId}`}
        className={
          'form-error-message mt-1 text-left text-component-small text-red-error'
        }
        key={error}
      >
        {error}
      </p>
    );
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

export const convertStringFieldsToBool = <T,>(
  value: T,
  savedForm: DraftSubmissionType | undefined
): T => {
  const newVals = { ...savedForm, ...value };

  // Bc of radio group weirdness, we need to convert the values here
  if (typeof newVals.interestGovt === 'string') {
    newVals.interestGovt = mapStringToBool(newVals.interestGovt);
  }

  if (typeof newVals.previousImpactExperience === 'string') {
    newVals.previousImpactExperience = mapStringToBool(
      newVals.previousImpactExperience
    );
  }

  return newVals as T;
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

export const fireOnInputEvent = (target?: HTMLElement | null): void => {
  target?.dispatchEvent(
    new Event('input', {
      bubbles: true,
      cancelable: true,
    })
  );
};

export const getErrorMessageId = (inputId: string): string =>
  `errorMessage-${inputId}`;

export const getInputId = (fieldName: string): string => `input-${fieldName}`;

export const stripEmptyFields = (obj: any): any => {
  const result = Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      // This strips out empty objects
      if (!Array.isArray(v) && typeof v === 'object' && v !== null) {
        return Object.keys(v).length;
      } else {
        return v != null && v !== '';
      }
    })
  );

  return result;
};

export const nullifyEmptyFields = (obj: any): any => {
  const result = Object.fromEntries(
    Object.entries(obj).map(([_, v]) => {
      // This strips out empty objects, arrays are left empty
      if (!Array.isArray(v) && typeof v === 'object' && v !== null) {
        return Object.keys(v).length ? [_, v] : [_, null];
      } else {
        return v != null && v !== '' ? [_, v] : [_, null];
      }
    })
  );

  return result;
};

export const jumpToFirstErrorMessage = (): void => {
  const scrollOffset = 150;
  const firstError = document.querySelector(
    '*[aria-invalid=true]'
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

export const voidFn = () => void {};
