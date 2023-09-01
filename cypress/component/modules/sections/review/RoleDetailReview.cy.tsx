import RoleDetailReview, {
  IRoleDetailReview,
} from '@/modules/sections/sign-up/forms/organizations/reviewForm/sections/RoleDetailReview';

Cypress.Commands.add('mountRoleDetailReview', (props: IRoleDetailReview) => {
  return cy.mount(
    <RoleDetailReview
      orgRoles={props.orgRoles}
      handleGoToRole={props.handleGoToRole}
      handleDeleteRole={props.handleDeleteRole}
    />
  );
});

describe('Organization <RoleDetailReview />', () => {
  const voidFn = () => void {};

  describe('initial render', () => {
    let props: IRoleDetailReview;

    beforeEach(() => {
      props = {
        orgRoles: [
          {
            paid: true,
            roleType: 'data analyst',
            positionTitle: 'asdf',
            jdUrl: 'asdf',
            salaryRange: '111111',
            fullyRemote: false,
            visaSponsorship: 'yes',
            similarStaffed: false,
            desiredImpactExp: 'asdf',
            pitchEssay: 'asdf',
            desiredYoe: ['0-2'],
            source: '',
            employmentType: 'full-time employee',
            location: '',
          },
          {
            paid: false,
            roleType: 'data analyst',
            positionTitle: 'asdf',
            salaryRange: '',
            jdUrl: 'asdf',
            desiredHoursPerWeek: '1123',
            fullyRemote: true,
            visaSponsorship: 'yes',
            similarStaffed: false,
            desiredImpactExp: 'adsf',
            pitchEssay: 'asdf',
            desiredYoe: ['0-2', '3-5'],
            desiredSkills: ['javascript'],
            desiredOtherSkills: ['asdf'],
            desiredStartDate: '01/01/1992',
            desiredEndDate: '01/01/1992',
            source: '',
            employmentType: 'advisor - asdf',
            location: '',
          },
        ],
        handleGoToRole: voidFn,
        handleDeleteRole: voidFn,
      };
    });
  });
});
