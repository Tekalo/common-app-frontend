Cypress.Commands.add(
  'fastType',
  { prevSubject: true },
  (subject, text: string) => {
    const wrappedSubject = cy.wrap(subject);

    if (text) {
      const firstString = text.substring(0, text.length - 1);
      const lastChar = text.charAt(text.length - 1);

      wrappedSubject.invoke('val', firstString).type(lastChar, { delay: 0 });
    }

    return wrappedSubject;
  }
);
