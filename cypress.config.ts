// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env.local' });
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
      config.env.auth0_username = process.env.NEXT_PUBLIC_TEST_USER;
      config.env.auth0_password = process.env.NEXT_PUBLIC_TEST_PASSWORD;
      config.env.auth0_domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
      config.env.auth0_audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;
      config.env.auth0_client_id = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

      return config;
    },
  },
});
