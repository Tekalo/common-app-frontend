import { mapStringToBool } from '@/lib/helpers/mappers';
import { DraftSubmissionType } from '@/lib/types';

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

export const convertStringFieldsToBool = <T>(
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
