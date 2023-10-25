import SkillPill, {
  ISkillPill,
} from '@/modules/components/input/skillsSelect/components/skillPill';

Cypress.Commands.add('mountSkillPill', (props: ISkillPill) => {
  cy.mount(<SkillPill value={props.value} removeValue={props.removeValue} />);
});

describe('SkillPill', () => {
  const mockValue = 'MockValue';
  let mockPillProps: ISkillPill;

  beforeEach(() => {
    mockPillProps = {
      value: mockValue,
      removeValue: cy.stub().as('removeValue'),
    };
  });

  it('should render', () => {
    cy.mountSkillPill(mockPillProps);

    cy.get('div[data-name=value]').should('have.text', mockValue);
    cy.get('div[data-name=close]').should('be.visible');
  });

  it('should call removeValue', () => {
    cy.mountSkillPill(mockPillProps);

    cy.get('div[data-name=close]').click();

    cy.wrap(mockPillProps.removeValue).should('have.been.calledOnce');
  });
});
