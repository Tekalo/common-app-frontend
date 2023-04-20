import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { IFaqItem, NextPageWithLayout } from '@/lib/types';
import Faq from '@/modules/components/faq/Faq';
import { EditSVG } from '@/modules/constants/svgs';
import Link from 'next/link';

enum OrgSize {
  BELOW_TWENTY = '<20',
  FIFTY = '20-50',
  ONE_HUNDRED = '51-100',
  TWO_HUNDRED = '101-200',
  FIVE_HUNDRED = '201-500',
  ABOVE_FIVE_HUNDRED = '500+',
}

enum OrgType {
  C3 = '501c(3)',
  OTHER = 'other',
}

enum EmploymentType {
  FULL = 'Full-time',
  VOLUNTEER = 'volunteer',
  CONTRACTOR = 'contractor',
  CONSULTANT = 'consultant',
  ADVISOR = 'advisor',
  INTERNSHIP = 'internship',
  OTHER = 'other',
}

enum YearsOfExperience {
  TWO = '0-2',
  FOUR = '2-4',
  EIGHT = '4-8',
  TWELVE = '8-12',
  FIFTEEN = '12-15',
  MAX = '15+',
}

enum Skills {
  REACT = 'react',
  JAVASCRIPT = 'javascript',
  PYTHON = 'python',
  JAVA = 'java',
  SQL = 'sql',
  PRIVACY = 'privacy',
  SECURITY = 'security',
  DEVOPS = 'devops',
  FIGMA = 'figma',
  SKETCH = 'sketch',
  PROTOTYPING = 'prototyping',
  USER_RESEARCH = 'user research',
  PROD_DEV = 'product development',
  PROD_MAN = 'project management',
}

enum VisaSponsorship {
  YES = 'yes',
  NO = 'no',
  SOMETIMES = 'SOMETIMES',
}

// TODO: Check naming
interface IOpportunity {
  organization: IOrganization;
  contact: IContact;
  submissions: ISubmission[];
}

interface IContact {
  name: string;
  email: string;
  phone: string;
}

