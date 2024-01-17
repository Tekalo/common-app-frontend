export const OrganizationSignupSelectors = {
  name: {
    input: 'input[name="input-organization.name"]',
  },
  type: {
    input: 'button[name="input-organization.type"]',
    options: {
      c3: 'li[name="input-organization.type-501(c)(3)"]',
      c4: 'li[data-name="input-organization.type-501(c)(4)"]',
      llc: 'li[data-name="input-organization.type-llc"]',
      bcorp: 'li[data-name="input-organization.type-b corp"]',
      other: 'li[data-name="input-organization.type-other"]',
    },
  },
  size: {
    input: 'button[name="input-organization.size"]',
    options: {
      lt20: 'li[data-name="input-organization.size-<20"]',
      gt20lt50: 'li[data-name="input-organization.size-20-50"]',
      gt50lt100: 'li[data-name="input-organization.size-51-100"]',
      gt100lt200: 'li[data-name="input-organization.size-101-200"]',
      gt200lt500: 'li[data-name="input-organization.size-201-500"]',
      gt500: 'li[data-name="input-organization.size-500+"]',
    },
  },
  impactAreas: {
    input: 'input[id="input-organization.impactAreas-input"]',
    options: {
      algoFairness:
        'li[data-name="input-organization.impactAreas-algorithmic fairness"]',
      artsCult: 'li[data-name="input-organization.impactAreas-arts & culture"]',
      benefitAccess:
        'li[data-name="input-organization.impactAreas-benefits access"]',
      climateChange:
        'li[data-name="input-organization.impactAreas-climate change"]',
      democracyVoting:
        'li[data-name="input-organization.impactAreas-democracy & voting rights"]',
      environment: 'li[data-name="input-organization.impactAreas-environment"]',
      humanRights:
        'li[data-name="input-organization.impactAreas-human rights & social justice"]',
      intlDev:
        'li[data-name="input-organization.impactAreas-international development"]',
      econMobility:
        'li[data-name="input-organization.impactAreas-economic mobility"]',
      education: 'li[data-name="input-organization.impactAreas-education"]',
      healthWellbeing:
        'li[data-name="input-organization.impactAreas-health & well being"]',
      immigration: 'li[data-name="input-organization.impactAreas-immigration"]',
      govtTech:
        'li[data-name="input-organization.impactAreas-government tech"]',
      lgbtqRights:
        'li[data-name="input-organization.impactAreas-lgbtqia+ rights"]',
      pubInfra:
        'li[data-name="input-organization.impactAreas-public infrastructure"]',
      racialJustice:
        'li[data-name="input-organization.impactAreas-racial justice"]',
      techPolicy: 'li[data-name="input-organization.impactAreas-tech policy"]',
      trustSafety:
        'li[data-name="input-organization.impactAreas-trust & safety"]',
      womensRights:
        'li[data-name="input-organization.impactAreas-women\'s rights"]',
      other: 'li[data-name="input-organization.impactAreas-other"]',
    },
  },
  impactAreasOther: {
    input: 'input[name="input-organization.impactAreasOther"]',
  },
  phone: {
    input: 'input[name="input-contact.phone"]',
  },
  positionType: {
    fullTime: 'input[id="input-commitmentTypes-full"]',
    partTime: 'input[id="input-commitmentTypes-part"]',
  },
  eoe: {
    input: 'button[name="input-organization.eoe"]',
    options: {
      false: 'li[data-name="input-organization.eoe-false"]',
      true: 'li[data-name="input-organization.eoe-true"]',
    },
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
