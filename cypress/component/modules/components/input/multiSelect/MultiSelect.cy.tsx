import { CauseOptions } from '@/lib/constants/selects';
import MultiSelect, {
  IMultiSelect,
} from '@/modules/components/input/multiSelect/MultiSelect';
import { SinonStub } from 'cypress/types/sinon';

Cypress.Commands.add('mountMultiSelect', (props: IMultiSelect) => {
  cy.mount(
    <MultiSelect
      errors={props.errors}
      name={props.name}
      value={props.value}
      label={props.label}
      placeholder={props.placeholder}
      selectionLabelSingle={props.selectionLabelSingle}
      selectionLabelMulti={props.selectionLabelMulti}
      labelStyles={props.labelStyles}
      buttonStyles={props.buttonStyles}
      optionStyles={props.optionStyles}
      limit={props.limit}
      listOptions={props.listOptions}
      setValue={props.setValue}
      disabled={props.disabled}
    />
  );
});

describe('<MultiSelect />', () => {
  let props: IMultiSelect;
  let value: string[];
  let setValueSpy: SinonStub;

  beforeEach(() => {
    value = [];
    setValueSpy = cy.stub().as('setValue');

    props = {
      errors: [],
      name: 'testMultiSelect',
      value,
      label: 'Test Multi Select',
      placeholder: 'Test Placeholder',
      selectionLabelSingle: 'selection made',
      selectionLabelMulti: 'selections made',
      labelStyles: '',
      buttonStyles: '',
      optionStyles: '',
      limit: 5,
      listOptions: CauseOptions,
      setValue: setValueSpy,
      disabled: false,
    };
  });

  it('should render', () => {
    cy.mountMultiSelect(props);

    cy.get('[data-name=label]').should('contain.text', props.label);
    cy.get('[data-name=placeholder]').should('contain.text', props.placeholder);
  });

  it('should have the correct options', () => {
    cy.mountMultiSelect(props);

    cy.get('[data-name=button]').click();

    cy.get(`[data-name=list-options]`).should('be.visible');

    props.listOptions.forEach((op) => {
      const option = cy.get(`li[data-name="${props.name}-${op.value}"]`);
      option.should('be.visible');
      option.should('have.text', op.displayText);
    });
  });

  it('should select and unselect options', () => {
    cy.mountMultiSelect(props);

    cy.get('[data-name=button]').click();

    const firstInput = cy.get('[data-name=list-options] li input').eq(0);
    const secondInput = cy.get('[data-name=list-options] li input').eq(1);

    firstInput.click();
    secondInput.click();
    firstInput.click();

    cy.then(() => {
      expect(setValueSpy).to.have.callCount(3);

      assert(
        setValueSpy.getCall(0).calledWithExactly([props.listOptions[0].value])
      );

      assert(
        setValueSpy.getCall(1).calledWithExactly([props.listOptions[1].value])
      );

      assert(
        setValueSpy.getCall(2).calledWithExactly([props.listOptions[0].value])
      );
    });
  });

  it('should stop at the limit (5)', () => {
    props.value = [
      props.listOptions[0].value,
      props.listOptions[1].value,
      props.listOptions[2].value,
      props.listOptions[3].value,
      props.listOptions[4].value,
    ];

    cy.mountMultiSelect(props);

    cy.get('[data-name=button]').click();

    cy.get('[data-name=list-options] li input').eq(0).should('not.be.disabled');
    cy.get('[data-name=list-options] li input').eq(1).should('not.be.disabled');
    cy.get('[data-name=list-options] li input').eq(2).should('not.be.disabled');
    cy.get('[data-name=list-options] li input').eq(3).should('not.be.disabled');
    cy.get('[data-name=list-options] li input').eq(4).should('not.be.disabled');
    cy.get('[data-name=list-options] li input').eq(5).should('be.disabled');
  });
});
