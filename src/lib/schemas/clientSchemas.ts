import {
  Causes,
  CommitmentType,
  EmploymentType,
  GovtJobType,
  maxLengthString,
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

/** Organization Schemas
 */
const NewOrgSchema = z.object({
  commitmentTypes: z.array(CommitmentType),
  referenceAttribution: maxLengthString(2048).optional(),
  referenceAttributionOther: maxLengthString(2048).optional(),
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
  otherRoleType: maxLengthString(2048).optional().nullable(),
  positionTitle: maxLengthString(255),
  fullyRemote: z.boolean(),
  location: maxLengthString(255),
  paid: z.boolean(),
  pitchEssay: maxLengthString(5000),
  employmentType: maxLengthString(255),
  source: maxLengthString(2048),
  salaryRange: maxLengthString(255),
  desiredHoursPerWeek: maxLengthString(255).optional(),
  desiredStartDate: maxLengthString(2048).optional(),
  desiredEndDate: maxLengthString(2048).optional(),
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
  portfolioPassword: maxLengthString(255).nullable().optional(),
  resumeUrl: maxLengthString(500).url(),
  resumePassword: maxLengthString(255).nullable().optional(),
});

const CandidateInterestsSchema = z.object({
  hoursPerWeek: maxLengthString(255).nullable().optional(),
  interestWorkArrangement: z.array(EmploymentType),
  interestEmploymentType: z.array(CommitmentType),
  interestRoles: z.array(Roles), // keep this as non-zod-enum?
  currentLocation: maxLengthString(255),
  openToRelocate: OpenToRelocate,
  openToRemoteMulti: z.array(openToRemoteMulti),
  desiredSalary: maxLengthString(255).nullable().optional(),
  interestCauses: z.array(maxLengthString(255)), // order matters
  otherCauses: z.array(maxLengthString(255)).nullable().optional(),
  workAuthorization: WorkAuthorization,
  interestGovt: z.boolean(),
  interestGovtEmplTypes: z.array(GovtJobType).optional(),
  previousImpactExperience: z.boolean(),
  essayResponse: maxLengthString(5000),
  referenceAttribution: ReferenceAttribution.nullable().optional(),
  referenceAttributionOther: maxLengthString(2048).nullable().optional(),
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
