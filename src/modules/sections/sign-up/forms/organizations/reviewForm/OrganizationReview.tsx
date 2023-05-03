import { NextPageWithLayout } from '@/lib/types';

// TODO: Add privacy modal once PR is merged

const OrganizationReview: NextPageWithLayout = () => {
  return <div>Pending</div>;
  // const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // const labels = {
  //   organization: {
  //     name: 'Organization name',
  //     type: 'Organization type',
  //     size: 'Organization size',
  //     impactAreas: 'Impact areas',
  //   },
  //   contact: {
  //     name: 'Contact name',
  //     phone: 'Contact name',
  //     email: 'Contact name',
  //   },
  //   submission: {
  //     employmentType: 'Type of opportunity',
  //     roleType: 'Type of role',
  //     positionTitle: 'Position title',
  //     jdUrl: 'Link to job description',
  //     salaryRange: 'Salary range',
  //     desiredStartDate: 'Desired start date',
  //     desiredYoe: 'Desired years of experience',
  //     desiredSkills: 'Desired skills for the role',
  //     desiredOtherSkills: 'Other desired skills',
  //     similarStaffed: 'Are there other employees on staff with similar roles?',
  //     desiredImpactExp:
  //       "Desired impact-related experience or passion that you're looking for in a candidate",
  //     pitchEssay: 'How would you describe the role in a few sentences?',
  //   },
  // };

  // // TODO: Tmp data, remove it when we hook this up
  // const opportunity: NewOrgOppFieldsType = {
  //   organization: {
  //     name: 'ABCD',
  //     type: '501c(3)',
  //     size: '101-200',
  //     impactAreas: ['climate change'],
  //     eoe: true,
  //   },
  //   contact: {
  //     name: 'Jane Brown',
  //     phone: '+1 (123) 234-4567',
  //     email: 'example@email.com',
  //   },
  //   submissions: [
  //     {
  //       employmentType: EmploymentType.Enum['full-time employee'],
  //       roleType: 'software engineer',
  //       positionTitle: 'Senior software engineer',
  //       jdUrl: 'www.jobpost.com/123',
  //       salaryRange: '90k-120k',
  //       desiredStartDate: new Date('09/09/2023'),
  //       desiredYoe: [YOE_RANGE.Enum['0-2']],
  //       desiredSkills: [Skills.Enum.devops],
  //       desiredOtherSkills: 'N/A',
  //       similarStaffed: true,
  //       desiredImpactExp: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet est placerat in egestas erat imperdiet sed. Amet massa vitae tortor condimentum. In massa tempor nec feugiat nisl pretium fusce id velit. Purus faucibus ornare suspendisse sed nisi lacus sed viverra. Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Quam id leo in vitae turpis massa sed elementum tempus.`,
  //       pitchEssay: `Over 10 years strong and fueled by 80 smart, passionate employees. ABCD is full of opportunities to grow. We are a nationally recognized, award-winning leader for a reason. The beating heart of our company is a wide range of employees from a diverse set of backgrounds-tech people, numbers people, even people people-working together to make communities better. If you are ready to join a thriving, mission-driven company where you can create your own opportunities and make a positive difference-it's time to make a healthy career move to ABCD.`,
  //       visaSponsorship: VisaSponsorship.Enum.yes,
  //       fullyRemote: false,
  //       location: 'New York, New York',
  //       paid: true,
  //       source: 'Source',
  //     },
  //     {
  //       employmentType: EmploymentType.Enum['full-time employee'],
  //       roleType: 'software engineer',
  //       positionTitle: 'Senior software engineer',
  //       jdUrl: 'www.jobpost.com/123',
  //       salaryRange: '90k-120k',
  //       desiredStartDate: new Date('09/09/2023'),
  //       desiredYoe: [YOE_RANGE.Enum['0-2']],
  //       desiredSkills: [Skills.Enum.react],
  //       desiredOtherSkills: 'N/A',
  //       similarStaffed: true,
  //       desiredImpactExp: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet est placerat in egestas erat imperdiet sed. Amet massa vitae tortor condimentum. In massa tempor nec feugiat nisl pretium fusce id velit. Purus faucibus ornare suspendisse sed nisi lacus sed viverra. Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Quam id leo in vitae turpis massa sed elementum tempus.`,
  //       pitchEssay: `Over 10 years strong and fueled by 80 smart, passionate employees. ABCD is full of opportunities to grow. We are a nationally recognized, award-winning leader for a reason. The beating heart of our company is a wide range of employees from a diverse set of backgrounds-tech people, numbers people, even people people-working together to make communities better. If you are ready to join a thriving, mission-driven company where you can create your own opportunities and make a positive difference-it's time to make a healthy career move to ABCD.`,
  //       visaSponsorship: VisaSponsorship.Enum.yes,
  //       fullyRemote: false,
  //       location: 'New York, New York',
  //       paid: true,
  //       source: 'Source',
  //     },
  //   ],
  // };

  // const renderRow = (label: string, value: string, col?: boolean) => {
  //   const flex = col ? 'lg:flex-col' : 'lg:flex-row';

  //   return (
  //     <div className={`flex flex-col gap-x-1 gap-y-3 ${flex}`}>
  //       <span
  //         className={`flex-initial text-component-large ${col ? 'mb-2' : ''}`}
  //       >
  //         {label}:
  //       </span>
  //       <span className="flex-1">{value}</span>
  //     </div>
  //   );
  // };

  // const renderOrganization = () => (
  //   <div className="space-y-2">
  //     {renderRow(labels.organization.name, opportunity.organization.name)}
  //     {renderRow(labels.organization.type, opportunity.organization.type)}
  //     {renderRow(labels.organization.size, opportunity.organization.size)}
  //     {renderRow(
  //       labels.organization.impactAreas,
  //       opportunity.organization.impactAreas[0]
  //     )}
  //   </div>
  // );

  // const renderContact = () => (
  //   <div className="space-y-2">
  //     {renderRow(labels.contact.name, opportunity.contact.name)}
  //     {renderRow(labels.contact.phone, opportunity.contact.phone || '')}
  //     {renderRow(labels.contact.email, opportunity.contact.email)}
  //   </div>
  // );

  // const renderRole = (role: NewRoleType, index: number) => (
  //   <div>
  //     <div className="space-y-4">
  //       <div className="space-y-2">
  //         {renderRow(labels.submission.employmentType, role.employmentType)}
  //         {renderRow(labels.submission.roleType, role.roleType)}
  //         {renderRow(labels.submission.positionTitle, role.positionTitle)}
  //         {renderRow(labels.submission.jdUrl, role.jdUrl || '')}
  //         {renderRow(labels.submission.salaryRange, role.salaryRange)}
  //       </div>
  //       <div className="space-y-2">
  //         {renderRow(
  //           labels.submission.desiredStartDate,
  //           mapDateToString(role.desiredStartDate || new Date())
  //         )}
  //         {renderRow(labels.submission.desiredYoe, role.desiredYoe[0])}
  //         {renderRow(
  //           labels.submission.desiredSkills,
  //           mapArrayToList(role.desiredSkills)
  //         )}
  //         {renderRow(
  //           labels.submission.desiredOtherSkills,
  //           role.desiredOtherSkills
  //         )}
  //         {renderRow(
  //           labels.submission.similarStaffed,
  //           mapBoolToYesNo(role.similarStaffed)
  //         )}
  //       </div>
  //       <div className="space-y-4">
  //         {renderRow(
  //           labels.submission.desiredImpactExp,
  //           role.desiredImpactExp || '',
  //           true
  //         )}
  //         {renderRow(labels.submission.pitchEssay, role.pitchEssay, true)}
  //       </div>
  //     </div>
  //     <div className="mt-6 text-component-small text-blue-1">
  //       <Link
  //         className="flex items-baseline gap-x-1"
  //         // TODO: Link?
  //         href="/sign-up/organizations"
  //       >
  //         {`Edit Role ${index}`}
  //         {EditSVG}
  //       </Link>
  //     </div>
  //   </div>
  // );

  // const roles: IFaqItem[] = opportunity.submissions.map((role, i) => {
  //   const roleNum = i + 1;

  //   return {
  //     questionText: `Role ${roleNum}`,
  //     answerText: '',
  //     extras: renderRole(role, roleNum),
  //   };
  // });

  // return (
  //   <div className="m-auto w-full max-w-content-area px-6 pb-28 pt-10 lg:px-0 lg:pb-16 lg:pt-20">
  //     <div className="border-b border-gray-3 pb-8">
  //       <div className="mb-6">
  //         <div className="mb-8 text-center font-display text-h3-mobile text-black-text lg:mb-12 lg:text-h3-desktop">
  //           Review your intake form
  //         </div>
  //         <div className="mb-4 font-display text-h4-mobile lg:mb-6 lg:text-h4-desktop">
  //           Contact and organization
  //         </div>
  //         <div className="space-y-4">
  //           {renderOrganization()}
  //           {renderContact()}
  //         </div>
  //       </div>
  //       <div className="text-component-small text-blue-1">
  //         <Link
  //           className="flex items-baseline gap-x-1"
  //           // TODO: Link?
  //           href="/sign-up/organizations"
  //         >
  //           {'Edit contact and organization '}
  //           {EditSVG}
  //         </Link>
  //       </div>
  //     </div>
  //     <div className="mb-6 lg:mb-16">
  //       <Faq faqItems={roles} />
  //     </div>
  //     <div className="">
  //       <Form onSubmit={(values) => null}>
  //         {({ isValid, isSubmitted, submit }) => (
  //           <form
  //             onSubmit={(e) => {
  //               e.preventDefault();
  //             }}
  //             className="space-y-8"
  //           >
  //             {/* TODO Privacy Info */}
  //             <BooleanField
  //               fieldName="acceptedPrivacy"
  //               label={PRIVACY_DISCLAIMER(setShowPrivacyModal)}
  //               isSubmitted={isSubmitted}
  //               initialValue={false}
  //               validator={PrivacyPolicy}
  //             />
  //             {/* Form Cotnrol Button*/}
  //             <Button
  //               className="mt-10 w-full flex-none md:w-auto md:px-36 lg:mt-14"
  //               label="Sign up"
  //               type="submit"
  //               disabled={isSubmitted && !isValid}
  //               onClick={() => submit()}
  //             />
  //           </form>
  //         )}
  //       </Form>
  //       <TableModal
  //         headerText={PRIVACY_MODAL_HEADER_TEXT}
  //         bodyText={PRIVACY_MODAL_BODY_TEXT}
  //         extras={PRIVACY_MODAL_EXTRAS}
  //         isOpen={showPrivacyModal}
  //         closeModal={() => {
  //           setShowPrivacyModal(false);
  //         }}
  //       />
  //     </div>
  //   </div>
  // );
};

export default OrganizationReview;
