import Faq from '@/components/faq/Faq';
import { EditSVG } from '@/constants/svgs';
import {
  EmploymentType,
  OrgSize,
  OrgType,
  Skills,
  VisaSponsorship,
  YearsOfExperience,
} from '@/lib/enums';
import { validations } from '@/lib/schemas';
import {
  IFaqItem,
  IOpportunity,
  ISubmission,
  NextPageWithLayout,
} from '@/lib/types';
import { Field } from 'houseform';
import Link from 'next/link';
import { useState } from 'react';

// TODO: Add privacy modal once PR is merged

const OrganizationReview: NextPageWithLayout = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

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
      desiredImpactExp:
        "Desired impact-related experience or passion that you're looking for in a candidate",
      pitchEssay: 'How would you describe the role in a few sentences?',
    },
  };

  type NewType = IOpportunity;

  // TODO: Tmp data, remove it when we hook this up
  const opportunity: NewType = {
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

  const renderRow = (label: string, value: string, col?: boolean) => (
    <div className={`flex gap-x-1 ${col ? 'flex-col' : 'flex-row'}`}>
      <span className={`text-component-large ${col ? 'mb-2' : ''}`}>
        {label}:
      </span>
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

  const renderRole = (role: ISubmission, index: number) => (
    <div>
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
          {renderRow(
            labels.submission.desiredOtherSkills,
            role.desiredOtherSkills
          )}
          {renderRow(
            labels.submission.similarStaffed,
            mapBoolToString(role.similarStaffed)
          )}
        </div>
        <div className="space-y-4">
          {renderRow(
            labels.submission.desiredImpactExp,
            role.desiredImpactExp,
            true
          )}
          {renderRow(labels.submission.pitchEssay, role.pitchEssay, true)}
        </div>
      </div>
      <div className="mt-6 text-component-small text-blue-1">
        <Link
          className="flex items-baseline gap-x-1"
          // TODO
          href="/sign-up/organizations"
        >
          {`Edit Role ${index}`}
          {EditSVG}
        </Link>
      </div>
    </div>
  );

  const roles: IFaqItem[] = opportunity.submissions.map((role, i) => {
    const roleNum = i + 1;

    return {
      questionText: `Role ${roleNum}`,
      answerText: '',
      extras: renderRole(role, roleNum),
    };
  });

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
      <div className="mb-16">
        <Faq faqItems={roles} />
      </div>
      <div className="">
        <Field<boolean>
          name="acceptedPrivacy"
          initialValue={false}
          onSubmitValidate={validations.privacyPolicy}
          onChangeValidate={validations.privacyPolicy}
        >
          {({ value, setValue, errors }) => {
            return (
              <div className="mt-8 space-y-2 text-left">
                <fieldset className="space-y-3">
                  <div className="flex space-x-2 align-middle">
                    <input
                      className="form-checkbox h-4 w-4 appearance-none align-middle checked:bg-blue-1 
                             checked:hover:bg-blue-2 checked:hover:ring-blue-2 focus:ring-1 focus:ring-blue-2 checked:focus:bg-blue-2 checked:focus:ring-blue-2"
                      type="checkbox"
                      id="active"
                      name="input-acceptedPrivacy"
                      checked={value}
                      onChange={(e) => setValue(e.target.checked)}
                    />
                    <label
                      htmlFor="input-acceptedPrivacy"
                      className="align-middle text-component-small text-black-text"
                    >
                      I confirm that I have reviewed the{' '}
                      <span
                        className="text-blue-1 underline underline-offset-4"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPrivacyModal(true);
                        }}
                      >
                        Privacy info
                      </span>
                    </label>
                  </div>
                </fieldset>
                {/* {printErrorMessages(isSubmitted, errors)} */}
              </div>
            );
          }}
        </Field>
      </div>
    </div>
  );
};

export default OrganizationReview;
