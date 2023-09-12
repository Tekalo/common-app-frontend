export const OrganizationRoleSelectors = {
  roleType: {
    input: 'button[name="input-roleType"]',
    options: {
      dataAnalyst: 'li[data-name="input-roleType-data analyst"]',
      dataScientist: 'li[data-name="input-roleType-data scientist"]',
      productManager: 'li[data-name="input-roleType-product manager"]',
      vpOfProduct: 'li[data-name="input-roleType-vp of product (or similar)"]',
      softwareEngineer: 'li[data-name="input-roleType-software engineer"]',
      backendEngineer:
        'li[data-name="input-roleType-software engineer - backend"]',
      frontendEngineer:
        'li[data-name="input-roleType-software engineer - frontend"]',
      engineeringManager: 'li[data-name="input-roleType-engineering manager"]',
      vpOfEngineering:
        'li[data-name="input-roleType-vp of engineering (or similar)"]',
      productDesigner: 'li[data-name="input-roleType-product designer"]',
      uiDesigner: 'li[data-name="input-roleType-ux/ui designer"]',
      uxResearcher: 'li[data-name="input-roleType-ux researcher"]',
      other: 'li[data-name="input-roleType-other"]',
    },
  },

  roleTypeOther: {
    input: 'input[name="input-otherRoleType"]',
  },
};
