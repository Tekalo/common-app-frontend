/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require('cypress');
require('dotenv').config({ path: '.env.local' });

module.exports = defineConfig({
  trashAssetsBeforeRuns: true,
  video: false,
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,

  e2e: {
    setupNodeEvents(_on, config) {
      // https://stackoverflow.com/questions/52050657/what-is-the-best-practice-of-pass-states-between-tests-in-cypress
      _on('task', {
        clearUserIds: () => {
          global.userIds = [];

          return null;
        },
        getUserIds: () => {
          return global.userIds;
        },
        storeUserId: (userId) => {
          if (global.userIds) {
            global.userIds.push(userId);
          } else {
            global.userIds = [userId];
          }

          return null;
        },
        clearOppIds: () => {
          global.oppIds = [];

          return null;
        },
        getOppIds: () => {
          return global.oppIds;
        },
        storeOppId: (oppId) => {
          if (global.oppIds) {
            global.oppIds.push(oppId);
          } else {
            global.oppIds = [oppId];
          }

          return null;
        },
      }),
        (config.baseUrl = process.env.NEXT_PUBLIC_BASE_URL);
      config.env.environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
      config.env.auth0_username = process.env.NEXT_PUBLIC_TEST_USER;
      config.env.auth0_password = process.env.NEXT_PUBLIC_TEST_PASSWORD;
      config.env.auth0_domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
      config.env.auth0_audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;
      config.env.auth0_client_id = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
      config.env.cf_access_id = process.env.CF_ACCESS_CLIENT_ID;
      config.env.cf_access_secret = process.env.CF_ACCESS_CLIENT_SECRET;
      config.env.debug_mode_secret = process.env.DEBUG_MODE_SECRET;

      return config;
    },
  },

  component: {
    setupNodeEvents(_on, config) {
      require('@cypress/code-coverage/task')(_on, config);
      _on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));

      return config;
    },
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: ['cypress/component/**/*.cy.tsx'],
  },
});
