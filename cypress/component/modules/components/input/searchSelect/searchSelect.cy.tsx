import { mockSkills, mockSkillsResponse } from '@/cypress/fixtures/mocks';
import { skillsEndpoint } from '@/lib/helpers/api/endpoints';
import SkillsSearchProvider, {
  ISkill,
} from '@/lib/providers/skillsSearchProvider';
import SearchSelect, {
  ISearchSelect,
} from '@/modules/components/input/searchSelect/searchSelect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

Cypress.Commands.add('mountSkillsSelect', (props: ISearchSelect) => {
  cy.mount(
    <QueryClientProvider client={new QueryClient()}>
      <SkillsSearchProvider>
        <SearchSelect
          hasErrors={props.hasErrors}
          name={props.name}
          label={props.label}
          placeholder={props.placeholder}
          setValue={props.setValue}
          value={props.value}
        />
      </SkillsSearchProvider>
    </QueryClientProvider>
  );
});

describe('SkillsSelect', () => {
  const mockLabel = 'Skills select label';
  const mockName = 'skills-select';
  const mockPlaceholder = 'Skills Select';
  const minInputSize = '9px';

  // CSS color values
  const bgLightBlue = 'rgb(243, 249, 255)';
  const textBlackText = 'rgb(39, 41, 41)';

  let allSkills: ISkill[];
  let skillsSelectProps: ISearchSelect;
  let value: string[];

  beforeEach(() => {
    allSkills = [...mockSkills];
    value = [];

    skillsSelectProps = {
      hasErrors: false,
      name: mockName,
      label: mockLabel,
      placeholder: mockPlaceholder,
      setValue: cy.stub().as('setValue'),
      value,
    };

    cy.intercept(
      {
        method: 'GET',
        url: skillsEndpoint,
      },
      cy.stub().callsFake((req) => {
        req.reply(mockSkillsResponse);
      })
    ).as('getSkills');
  });

  it('should render', () => {
    cy.mountSkillsSelect(skillsSelectProps);

    cy.get('label[data-name=label]')
      .should('be.visible')
      .should('have.text', mockLabel)
      .should('have.css', 'color', textBlackText);

    cy.get('div[data-name=search-select-search-icon]').should('be.visible');

    cy.get('#skills-select-input').should(
      'have.attr',
      'placeholder',
      mockPlaceholder
    );
  });

  it('should display results', () => {
    cy.mountSkillsSelect(skillsSelectProps);

    cy.get('#skills-select-input').fastType('a');

    cy.get('ul[data-name=skills-select-options]')
      .should('be.visible')
      .children()
      .should('have.length', 5);

    cy.get('div[data-name="searchbox-option-Javascript"]').should(
      'have.css',
      'background-color',
      bgLightBlue
    );

    cy.get('div[data-name=search-option-name]').should(
      'have.css',
      'color',
      textBlackText
    );
  });

  it('should add a selected skill', () => {
    cy.mountSkillsSelect(skillsSelectProps);

    cy.get('#skills-select-input').fastType('a');

    cy.get(
      'div[data-name="searchbox-option-Agile software development"]'
    ).fastClick();

    cy.get('#skills-select-input').should('have.focus');
    cy.get('@setValue').should('have.been.calledOnceWithExactly', [
      'Agile software development',
    ]);
  });

  it('should remove an already-added skill by click', () => {
    skillsSelectProps.value = allSkills.slice(0, 3).map((s) => s.canonical);

    cy.mountSkillsSelect(skillsSelectProps);

    cy.get('div[data-name="search-selection-pill-Cryptography"]').fastClick();

    cy.get('#skills-select-input').should('have.focus');
    cy.get('@setValue').should('have.been.calledOnceWithExactly', [
      'Agile software development',
      'C#',
    ]);
  });

  it('should remove an already-added skill by backspace', () => {
    skillsSelectProps.value = allSkills.slice(0, 3).map((s) => s.canonical);

    cy.mountSkillsSelect(skillsSelectProps);

    cy.get('#skills-select-input').type('{backspace}');

    cy.get('#skills-select-input').should('have.focus');
    cy.get('@setValue').should('have.been.calledOnceWithExactly', [
      'Agile software development',
      'C#',
    ]);
  });

  it('should not allow the user to type if 8 skills are already selected', () => {
    skillsSelectProps.value = allSkills.slice(0, 8).map((s) => s.canonical);

    cy.mountSkillsSelect(skillsSelectProps);

    cy.get('#skills-select-input').fastType('a');

    cy.get('#skills-select-input')
      .should('have.focus')
      .should('have.value', '');
    cy.get(
      'div[data-name="searchbox-option-You can select up to 8 skills"]'
    ).should('be.visible');
  });

  it('should resize the input after user types', () => {
    const mockNewSkill = 'here is a skill name';

    skillsSelectProps.value = allSkills.slice(0, 4).map((s) => s.canonical);

    cy.mountSkillsSelect(skillsSelectProps);

    cy.get('#skills-select-input').type(`${mockNewSkill}{backspace}e`);

    cy.get('#skills-select-input')
      .should('have.focus')
      .should('have.value', mockNewSkill)
      .should('have.css', 'width', '189px');
  });

  it('should resize the input after typing enter', () => {
    const mockNewSkill = 'here is a skill name';

    skillsSelectProps.value = allSkills.slice(0, 4).map((s) => s.canonical);

    cy.mountSkillsSelect(skillsSelectProps);

    cy.get('#skills-select-input')
      .fastType(mockNewSkill)
      .type('{end}')
      .trigger('keydown', { key: 'Enter' })
      .trigger('keyup', {
        key: 'Enter',
      });

    cy.get('#skills-select-input')
      .should('have.focus')
      .should('have.value', '')
      .should('have.css', 'width', minInputSize);

    cy.get('@setValue').should('have.been.calledOnce');
  });

  it('should resize the input after typing escape', () => {
    const mockNewSkill = 'here is a skill name';

    skillsSelectProps.value = skillsSelectProps.value = allSkills
      .slice(0, 4)
      .map((s) => s.canonical);

    cy.mountSkillsSelect(skillsSelectProps);

    cy.get('#skills-select-input')
      .fastType(mockNewSkill)
      .trigger('keydown', { key: 'Escape' })
      .trigger('keyup', {
        key: 'Escape',
      });

    cy.get('#skills-select-input')
      .should('have.focus')
      .should('have.value', '')
      .should('have.css', 'width', minInputSize);

    cy.get('@setValue').should('not.have.been.called');
  });
});
