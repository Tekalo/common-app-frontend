import {
  OrgSize,
  OrgType,
  Roles,
  Skills,
  VisaSponsorship,
  YOE_RANGE,
} from '@/lib/enums';
import { z } from 'zod';

const NewOrgOppSchema = z.object({
  organization: z.object({
    name: z.string().max(255),
    type: OrgType,
    size: OrgSize,
    impactAreas: z.array(z.string().max(255)),
    eoe: z.boolean(),
  }),
  contact: z.object({
    name: z.string().max(255),
    email: z.string().max(255),
    phone: z.string().max(255).nullable().optional(),
  }),
  submissions: z.array(
    z.object({
      roleType: Roles,
      positionTitle: z.string().max(255),
      fullyRemote: z.boolean(),
      location: z.string(),
      paid: z.boolean(),
      pitchEssay: z.string().max(5000),
      source: z.string(),
      employmentType: z.string().max(255),
      salaryRange: z.string().max(255),
      desiredHoursPerWeek: z.string().max(255).nullable().optional(),
      desiredStartDate: z.coerce.date().optional(),
      desiredEndDate: z.coerce.date().optional(),
      jdUrl: z.string().max(500).optional(),
      desiredYoe: z.array(YOE_RANGE),
      desiredSkills: z.array(Skills),
      desiredOtherSkills: z.string().max(255).optional(),
      visaSponsorship: VisaSponsorship,
      similarStaffed: z.boolean(),
      desiredImpactExp: z.string().max(5000).optional(),
    })
  ),
});

const NewOrgOppResponseSchema = z.object({
  id: z.number(),
  contactEmail: z.string(),
  contactName: z.string(),
  contactPhone: z.string().nullable(),
  impactAreas: z.array(z.string()),
  orgName: z.string(),
  orgSize: z.string(),
  orgType: z.string(),
});

export { NewOrgOppSchema, NewOrgOppResponseSchema };
