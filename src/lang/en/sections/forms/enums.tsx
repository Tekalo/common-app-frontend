export const TURNSTILE_ENUM_OPTIONS = {
  error: 'error',
  expired: 'expired',
  solved: 'solved',
};

export const ORG_TYPE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  '501(c)(3)',
  '501(c)(4)',
  'llc',
  'b corp',
  'other',
];

export const ORG_SIZE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  '<20',
  '20-50',
  '51-100',
  '101-200',
  '201-500',
  '500+',
];

export const EMPLOYMENT_TYPE_TEXT = {
  fte: 'full-time employee',
  volunteer: 'volunteer',
  contractor: 'contractor',
  consultant: 'consultant',
  advisor: 'advisor',
  internship: 'internship',
  other: 'other',
};

export const EMPLOYMENT_TYPE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  EMPLOYMENT_TYPE_TEXT.fte,
  EMPLOYMENT_TYPE_TEXT.volunteer,
  EMPLOYMENT_TYPE_TEXT.contractor,
  EMPLOYMENT_TYPE_TEXT.consultant,
  EMPLOYMENT_TYPE_TEXT.advisor,
  EMPLOYMENT_TYPE_TEXT.internship,
  EMPLOYMENT_TYPE_TEXT.other,
];

export const COMMITMENT_ENUM_TEXT = {
  full: 'full' as const,
  part: 'part' as const,
};

export const COMMITMENT_ENUM_OPTIONS: readonly [string, ...string[]] = [
  COMMITMENT_ENUM_TEXT.full,
  COMMITMENT_ENUM_TEXT.part,
];

export const PAID_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'paid',
  'unpaid',
];

export const YOE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  '<1',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '>11',
];

export const YOE_RANGE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  '0-2',
  '3-5',
  '6-8',
  '9-12',
  '13-15',
  '15+',
];

export const BOOL_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'true',
  'false',
];

export const ROLE_ENUM_TEXT = {
  dataAnalyst: 'data analyst',
  dataScientist: 'data scientist',
  engManager: 'engineering manager',
  pd: 'product designer',
  pm: 'product manager',
  swe: 'software engineer',
  sweBackend: 'software engineer - backend',
  sweFrontend: 'software engineer - frontend',
  ux: 'ux/ui designer',
  uxResearcher: 'ux researcher',
  vpEng: 'vp of engineering (or similar)',
  vpProduct: 'vp of product (or similar)',
  other: 'other',
};

export const ROLE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  ROLE_ENUM_TEXT.dataAnalyst,
  ROLE_ENUM_TEXT.dataScientist,
  ROLE_ENUM_TEXT.pm,
  ROLE_ENUM_TEXT.vpProduct,
  ROLE_ENUM_TEXT.swe,
  ROLE_ENUM_TEXT.sweBackend,
  ROLE_ENUM_TEXT.sweFrontend,
  ROLE_ENUM_TEXT.engManager,
  ROLE_ENUM_TEXT.vpEng,
  ROLE_ENUM_TEXT.pd,
  ROLE_ENUM_TEXT.ux,
  ROLE_ENUM_TEXT.uxResearcher,
  ROLE_ENUM_TEXT.other,
];

export const CAUSE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'algorithmic fairness',
  'arts & culture',
  'benefits access',
  'climate change',
  'democracy & voting rights',
  'environment',
  'human rights & social justice',
  'international development',
  'economic mobility',
  'education',
  'health & well-being',
  'immigration',
  'government tech',
  'lgbtqia+ rights',
  'public infrastructure',
  'racial justice',
  'tech policy',
  'trust & safety',
  "women's rights",
  'other',
];

export const VISA_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'yes',
  'no',
  'sometimes',
];

export const RELOCATION_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'yes',
  'no',
  'not sure',
];

export const REMOTE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'remote',
  'in-person',
  'hybrid',
  'not sure',
];

export const WORKAUTH_ENUM_OPTIONS: readonly [string, ...string[]] = [
  '',
  'authorized',
  'sponsorship',
];

export const REF_ENUM_OPTIONS: readonly [string, ...string[]] = [
  '',
  'linkedIn',
  'other social media',
  'partner organization - all tech is human',
  'partner organization - fast forward',
  'partner organization - USDR',
  'career fair or other event',
  'other',
];

export const CONTACT_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'email',
  'sms',
  'whatsapp',
];

export const SEARCH_STATUS_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'active',
  'passive',
  'future',
];

export const YOE_OPTION_TEXT = {
  lt1: 'Less than 1',
  gt11: '11+',
};

export const VISA_SPONSOR_TEXT = {
  yes: 'Yes, we sponsor U.S. visas',
  no: 'No, we do not sponsor U.S. visas',
  sometimes: 'We sponsor U.S. visas in some cases',
};

export const COMMITMENT_TEXT = {
  fullTime: 'Full-time employment',
  partTime: 'Part-time/short-term opportunities',
};

export const ROLE_TEXT = {
  uxResearcher: 'UX researcher',
  uxDesigner: 'UX/UI designer',
};

export const YES_NO_TEXT = {
  yes: 'Yes',
  no: 'No',
};

export const PAID_TEXT = {
  paid: 'Paid',
  unpaid: 'Unpaid',
};

export const USDR_TEXT = {
  paid: 'Paid government jobs with local & state governments',
  unpaid: 'Volunteer (unpaid) roles with USDR to support government partners',
};

export const WORK_AUTHORIZATION_TEXT = {
  authorized: 'I am authorized to work in the U.S.',
  sponsorship:
    'I will now or in the future require sponsorship to work in the U.S.',
};

export const SEARCH_STATUS_TEXT = {
  active: "I'm actively looking for opportunities",
  passive: "I'm flexible, casually looking for opportunities",
  future: 'I want to stay in touch for opportunities in the future',
};

export const CONTACT_OPTION_TEXT = {
  email: 'Email',
  sms: 'Text message',
  whatsapp: 'WhatsApp message',
};

export const ORG_SIZE_LABEL_TEXT = {
  employees: ' employees',
};
