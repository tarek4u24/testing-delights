import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'cypress/ts/e2e/*.cy.ts',
    supportFile: 'cypress/ts/support/e2e.ts',
    fixturesFolder: 'cypress/ts/fixtures'
  }
});
