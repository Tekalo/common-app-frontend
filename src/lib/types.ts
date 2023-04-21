import {
  EmploymentType,
  OrgSize,
  OrgType,
  Skills,
  VisaSponsorship,
  YearsOfExperience,
} from '@/lib/enums';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

// Interfaces
interface IconTypeProps {
  width: number;
  height: number;
  color: string;
}

export interface ITimelineItem {
  title?: string;
  text: string;
  className?: string;
  isActive?: boolean;
}

export interface IFaqItem {
  questionText: string;
  answerText: string;
  extras?: ReactElement;
  className?: string;
}

export interface IRadioItem {
  value: string;
  displayText: string;
}

export interface ISelectItem {
  value: string;
  displayText: string;
}

// Types
export type IconType = (_props: IconTypeProps) => React.ReactNode;

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (_page: ReactElement) => ReactNode;
};

export enum TablePadding {
  // eslint-disable-next-line no-unused-vars
  ZERO = 'w-[calc(100%)]',
  // eslint-disable-next-line no-unused-vars
  SIX = 'w-[calc(100%+24px)]',
}

export type ContentTableData = {
  headers: {
    heading: string;
    subheading: string;
  }[];
  content: {
    heading: string;
    bullets: string[][];
  }[];
};

export type BasisTableData = {
  headers: string[];
  content: {
    activity: string;
    basis: string | JSX.Element;
  }[];
};

// TODO: Check naming
// ORG REVIEW
export interface IOpportunity {
  organization: IOrganization;
  contact: IContact;
  submissions: ISubmission[];
}

export interface IContact {
  name: string;
  email: string;
  phone: string;
}

export interface ISubmission {
  roleType: string;
  positionTitle: string;
  fullyRemote: boolean;
  location: string;
  paid: boolean;
  pitchEssay: string;
  source: string;
  employmentType: EmploymentType;
  salaryRange: string;
  desiredHoursPerWeek?: string;
  desiredStartDate?: Date;
  desiredEndDate?: Date;
  jdUrl: string;
  desiredYoe: YearsOfExperience;
  desiredSkills: Skills[];
  desiredOtherSkills: string;
  visaSponsorship: VisaSponsorship;
  similarStaffed: boolean;
  desiredImpactExp: string;
}

export interface IOrganization {
  name: string;
  type: OrgType;
  size: OrgSize;
  impactAreas: string;
  eoe: boolean;
}

// END ORG REVIEW
