import RoleDetailReview, {
  IRoleDetailReview,
} from '@/modules/sections/sign-up/forms/organizations/reviewForm/sections/RoleDetailReview';

Cypress.Commands.add('mountRoleDetailReview', (props: IRoleDetailReview) => {
  cy.mount(<RoleDetailReview {...props} />);
});

describe('Organization <RoleDetailReview />', () => {
  const voidFn = () => void {};

  describe('initial render of a paid position', () => {
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
            desiredSkills: [],
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

    it('renders paid fields for only the first role', () => {
      cy.mountRoleDetailReview(props);

      // Fields
      cy.get('[id="0_employmentType"]').should('contain', 'Full-time employee');
      cy.get('[id="0_roleType"]').should('contain', 'Data analyst');
      cy.get('[id="0_paid"]').should('contain', 'Paid');
      cy.get('[id="0_positionTitle"]').should('contain', 'Asdf');
      cy.get('[id="0_jdUrl"]').should('contain', 'asdf');
      cy.get('[id="0_salaryRange"]').should('contain', '111111');

      cy.get('[id="1_roleType"]').should('not.exist');
      cy.get('[id="1_paid"]').should('not.exist');
      cy.get('[id="1_positionTitle"]').should('not.exist');
      cy.get('[id="1_jdUrl"]').should('not.exist');
      cy.get('[id="1_salaryRange"]').should('not.exist');
    });
  });

  describe('rendering an unpaid position', () => {
    let props: IRoleDetailReview;

    beforeEach(() => {
      props = {
        orgRoles: [
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

    it('renders unpaid fields only', () => {
      cy.mountRoleDetailReview(props);

      // Fields
      cy.get('[id="0_employmentType"]').should('contain', 'Advisor - asdf');
      cy.get('[id="0_roleType"]').should('contain', 'Data analyst');
      cy.get('[id="0_paid"]').should('contain', 'Unpaid');
      cy.get('[id="0_positionTitle"]').should('contain', 'Asdf');
      cy.get('[id="0_jdUrl"]').should('contain', 'asdf');
      cy.get('[id="0_salaryRange"]').should('not.exist');
    });
  });
});
