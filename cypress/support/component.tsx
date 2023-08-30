// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '@/styles/globals.css';
import '@cypress/code-coverage/support';
import { mount } from 'cypress/react18';

Cypress.Commands.add('mount', mount);

// You can uncomment this to get console logs about how long each test takes
// Cypress.on('test:after:run', (attributes) => {
//   console.log(
//     'Test "%s" has finished in %dms',
//     attributes.title,
//     attributes.duration
//   );
// });
