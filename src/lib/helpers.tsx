import { ISelectItem } from './types';

// Helper taht prints error messages from Houseforms consistently
export const printErrorMessages = (isSubmitted: boolean, errors: string[]) => {
  const errorMessage =
    isSubmitted && errors.length ? (
      <div
        className={'mt-1 text-left text-component-small text-red-error'}
        key={errors[0]}
      >
        {errors[0]}
      </div>
    ) : null;
  return errorMessage;
};

// Helper to create option selects given supporting Zod enums
export const createOptionList = (
  enumOptions: Array<string>
): Array<ISelectItem> => {
  return enumOptions.map((option: string) => ({
    value: option,
    displayText: option[0].toUpperCase() + option.slice(1),
  }));
};
