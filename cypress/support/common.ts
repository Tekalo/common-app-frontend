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

Cypress.Commands.add('fastClick', { prevSubject: true }, (subject) => {
  const wrappedSubject = cy.wrap(subject);

  wrappedSubject.click({ force: true });

  return wrappedSubject;
});
