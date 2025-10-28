const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/js/e2e/*.cy.js',
    supportFile: 'cypress/js/support/e2e.js',
    fixturesFolder: 'cypress/js/fixtures'
  }
});