interface ISubmission {
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

interface IOrganization {
  name: string;
  type: OrgType;
  size: OrgSize;
  impactAreas: string;
  eoe: boolean;
}

const OrganizationReview: NextPageWithLayout = () => {
  const labels = {
    organization: {
      name: 'Organization name',
      type: 'Organization type',
      size: 'Organization size',
      impactAreas: 'Impact areas',
    },
    contact: {
      name: 'Contact name',
      phone: 'Contact name',
      email: 'Contact name',
    },
    submission: {
      employmentType: 'Type of opportunity',
      roleType: 'Type of role',
      positionTitle: 'Position title',
      jdUrl: 'Link to job description',
      salaryRange: 'Salary range',
      desiredStartDate: 'Desired start date',
      desiredYoe: 'Desired years of experience',
      desiredSkills: 'Desired skills for the role',
      desiredOtherSkills: 'Other desired skills',
      similarStaffed: 'Are there other employees on staff with similar roles?',
    },
  };

  // TODO: Tmp data, remove it when we hook this up
  const opportunity: IOpportunity = {
    organization: {
      name: 'ABCD',
      type: OrgType.C3,
      size: OrgSize.TWO_HUNDRED,
      impactAreas: 'Health, Tech policy',
      eoe: true,
    },
    contact: {
      name: 'Jane Brown',
      phone: '+1 (123) 234-4567',
      email: 'example@email.com',
    },
    submissions: [
      {
        employmentType: EmploymentType.FULL,
        roleType: 'Software engineer',
        positionTitle: 'Senior software engineer',
        jdUrl: 'www.jobpost.com/123',
        salaryRange: '90k-120k',
        desiredStartDate: new Date('09/09/2023'),
        desiredYoe: YearsOfExperience.EIGHT,
        desiredSkills: [Skills.DEVOPS, Skills.JAVASCRIPT],
        desiredOtherSkills: 'N/A',
        similarStaffed: true,
        desiredImpactExp: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet est placerat in egestas erat imperdiet sed. Amet massa vitae tortor condimentum. In massa tempor nec feugiat nisl pretium fusce id velit. Purus faucibus ornare suspendisse sed nisi lacus sed viverra. Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Quam id leo in vitae turpis massa sed elementum tempus.`,
        pitchEssay: `Over 10 years strong and fueled by 80 smart, passionate employees. ABCD is full of opportunities to grow. We are a nationally recognized, award-winning leader for a reason. The beating heart of our company is a wide range of employees from a diverse set of backgrounds-tech people, numbers people, even people people-working together to make communities better. If you are ready to join a thriving, mission-driven company where you can create your own opportunities and make a positive difference-it's time to make a healthy career move to ABCD.`,
        visaSponsorship: VisaSponsorship.YES,
        fullyRemote: false,
        location: 'New York, New York',
        paid: true,
        source: 'Source',
      },
    ],
  };

  const mapArrayToList = (arr?: string[]): string => {
    return arr ? arr.join(', ') : '';
  };

  const mapBoolToString = (bool: boolean): string => {
    return bool ? 'Yes' : 'No';
  };

  const mapDateToString = (date?: Date): string => {
    const formatNumber = (num: number): string => {
      return num.toString().padStart(2, '0');
    };

    return date
      ? `${formatNumber(date.getMonth() + 1)}/${formatNumber(
          date.getDate()
        )}/${date.getFullYear()}`
      : '';
  };

  const renderRow = (label: string, value: string) => (
    <div className="flex gap-x-1">
      <span className="text-component-large">{label}:</span>
      <span className="">{value}</span>
    </div>
  );

  const renderOrganization = () => (
    <div className="space-y-2">
      {renderRow(labels.organization.name, opportunity.organization.name)}
      {renderRow(labels.organization.type, opportunity.organization.type)}
      {renderRow(labels.organization.size, opportunity.organization.size)}
      {renderRow(
        labels.organization.impactAreas,
        opportunity.organization.impactAreas
      )}
    </div>
  );

  const renderContact = () => (
    <div className="space-y-2">
      {renderRow(labels.contact.name, opportunity.contact.name)}
      {renderRow(labels.contact.phone, opportunity.contact.phone)}
      {renderRow(labels.contact.email, opportunity.contact.email)}
    </div>
  );

  const renderRole = (role: ISubmission) => (
    <div className="space-y-4">
      <div className="space-y-2">
        {renderRow(labels.submission.employmentType, role.employmentType)}
        {renderRow(labels.submission.roleType, role.roleType)}
        {renderRow(labels.submission.positionTitle, role.positionTitle)}
        {renderRow(labels.submission.jdUrl, role.jdUrl)}
        {renderRow(labels.submission.salaryRange, role.salaryRange)}
      </div>
      <div className="space-y-2">
        {renderRow(
          labels.submission.desiredStartDate,
          mapDateToString(role.desiredStartDate)
        )}
        {renderRow(labels.submission.desiredYoe, role.desiredYoe)}
        {renderRow(
          labels.submission.desiredSkills,
          mapArrayToList(role.desiredSkills)
        )}
        {renderRow(labels.submission.employmentType, role.desiredOtherSkills)}
        {renderRow(
          labels.submission.employmentType,
          mapBoolToString(role.similarStaffed)
        )}
      </div>
    </div>
  );

  const role = opportunity.submissions[0];
  const roles: IFaqItem[] = [
    {
      questionText: role.positionTitle,
      answerText: '',
      extras: renderRole(role),
    },
  ];

  return (
    <div className="w-full">
      <div className="border-b border-gray-3 pb-8">
        <div className="mb-6">
          <div className="mb-12 font-display text-h3-desktop text-black-text">
            Review your intake form
          </div>
          <div className="mb-6 font-display text-h4-desktop">
            Contact and organization
          </div>
          <div className="space-y-4">
            {renderOrganization()}
            {renderContact()}
          </div>
        </div>
        <div className="text-component-small text-blue-1">
          <Link
            className="flex items-baseline gap-x-1"
            href="/sign-up/organizations"
          >
            {'Edit contact and organization '}
            {EditSVG}
          </Link>
        </div>
      </div>
      <Faq faqItems={roles} />
    </div>
  );
};

export default OrganizationReview;

OrganizationReview.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
