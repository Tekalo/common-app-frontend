import { z } from 'zod';

export const PreferredContact = z.enum(['sms', 'whatsapp', 'email']);
export const SearchStatus = z.enum(['active', 'passive', 'future']);
const YOE = z.enum([
  '< 1',
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
  '11+',
]);
const Skills = z.enum([
  'react',
  'javascript',
  'python',
  'java',
  'sql',
  'privacy',
  'security',
  'devops',
  'figma/sketch',
  'prototyping',
  'user research',
  'product development',
  'project management',
]);
const OpenToRelocate = z.enum(['yes', 'no', 'not sure']);
const OpenToRemote = z.enum(['yes', 'no', 'both', 'not sure']);
const WorkAuthorization = z.enum(['authorized', 'sponsorship']);
const ReferenceAttribution = z.enum([
  'website',
  'linkedin',
  'social media',
  'partner organization',
  'career fair',
  'other',
]);
const EmploymentType = z.enum(['full', 'part']);

const ApplicantRequestBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  preferredContact: PreferredContact,
  searchStatus: SearchStatus,
  acceptedTerms: z.literal(true),
  acceptedPrivacy: z.literal(true),
});

const ApplicantResponseBodySchema = z.object({
  id: z.number(),
  auth0Id: z.string().nullable(),
  email: z.string(),
});

const ApplicantQueryParamsSchema = z.object({
  auth0: z
    .string()
    .optional()
    .refine((val) => val === undefined || val === 'true' || val === 'false'),
});

const ApplicantSubmissionRequestBodySchema = z.object({
  // TODO re name these they are way 2 long
  originTag: z.string(),
  lastRole: z.string(),
  lastOrg: z.string(),
  yoe: YOE,
  skills: z.array(Skills),
  otherSkills: z.array(z.string()),
  linkedInUrl: z.string().nullable().optional(),
  githubUrl: z.string().nullable().optional(),
  portfolioUrl: z.string().nullable().optional(),
  portfolioPassword: z.string().nullable().optional(),
  resumeUrl: z.string(),
  resumePassword: z.string().nullable().optional(),
  hoursPerWeek: z.string().nullable().optional(),
  interestEmploymentType: z.array(EmploymentType),
  interestRoles: z.array(z.string()), // keep this as non-zod-enum?
  currentLocation: z.string(),
  openToRelocate: OpenToRelocate,
  openToRemote: OpenToRemote,
  desiredSalary: z.string().nullable().optional(),
  interestCauses: z.array(z.string()), // order matters
  otherCauses: z.string().nullable().optional(),
  workAuthorization: WorkAuthorization,
  interestGovt: z.boolean(),
  previousImpactExperience: z.boolean(),
  essayResponse: z.string(),
  referenceAttribution: ReferenceAttribution.nullable().optional(),
});

export {
  ApplicantRequestBodySchema,
  ApplicantResponseBodySchema,
  ApplicantQueryParamsSchema,
  ApplicantSubmissionRequestBodySchema,
};
