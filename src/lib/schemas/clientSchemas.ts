import { SkillsSelectValidator } from '@/lib/validators/array';
import {
  Causes,
  CommitmentType,
  EmploymentType,
  GovtJobType,
  OpenToRelocate,
  OpenToRemoteMulti,
  OrgSize,
  OrgType,
  ReferenceAttribution,
  Roles,
  VisaSponsorship,
  WorkAuthorization,
  YOE,
  YOE_RANGE,
} from '@/lib/validators/enums';
import { UploadedFile } from '@/lib/validators/object';
import { maxLengthString } from '@/lib/validators/string';
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
    impactAreasOther: z.array(maxLengthString(255)).nullable().optional(),
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
  desiredSkills: SkillsSelectValidator,
  visaSponsorship: VisaSponsorship.optional(),
  similarStaffed: z.boolean(),
  desiredImpactExp: maxLengthString(5000).optional(),
});

/** Candidate Schemas
 */

const CandidateExperienceSchema = z.object({
  lastRole: maxLengthString(255),
  lastOrg: maxLengthString(255),
  yoe: YOE,
  skills: SkillsSelectValidator,
  linkedInUrl: maxLengthString(500).url().nullable().optional(),
  githubUrl: maxLengthString(500).url().nullable().optional(),
  portfolioUrl: maxLengthString(500).url().nullable().optional(),
  portfolioPassword: maxLengthString(255).nullable().optional(),
  resumeUpload: UploadedFile,
});

const CandidateInterestsSchema = z.object({
  hoursPerWeek: maxLengthString(255).nullable().optional(),
  interestWorkArrangement: z.array(EmploymentType),
  interestEmploymentType: z.array(CommitmentType),
  interestRoles: z.array(Roles), // keep this as non-zod-enum?
  currentLocation: maxLengthString(255),
  openToRelocate: OpenToRelocate,
  openToRemoteMulti: z.array(OpenToRemoteMulti),
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

export {
  CandidateExperienceSchema,
  CandidateInterestsSchema,
  NewOrgSchema,
  NewRoleSchema,
};
