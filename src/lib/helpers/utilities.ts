import { FormInstance } from 'houseform';
import { RefObject } from 'react';

export const executeScroll = () =>
  window.scrollTo({ top: 0, behavior: 'auto' });

export const getErrorMessageId = (inputId: string): string =>
  `errorMessage-${inputId}`;

export const getInputId = (fieldName: string): string => `input-${fieldName}`;

export const hasLengthError = (errors: string[]): boolean => {
  return errors.some((e) => {
    const match = e.match(/Cannot be over (\d+) characters/);
    if (match) {
      return true;
    }
  });
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

export const removeValueFromArray = <T>(valueToRemove: T, arr: T[]): T[] => {
  const removeIdx = arr.indexOf(valueToRemove);
  let newArr: T[];

  if (removeIdx !== -1) {
    newArr = [...arr];
    newArr.splice(removeIdx, 1);
  } else {
    newArr = arr;
  }

  return newArr;
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
