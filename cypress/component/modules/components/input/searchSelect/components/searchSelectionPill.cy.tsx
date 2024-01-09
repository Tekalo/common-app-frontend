import SearchSelectionPill, {
  ISearchSelectionPill,
} from '@/modules/components/input/searchSelect/components/searchSelectionPill';

Cypress.Commands.add(
  'mountSearchSelectionPill',
  (props: ISearchSelectionPill) => {
    cy.mount(
      <SearchSelectionPill
        value={props.value}
        removeValue={props.removeValue}
      />
    );
  }
);

describe('SearchSelectionPill', () => {
  const mockValue = 'MockValue';
  let mockPillProps: ISearchSelectionPill;

  beforeEach(() => {
    mockPillProps = {
      value: mockValue,
      removeValue: cy.stub().as('removeValue'),
    };
  });

  it('should render', () => {
    cy.mountSearchSelectionPill(mockPillProps);

    cy.get('div[data-name=value]').should('have.text', mockValue);
    cy.get('div[data-name=close]').should('be.visible');
  });

  it('should call removeValue', () => {
    cy.mountSearchSelectionPill(mockPillProps);

    cy.get('div[data-name=close]').click();

    cy.get('@removeValue').should('have.been.calledOnce');
  });
});
