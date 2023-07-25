import {
  Causes,
  CommitmentType,
  EmploymentType,
  GovtJobType,
  OpenToRelocate,
  openToRemoteMulti,
  OrgSize,
  OrgType,
  PreferredContact,
  ReferenceAttribution,
  Roles,
  SearchStatus,
  Skills,
  VisaSponsorship,
  WorkAuthorization,
  YOE,
  YOE_RANGE,
} from '@/lib/enums';
import { z } from 'zod';
import { maxLengthString } from './../enums';

/** Organization Schemas
 */
const NewOrgSchema = z.object({
  commitmentTypes: z.array(CommitmentType),
  referenceAttribution: z.string().optional(),
  referenceAttributionOther: z.string().optional(),
  organization: z.object({
    name: maxLengthString(255),
    type: OrgType,
    size: OrgSize,
    impactAreas: Causes.array(),
    eoe: z.boolean(),
  }),
  contact: z.object({
    name: maxLengthString(255),
    email: maxLengthString(255).email(),
    phone: maxLengthString(255).optional(),
  }),
});

const NewRoleSchema = z.object({
  roleType: Roles,
  positionTitle: maxLengthString(255),
  fullyRemote: z.boolean(),
  location: z.string(),
  paid: z.boolean(),
  pitchEssay: maxLengthString(5000),
  employmentType: maxLengthString(255),
  source: z.string(),
  salaryRange: maxLengthString(255),
  desiredHoursPerWeek: maxLengthString(255).optional(),
  desiredStartDate: z.string().optional(),
  desiredEndDate: z.string().optional(),
  jdUrl: maxLengthString(500).url().optional(),
  desiredYoe: z.array(YOE_RANGE).optional(),
  desiredSkills: z.array(Skills).optional(),
  desiredOtherSkills: maxLengthString(255).array().optional(),
  visaSponsorship: VisaSponsorship.optional(),
  similarStaffed: z.boolean(),
  desiredImpactExp: maxLengthString(5000).optional(),
});

/** Candidate Schemas
 */
const NewCandidateSchema = z.object({
  name: maxLengthString(255),
  email: maxLengthString(255),
  pronoun: maxLengthString(255).optional(),
  preferredContact: PreferredContact,
  searchStatus: SearchStatus,
  acceptedTerms: z.literal(true),
  acceptedPrivacy: z.literal(true),
  followUpOptIn: z.boolean().optional(),
});

const CandidateExperienceSchema = z.object({
  lastRole: maxLengthString(255),
  lastOrg: maxLengthString(255),
  yoe: YOE,
  skills: z.array(Skills),
  otherSkills: z.array(maxLengthString(255)),
  linkedInUrl: maxLengthString(500).url().nullable().optional(),
  githubUrl: maxLengthString(500).url().nullable().optional(),
  portfolioUrl: maxLengthString(500).url().nullable().optional(),
  portfolioPassword: maxLengthString(500).nullable().optional(),
  resumeUrl: maxLengthString(500).url(),
  resumePassword: maxLengthString(500).nullable().optional(),
});

const CandidateInterestsSchema = z.object({
  hoursPerWeek: z.string().nullable().optional(),
  interestWorkArrangement: z.array(EmploymentType),
  interestEmploymentType: z.array(CommitmentType),
  interestRoles: z.array(Roles), // keep this as non-zod-enum?
  currentLocation: z.string(),
  openToRelocate: OpenToRelocate,
  openToRemoteMulti: z.array(openToRemoteMulti),
  desiredSalary: z.string().nullable().optional(),
  interestCauses: z.array(z.string()), // order matters
  otherCauses: z.array(z.string()).nullable().optional(),
  workAuthorization: WorkAuthorization,
  interestGovt: z.boolean(),
  interestGovtEmplTypes: z.array(GovtJobType).optional(),
  previousImpactExperience: z.boolean(),
  essayResponse: z.string(),
  referenceAttribution: ReferenceAttribution.nullable().optional(),
});

const CandidateDraftSchema = CandidateExperienceSchema.merge(
  CandidateInterestsSchema
).partial();

export {
  NewOrgSchema,
  NewRoleSchema,
  NewCandidateSchema,
  CandidateDraftSchema,
  CandidateExperienceSchema,
  CandidateInterestsSchema,
};
