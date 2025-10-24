// cypress/ts/e2e/api.cy.ts

import DataGeneration from '../support/utils/dataGeneration';

describe('API testing', () => {
  let baseUrl: string;
  let body: ReturnType<typeof DataGeneration.randomPostBody>;
  let expectedPayload: unknown;

  before(() => {
    cy.log('*** Testing API Endpoints ***');
    baseUrl = 'https://jsonplaceholder.typicode.com';
    body = DataGeneration.randomPostBody();

    cy.fixture('posts.json').then((data) => {
      expectedPayload = data;
    });
  });

  it('GET /posts returns expected payload', () => {
    cy.request(`${baseUrl}/posts`).then((response) => {
      expect(response.status).to.eq(200);
      expect(Array.isArray(response.body)).to.be.true;
      expect(response.body).to.deep.equal(expectedPayload);
      cy.log(`GET /posts length is: ${response.body.length}`);
    });
  });

  it('POST /posts creates a new post', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/posts`,
      body,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.include(body);
      expect(response.body).to.have.property('id');
      cy.log(`POST /posts body is: ${JSON.stringify(response.body)}`);
    });
  });

  after(() => {
    cy.log('*** Completed API Endpoints Testing ***');
  });
});
