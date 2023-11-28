import { printErrorMessages } from '@/lib/helpers/display';

describe('printErrorMessages prior to submitting', () => {
  const inputid = 'test-id';
  const isSubmitted = false;
  const expectedError = 'Cannot be over 255 characters';

  it('should display max length error', () => {
    const errors = [expectedError];
    const expected = printErrorMessages(inputid, isSubmitted, errors);
    cy.mount(expected);

    cy.get(`p#errorMessage-${inputid}`).should('have.text', expectedError);
  });

  it('should not display errors if not a max length error', () => {
    const errors = ['some other error'];
    const expected = printErrorMessages(inputid, isSubmitted, errors);
    cy.mount(expected);

    cy.get(`p#errorMessage-${inputid}`).should('not.exist');
  });
});

describe('printErrorMessages after submitting', () => {
  const inputid = 'test-id';
  const isSubmitted = true;
  const expectedError = 'This is a required field';

  it('should display required error', () => {
    const errors = [expectedError];
    const expected = printErrorMessages(inputid, isSubmitted, errors);
    cy.mount(expected);

    cy.get(`p#errorMessage-${inputid}`).should('have.text', expectedError);
  });

  it('should not display errors if no errors', () => {
    const errors: string[] = [];
    const expected = printErrorMessages(inputid, isSubmitted, errors);
    cy.mount(expected);

    cy.get(`p#errorMessage-${inputid}`).should('not.exist');
  });
});
