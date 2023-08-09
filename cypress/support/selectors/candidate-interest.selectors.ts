export const CandidateInterestSelectors = {
  employmentType: {
    fullTime: 'input[id="input-interestEmploymentType-full"]',
    partTime: 'input[id="input-interestEmploymentType-part"]',
  },
  workArrangement: {
    input: 'button[name="input-interestWorkArrangement"]',
    options: {
      advisor: 'li[data-name="input-interestWorkArrangement-advisor"]',
      consultant: 'li[data-name="input-interestWorkArrangement-consultant"]',
      contractor: 'li[data-name="input-interestWorkArrangement-contractor"]',
      internship: 'li[data-name="input-interestWorkArrangement-internship"]',
      volunteer: 'li[data-name="input-interestWorkArrangement-volunteer"]',
    },
  },
  hoursPerWeek: {
    input: 'input[name="input-hoursPerWeek"]',
  },
  roles: {
    input: 'button[name="input-interestRoles"]',
    options: {
      dataAnalyst: 'li[data-name="input-interestRoles-data analyst"]',
      dataScientist: 'li[data-name="input-interestRoles-data scientist"]',
      productManager: 'li[data-name="input-interestRoles-product manager"]',
      vpOfProduct:
        'li[data-name="input-interestRoles-vp of product (or similar)"]',
      softwareEngineer: 'li[data-name="input-interestRoles-software engineer"]',
      backendEngineer:
        'li[data-name="input-interestRoles-software engineer - backend"]',
      frontendEngineer:
        'li[data-name="input-interestRoles-software engineer - frontend"]',
      engineeringManager:
        'li[data-name="input-interestRoles-engineering manager"]',
      vpOfEngineering:
        'li[data-name="input-interestRoles-vp of engineering (or similar)"]',
      productDesigner: 'li[data-name="input-interestRoles-product designer"]',
      uiDesigner: 'li[data-name="input-interestRoles-ux/ui designer"]',
      uxResearcher: 'li[data-name="input-interestRoles-ux researcher"]',
    },
  },
  location: {
    input: 'input[name="input-currentLocation"]',
  },
  relocation: {
    input: 'button[name="input-openToRelocate"]',
    options: {
      yes: 'li[data-name="input-openToRelocate-yes"]',
      no: 'li[data-name="input-openToRelocate-no"]',
      notSure: 'li[data-name="input-openToRelocate-not sure"]',
    },
  },
  remote: {
    input: 'button[name="input-openToRemoteMulti"]',
    options: {
      remote: 'li[data-name="input-openToRemoteMulti-remote"]',
      inPerson: 'li[data-name="input-openToRemoteMulti-in-person"]',
      hybrid: 'li[data-name="input-openToRemoteMulti-hybrid"]',
      notSure: 'li[data-name="input-openToRemoteMulti-not sure"]',
    },
  },
  salary: {
    input: 'input[name="input-desiredSalary"]',
  },
  interestCauses: {
    input: 'button[name="input-interestCauses"]',
    options: {
      algorithmicFairness:
        'li[data-name="input-interestCauses-algorithmic fairness"]',
      artsAndCulture: 'li[data-name="input-interestCauses-arts & culture"]',
      benefitsAccess: 'li[data-name="input-interestCauses-benefits access"]',
      climateChange: 'li[data-name="input-interestCauses-climate change"]',
      democracyAndVoting:
        'li[data-name="input-interestCauses-democracy & voting rights"]',
      environment: 'li[data-name="input-interestCauses-environment"]',
      humanRights:
        'li[data-name="input-interestCauses-human rights & social justice"]',
      internationalDev:
        'li[data-name="input-interestCauses-international development"]',
      economicMobility:
        'li[data-name="input-interestCauses-economic mobility"]',
      education: 'li[data-name="input-interestCauses-education"]',
      healthAndWellbeing:
        'li[data-name="input-interestCauses-health & well being"]',
      immigration: 'li[data-name="input-interestCauses-immigration"]',
      govTech: 'li[data-name="input-interestCauses-government tech"]',
      lgbtqRights: 'li[data-name="input-interestCauses-lgbtqia+ rights"]',
      publicInfra: 'li[data-name="input-interestCauses-public infrastructure"]',
      racialJustice: 'li[data-name="input-interestCauses-racial justice"]',
      techPolicy: 'li[data-name="input-interestCauses-tech policy"]',
      trustAndSafety: 'li[data-name="input-interestCauses-trust & safety"]',
      womensRights: 'li[data-name="input-interestCauses-women\'s rights"]',
      other: 'li[data-name="input-interestCauses-other"]',
    },
  },
  otherCauses: {
    input: 'input[name="input-otherCauses"]',
  },
  workAuthorization: {
    input: 'button[name="input-workAuthorization"]',
    options: {
      noSelection: 'li[data-name="input-workAuthorization-"]',
      authorized: 'li[data-name="input-workAuthorization-authorized"]',
      sponsorship: 'li[data-name="input-workAuthorization-sponsorship"]',
    },
  },
  govInterest: {
    no: 'input[name="input-interestGovt-false"]',
    yes: 'input[name="input-interestGovt-true"]',
  },
  govInterestType: {
    input: 'button[name="input-interestGovtEmplTypes"]',
    options: {
      paid: 'li[data-name="input-interestGovtEmplTypes-paid"]',
      unpaid: 'li[data-name="input-interestGovtEmplTypes-unpaid"]',
    },
  },
  previousExperience: {
    no: 'input[name="input-previousImpactExperience-false"]',
    yes: 'input[name="input-previousImpactExperience-true"]',
  },
  essay: {
    input: 'textarea[name="input-essayResponse"]',
  },
  referenceAttribution: {
    input: 'button[name="input-referenceAttribution"]',
    options: {
      noOption: 'li[data-name="input-referenceAttribution-"]',
      linkedin: 'li[data-name="input-referenceAttribution-linkedIn"]',
      otherSocialMedia:
        'li[data-name="input-referenceAttribution-other social media"]',
      atih: 'li[data-name="input-referenceAttribution-partner organization - all tech is human"]',
      ff: 'li[data-name="input-referenceAttribution-partner organization - fast forward"]',
      usdr: 'li[data-name="input-referenceAttribution-partner organization - USDR"]',
      careerFair:
        'li[data-name="input-referenceAttribution-career fair or other event"]',
      other: 'li[data-name="input-referenceAttribution-other"]',
    },
  },
  referenceAttributionOther: {
    input: 'input[name="input-referenceAttributionOther"]',
  },
};
