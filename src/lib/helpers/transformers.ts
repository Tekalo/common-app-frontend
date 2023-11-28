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
