import { hasLengthError } from '@/lib/helpers/utilities';

// Prints error messages from Houseforms consistently
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
