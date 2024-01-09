import SkillboxOption, {
  ISearchboxOption,
} from '@/modules/components/input/searchSelect/components/searchboxOption';

Cypress.Commands.add('mountSearchboxOption', (props: ISearchboxOption) => {
  cy.mount(
    <SkillboxOption
      active={props.active}
      disabled={props.disabled}
      optionName={props.optionName}
    />
  );
});

describe('SearchboxOption', () => {
  const mockSkillName = 'Mock Skill Name';
  let active: boolean;
  let disabled: boolean;
  let skillboxOptionProps: ISearchboxOption;

  beforeEach(() => {
    active = false;
    disabled = false;

    skillboxOptionProps = {
      active,
      disabled,
      optionName: mockSkillName,
    };
  });

  it('should render', () => {
    cy.mountSearchboxOption(skillboxOptionProps);

    cy.get(`div[data-name="searchbox-option-${mockSkillName}"]`).should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );

    cy.get('div[data-name=search-option-name]')
      .should('be.visible')
      .should('have.css', 'color', 'rgb(39, 41, 41)');

    cy.get('div[data-name="search-option-add-Mock Skill Name"').should(
      'be.visible'
    );
  });

  it('should render - active', () => {
    skillboxOptionProps.active = true;

    cy.mountSearchboxOption(skillboxOptionProps);

    cy.get(`div[data-name="searchbox-option-${mockSkillName}"]`).should(
      'have.css',
      'background-color',
      'rgb(243, 249, 255)'
    );

    cy.get('div[data-name=search-option-name]')
      .should('be.visible')
      .should('have.css', 'color', 'rgb(39, 41, 41)');

    cy.get('div[data-name="search-option-add-Mock Skill Name"').should(
      'be.visible'
    );
  });

  it('should render - disabled', () => {
    skillboxOptionProps.disabled = true;

    cy.mountSearchboxOption(skillboxOptionProps);

    cy.get(`div[data-name="searchbox-option-${mockSkillName}"]`).should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );

    cy.get('div[data-name=search-option-name]')
      .should('be.visible')
      .should('have.css', 'color', 'rgb(159, 164, 174)');

    cy.get('div[data-name="search-option-add-Mock Skill Name"').should(
      'not.exist'
    );
  });
});
