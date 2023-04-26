import {
  EmploymentType,
  PreferredContact,
  ROLE_YOE,
  SearchStatus,
} from '@/lib/schemas';
import { IBoolItem, IRadioItem, ISelectItem } from '@/lib/types';
import { createOptionList } from '../helpers';

const YoEOptions: Array<ISelectItem> = [
  {
    value: '< 1',
    displayText: 'Less than 1',
  },

  // Generate objects from 1 to 10
  ...Array.from(Array(10).keys()).map((i) => ({
    value: `${i + 1}`,
    displayText: `${i + 1}`,
  })),

  {
    value: '11+',
    displayText: '11+',
  },
];

const RoleYoeOptions: Array<ISelectItem> = ROLE_YOE.options.map((option) => ({
  value: option,
  displayText: option,
}));

const VisaSponsorshipOptions: Array<ISelectItem> = [
  {
    value: 'yes',
    displayText: 'Yes, we sponsor U.S. visas',
  },
  {
    value: 'no',
    displayText: 'No, we do not sponsor U.S. visas',
  },
  {
    value: 'sometimes',
    displayText: 'We sponsor U.S. visas in some cases',
  },
];

const SkillOptions: Array<ISelectItem> = [
  {
    value: 'react',
    displayText: 'React',
  },
  {
    value: 'javascript',
    displayText: 'JavaScript',
  },
  {
    value: 'python',
    displayText: 'Python',
  },
  {
    value: 'java',
    displayText: 'Java',
  },
  {
    value: 'sql',
    displayText: 'SQL',
  },
  {
    value: 'privacy',
    displayText: 'Privacy',
  },
  {
    value: 'security',
    displayText: 'Security',
  },
  {
    value: 'devops',
    displayText: 'DevOps',
  },
  {
    value: 'figma/sketch',
    displayText: 'Figma/Sketch',
  },
  {
    value: 'prototyping',
    displayText: 'Prototyping',
  },
  {
    value: 'user research',
    displayText: 'User research',
  },
  {
    value: 'product development',
    displayText: 'Product development',
  },
  {
    value: 'project management',
    displayText: 'Project management',
  },
];

const EmploymentOptions: Array<ISelectItem> = [
  {
    value: 'full',
    displayText: 'Full-time employment',
  },
  {
    value: 'part',
    displayText: 'Part-time/short term opportunities',
  },
];

const OpportunityOptions: Array<ISelectItem> = createOptionList(
  EmploymentType.options
);

const RoleOptions: Array<ISelectItem> = [
  {
    value: 'data analyst',
    displayText: 'Data analyst',
  },
  {
    value: 'product manager',
    displayText: 'Product manager',
  },
  {
    value: 'software engineer',
    displayText: 'Software engineer',
  },
  {
    value: 'software engineeer backend',
    displayText: 'Software engineer - backend',
  },
  {
    value: 'software engineer frontend',
    displayText: 'Software engineer - frontend',
  },
  {
    value: 'product designer',
    displayText: 'Product designer',
  },

  {
    value: 'ux/ui designer',
    displayText: 'UX/UI designer',
  },
  {
    value: 'ux researcher',
    displayText: 'UX researcher',
  },
];

const CauseOptions: Array<ISelectItem> = [
  {
    value: 'climate change',
    displayText: 'Climate change',
  },
  {
    value: 'environment',
    displayText: 'Environment',
  },
  {
    value: 'human rights & social equality',
    displayText: 'Human rights & social equality',
  },
  {
    value: 'international development',
    displayText: 'International development',
  },
  {
    value: 'education',
    displayText: 'Education',
  },
  {
    value: 'health & well being',
    displayText: 'Health & well-being',
  },
  {
    value: 'government tech',
    displayText: 'Government tech',
  },
  {
    value: 'tech policy',
    displayText: 'Tech policy',
  },
  {
    value: 'trust & safety',
    displayText: 'Trust & safety',
  },
];

const YesNoOptions: Array<IRadioItem> = [
  {
    value: 'false',
    displayText: 'No',
  },
  {
    value: 'true',
    displayText: 'Yes',
  },
];

const TrueFalseOptions: Array<IBoolItem> = [
  {
    value: false,
    displayText: 'No',
  },
  {
    value: true,
    displayText: 'Yes',
  },
];

const USDROptions: Array<ISelectItem> = [
  {
    value: 'paid',
    displayText: 'Paid government jobs with local & state governments',
  },
  {
    value: 'unpaid',
    displayText:
      'Volunteer (unpaid) roles with USDR to support government partners',
  },
];

const AuthorizationOptions: Array<ISelectItem> = [
  {
    value: 'authorized',
    displayText: 'I am authorized to work in the U.S.',
  },
  {
    value: 'sponsorship',
    displayText:
      'I will now or in the future require sponsorship to work in the U.S.',
  },
];

const SearchStatusOptions = [
  {
    value: SearchStatus.Values.active,
    displayText: "I'm actively looking for a new role",
  },
  {
    value: SearchStatus.Values.passive,
    displayText: "I'm flexible, casually looking for opportunities",
  },
  {
    value: SearchStatus.Values.future,
    displayText: 'I want to stay in touch for opportunities in the future',
  },
];

const PreferredContactOptions = [
  {
    value: PreferredContact.Values.email,
    displayText: 'Email',
  },
  {
    value: PreferredContact.Values.sms,
    displayText: 'Text message',
  },
  {
    value: PreferredContact.Values.whatsapp,
    displayText: 'Whatsapp message',
  },
];

export {
  TrueFalseOptions,
  YoEOptions,
  SkillOptions,
  EmploymentOptions,
  OpportunityOptions,
  RoleOptions,
  CauseOptions,
  YesNoOptions,
  USDROptions,
  AuthorizationOptions,
  SearchStatusOptions as searchStatusOptions,
  PreferredContactOptions,
  VisaSponsorshipOptions,
  RoleYoeOptions,
};
