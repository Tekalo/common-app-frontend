import { CandidateDraftSchema } from '@/lib/schemas/clientSchemas';
import {
  OrgSize,
  OrgType,
  Roles,
  Skills,
  VisaSponsorship,
  YOE_RANGE,
} from '@/lib/validators/enums';
import { maxLengthString } from '@/lib/validators/string';
import { z } from 'zod';

const SubmissionResponseSchema = z.object({
  roleType: Roles,
  positionTitle: maxLengthString(255),
  fullyRemote: z.boolean(),
  location: maxLengthString(255),
  paid: z.boolean(),
  pitchEssay: maxLengthString(5000),
  source: maxLengthString(2048),
  employmentType: maxLengthString(255),
  salaryRange: maxLengthString(255),
  desiredHoursPerWeek: maxLengthString(255).nullable().optional(),
  desiredStartDate: z.coerce.date().optional(),
  desiredEndDate: z.coerce.date().optional(),
  jdUrl: maxLengthString(500).optional(),
  desiredYoe: z.array(YOE_RANGE),
  desiredSkills: z.array(Skills),
  desiredOtherSkills: maxLengthString(255).optional(),
  visaSponsorship: VisaSponsorship,
  similarStaffed: z.boolean(),
  desiredImpactExp: maxLengthString(5000).optional(),
});

const NewOrgOppSchema = z.object({
  organization: z.object({
    name: maxLengthString(255),
    type: OrgType,
    size: OrgSize,
    impactAreas: z.array(maxLengthString(255)),
    impactAreasOther: z.array(maxLengthString(255)).nullable().optional(),
    eoe: z.boolean(),
  }),
  contact: z.object({
    name: maxLengthString(255),
    email: maxLengthString(255),
    phone: maxLengthString(255).nullable().optional(),
  }),
  submissions: z.array(SubmissionResponseSchema),
});

const NewOrgOppResponseSchema = z.object({
  id: z.number(),
  contactEmail: maxLengthString(2048),
  contactName: maxLengthString(2048),
  contactPhone: maxLengthString(2048).nullable(),
  impactAreas: z.array(maxLengthString(2048)),
  impactAreasOther: z.array(maxLengthString(255)).nullable().optional(),
  orgName: maxLengthString(2048),
  orgSize: maxLengthString(2048),
  orgType: maxLengthString(2048),
});

const DraftResponseSchema = z.object({
  submission: CandidateDraftSchema.extend({
    createdAt: z.string(),
    updatedAt: z.string(),
    applicantId: z.number(),
    utmParams: z.object({
      ga_client_id: z.string().optional(),
      ga_session_id: z.string().optional(),
      utm_campaign: z.string().optional(),
      utm_content: z.string().optional(),
      utm_id: z.string().optional(),
      utm_medium: z.string().optional(),
      utm_source_platform: z.string().optional(),
      utm_source: z.string().optional(),
      utm_term: z.string().optional(),
    }),
  }),
  isFinal: z.boolean(),
});

export { DraftResponseSchema, NewOrgOppResponseSchema, NewOrgOppSchema };
