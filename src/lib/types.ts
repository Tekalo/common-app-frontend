import ApplicantSchemas from '@/capp/schemas/src/applicants';
import OpportunitySchemas from '@/capp/schemas/src/opportunities';
import {
  CandidateDraftSchema,
  CandidateExperienceSchema,
  CandidateInterestsSchema,
  NewOrgSchema,
  NewRoleSchema,
} from '@/lib/schemas/clientSchemas';
import { CommitmentType } from '@/lib/validators/enums';
import { UploadedFile } from '@/lib/validators/object';
import { FieldInstance, FormInstance } from 'houseform';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { z } from 'zod';

/** Types
 */
export type RoleRefType = FormInstance<PartialNewRoleType>;
export type ExperienceRefType = FormInstance<ExperienceFieldsType>;
export type InterestRefType = FormInstance<InterestFieldsType>;
export type FieldStringArrayType = FieldInstance<string[], unknown>;
export type FieldBooleanType = FieldInstance<boolean, unknown>;
export type FieldStringType = FieldInstance<string, unknown>;
export type DraftSubmissionType = z.infer<typeof CandidateDraftSchema>;
export type ExperienceFieldsType = z.infer<typeof CandidateExperienceSchema>;
export type InterestFieldsType = z.infer<typeof CandidateInterestsSchema>;
export type NewCandidateType = z.infer<
  typeof ApplicantSchemas.ApplicantCreateRequestBodySchema
>;
export type NewOrgType = z.infer<typeof NewOrgSchema>;
export type NewRoleType = z.infer<typeof NewRoleSchema>;
export type PartialNewRoleType = Omit<NewRoleType, 'employmentType'> & {
  employmentTypeSelect: string;
  employmentTypeText: string;
};
export type CommitmentType = z.infer<typeof CommitmentType>;
export type IconType = (_props: IIconItem) => React.ReactNode;
export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (_page: ReactElement) => ReactNode;
};
export type UploadedFileType = z.infer<typeof UploadedFile>;

export type SubmissionResponseType = z.infer<
  typeof ApplicantSchemas.ApplicantGetSubmissionsResponseBodySchema
>;

export type AccountSubmissionResponseType = z.infer<
  typeof ApplicantSchemas.ApplicantCreateResponseBodySchema
>;

export type OrgBatchSubmissionResponseType = z.infer<
  typeof OpportunitySchemas.OpportunityBatchResponseBodySchema
>;

export type AccountResponseType = z.infer<
  typeof ApplicantSchemas.ApplicantGetResponseBodySchema
>;

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

export type LinkBlock = {
  title: string;
  href: string;
};

/**Interfaces
 */
interface IIconItem {
  width: number;
  height: number;
  color: string;
}
export interface ITimelineItem {
  title?: string;
  content: string | ReactElement;
  className?: string;
  isEnabled?: boolean;
  isCurrent?: boolean;
}
export interface IFaqItem {
  questionText: string;
  answerText?: ReactElement | string;
  extras?: ReactElement;
  className?: string;
}
export interface ISelectItem {
  value: string;
  displayText: string;
}

export interface IBoolItem {
  value: boolean;
  displayText: string;
}
