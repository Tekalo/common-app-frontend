export const nullifyEmptyFields = (obj: any): any => {
  if (!obj) return {};

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

export const stripEmptyFields = (obj: any): any => {
  const result = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
