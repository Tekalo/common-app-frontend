import SkillboxOption, {
  ISkillboxOption,
} from '@/modules/components/input/skillsSelect/components/skillboxOption';

Cypress.Commands.add('mountSkillboxOption', (props: ISkillboxOption) => {
  cy.mount(
    <SkillboxOption
      active={props.active}
      disabled={props.disabled}
      skillName={props.skillName}
    />
  );
});

describe('SkillboxOption', () => {
  const mockSkillName = 'Mock Skill Name';
  let active: boolean;
  let disabled: boolean;
  let skillboxOptionProps: ISkillboxOption;

  beforeEach(() => {
    active = false;
    disabled = false;

    skillboxOptionProps = {
      active,
      disabled,
      skillName: mockSkillName,
    };
  });

  it('should render', () => {
    cy.mountSkillboxOption(skillboxOptionProps);

    cy.get(`div[data-name="skillbox-option-${mockSkillName}"]`).should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );

    cy.get('div[data-name=skill-option-name]')
      .should('be.visible')
      .should('have.css', 'color', 'rgb(39, 41, 41)');

    cy.get('div[data-name="skill-option-add-Mock Skill Name"').should(
      'be.visible'
    );
  });

  it('should render - active', () => {
    skillboxOptionProps.active = true;

    cy.mountSkillboxOption(skillboxOptionProps);

    cy.get(`div[data-name="skillbox-option-${mockSkillName}"]`).should(
      'have.css',
      'background-color',
      'rgb(243, 249, 255)'
    );

    cy.get('div[data-name=skill-option-name]')
      .should('be.visible')
      .should('have.css', 'color', 'rgb(39, 41, 41)');

    cy.get('div[data-name="skill-option-add-Mock Skill Name"').should(
      'be.visible'
    );
  });

  it('should render - disabled', () => {
    skillboxOptionProps.disabled = true;

    cy.mountSkillboxOption(skillboxOptionProps);

    cy.get(`div[data-name="skillbox-option-${mockSkillName}"]`).should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );

    cy.get('div[data-name=skill-option-name]')
      .should('be.visible')
      .should('have.css', 'color', 'rgb(159, 164, 174)');

    cy.get('div[data-name="skill-option-add-Mock Skill Name"').should(
      'not.exist'
    );
  });
});
