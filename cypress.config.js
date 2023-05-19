/* eslint-disable @typescript-eslint/no-var-requires */
const { defineConfig } = require('cypress');
require('dotenv').config({ path: '.env.local' });

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(_on, config) {
      config.baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
      config.env.auth0_username = process.env.NEXT_PUBLIC_TEST_USER;
      config.env.auth0_password = process.env.NEXT_PUBLIC_TEST_PASSWORD;
      config.env.auth0_domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
      config.env.auth0_audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;
      config.env.auth0_client_id = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
      config.env.cf_access_id = process.env.CF_ACCESS_CLIENT_ID;
      config.env.cf_access_secret = process.env.CF_ACCESS_CLIENT_SECRET;

      return config;
    },
  },
});
