import { defineConfig } from 'cypress';

export default defineConfig({
  fixturesFolder: 'tests/cypress/fixtures',
  screenshotsFolder: 'tests/cypress/screenshots',
  video: false,
  videosFolder: 'tests/cypress/videos',
  e2e: {
    setupNodeEvents(on, config) {
      return require('./tests/cypress/plugins/index.ts')(on, config);
    },
    baseUrl: 'http://localhost:6006',
    specPattern: 'tests/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/cypress/support/index.ts',
  },
});
