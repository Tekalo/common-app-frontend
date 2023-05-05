import {
  Causes,
  CommitmentType,
  EmploymentType,
  GovtJobType,
  OpenToRelocate,
  OpenToRemote,
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
  organization: z.object({
    name: z.string().max(255),
    type: OrgType,
    size: OrgSize,
    impactAreas: Causes.array(),
    eoe: z.boolean(),
  }),
  contact: z.object({
    name: z.string().max(255),
    email: z.string().max(255).email(),
    phone: z.string().max(255).optional(),
  }),
});

const NewRoleSchema = z.object({
  roleType: Roles,
  positionTitle: z.string().max(255),
  fullyRemote: z.boolean(),
  location: z.string(),
  paid: z.boolean(),
  pitchEssay: z.string().max(5000),
  employmentType: z.string().max(255),
  source: z.string(),
  salaryRange: z.string().max(255),
  desiredHoursPerWeek: z.string().max(255).optional(),
  desiredStartDate: z.string().optional(),
  desiredEndDate: z.string().optional(),
  jdUrl: z.string().url().max(500).optional(),
  desiredYoe: z.array(YOE_RANGE).optional(),
  desiredSkills: z.array(Skills).optional(),
  desiredOtherSkills: z.string().max(255).array().optional(),
  visaSponsorship: VisaSponsorship.optional(),
  similarStaffed: z.boolean(),
  desiredImpactExp: z.string().max(5000).optional(),
});

/** Candidate Schemas
 */
const NewCandidateSchema = z.object({
  name: z.string().max(255),
  email: z.string().email().max(255),
  pronoun: z.string().max(255).optional(),
  preferredContact: PreferredContact,
  searchStatus: SearchStatus,
  acceptedTerms: z.literal(true),
  acceptedPrivacy: z.literal(true),
  followUpOptIn: z.boolean().optional(),
});

const CandidateExperienceSchema = z.object({
  lastRole: z.string(),
  lastOrg: z.string(),
  yoe: YOE,
  skills: z.array(Skills),
  otherSkills: z.array(z.string()),
  linkedInUrl: z.string().url().nullable().optional(),
  githubUrl: z.string().url().nullable().optional(),
  portfolioUrl: z.string().url().nullable().optional(),
  portfolioPassword: z.string().nullable().optional(),
  resumeUrl: z.string().url(),
  resumePassword: z.string().nullable().optional(),
});

const CandidateInterestsSchema = z.object({
  hoursPerWeek: z.string().nullable().optional(),
  interestEmploymentType: z.array(EmploymentType),
  interestRoles: z.array(Roles), // keep this as non-zod-enum?
  currentLocation: z.string(),
  openToRelocate: OpenToRelocate,
  openToRemote: OpenToRemote,
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
