import { OptionalPhoneNumber } from '@/lib/enums';
import PhoneNumberField, {
  IPhoneNumberField,
} from '@/modules/sections/sign-up/fields/PhoneNumberField';
import '@/styles/phone-number-input.css';

Cypress.Commands.add('mountPhoneNumberField', (props: IPhoneNumberField) => {
  cy.mount(
    <PhoneNumberField
      fieldName={props.fieldName}
      initialValue={props.initialValue}
      isSubmitted={props.isSubmitted}
      label={props.label}
      disabled={props.disabled}
      placeholder={props.placeholder}
      tooltipText={props.tooltipText}
      validator={props.validator}
    />
  );
});

describe('<PhoneNumberField />', () => {
  let props: IPhoneNumberField;
  const fieldName = 'test';
  const label = 'Phone Number Label';
  const placeholder = 'Phone Number Placeholder';
  const tooltipText = 'Phone Number Tooltip Text';
  const validator = OptionalPhoneNumber;

  beforeEach(() => {
    props = {
      fieldName,
      initialValue: undefined,
      isSubmitted: true,
      label,
      disabled: false,
      placeholder,
      tooltipText,
      validator,
    };
  });

  it('should render', () => {
    cy.mountPhoneNumberField(props);

    cy.get('span[data-name=label]').should('have.text', label);
    cy.get('div[data-name=tooltip]').should('exist');
    cy.get('div[data-name=tooltip-content]')
      .should('not.be.visible')
      .should('contain.text', tooltipText);
    cy.get('input[name=input-test]').should('have.value', '+1');
    cy.get('div.selected-flag').should(
      'have.attr',
      'title',
      'United States: + 1'
    );
    cy.get('#errorMessage-input-test').should('not.exist');
  });

  it('should show error message', () => {
    cy.mountPhoneNumberField(props);

    cy.get('input[name=input-test]').type(' ', { delay: 0 });

    cy.get('#errorMessage-input-test')
      .should('be.visible')
      .should('have.text', 'This must be a valid phone number');
  });

  it('should not allow invalid characters', () => {
    cy.mountPhoneNumberField(props);

    cy.get('input[name=input-test]')
      .invoke('val', 'x!@#$%^&*(')
      .type(')')
      .should('have.value', '+1');
  });

  it('should be disabled', () => {
    props.disabled = true;
    cy.mountPhoneNumberField(props);

    cy.get('input[name=input-test]').should('be.disabled');
  });
});
