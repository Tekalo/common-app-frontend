# Testing

## E2E Tests

### Overview

We are using [cypress](https://www.cypress.io/) as our FE e2e framework. All of the config and tests for cypress are located in the top-level `cypress` folder. The tests themselves are located in `cypress/e2e`.

### Running tests

If you want to run specific tests or view them as they run, you can run `pnpm cy`. This will open an interactive window, take screenshots as each test step runs, and, if you enable it in the config, record video and take screenshots of test failures.

If you wish to run all of the tests through the command line, as they would be run in CI, you can simply run `pnpm test:e2e`.

You will need an instance of the application running on the `NEXT_PUBLIC_BASE_URL` set in your `.env.local` file for the tests to run.

## Unit Tests

Unit tests are also a part of the project CI pipeline. These are meant to test each component individually and set expectations for how things should behave independently. Tests should not include other providers/components if you can help it. They should not make API calls that ever reach the BFF or API.

The tests are in a file structure identical to the `src` folder because most components should have a test file and this is the easiest way to keep the tests separate from the source code.

You can run the unit tests in an interactive window by running `pnpm cy` and selecting `component tests`.

Or, you can run them through the command line with `pnpm test:unit`

## Notes

### Test code compilation

Please see the [Configuration Files](./project-organization/configuration-files.md) section for details on this.

### Deleting test data from e2e tests

Because the E2E tests actually run on the front-end communicating with the API, we need to submit requests to the API when running our tests. To clean up this test data we use [Cypress sessions](https://docs.cypress.io/api/cypress-api/session) to store the ids of the applicant or organizations we've submitted, and delete the data at the end. You can see the methods we use to get, store, and clear these ids in `cypress.config.js` under the `.on('task')` section. We use these methods in `cypress/support/commands.ts` when we are done running our tests.

### Cypress `tsconfig.json`

Cypress has its own `cypress/tsconfig.json` file so we can recognize Cypress types and commands without including them in the tsconfig for the main project.

### Declaring new commands for Cypress

In order to add any new commands that run through cypress (mounting components, session functions, etc.) you will need to declare them in the `cypress/global.d.ts` file. Read the [Cypress Commands](https://docs.cypress.io/api/cypress-api/custom-commands) docs.

## Known Pitfalls

If your tests are unexpectedly failing when you've re-ordered some components or added new form fields, ensure that you are closing any dropdown menus or other objects that sit on top of other fields. Failing to do so may cause tests to be unable to see and update inputs that are covered

If your e2e tests fail somewhere in the process of running them, all consecutive failures will use a much shorter timeout limit which may lead you to think that other assertions are failing. Always try to fix the first failure before you try to fix the others, as the other may just be cascading from the first.
