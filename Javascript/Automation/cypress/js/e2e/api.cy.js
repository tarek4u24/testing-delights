import DataGeneration from '../../support/utils/dataGeneration';
describe('API testing', () => {
    //Arrange
    let baseUrl;
    let body = DataGeneration.randomPostBody();
    let expectedPayload;

    before(() => {
        console.log('*** Testing API Endpoints ***');
        baseUrl = 'https://jsonplaceholder.typicode.com';
        cy.fixture('posts.json').then((data) => {
            expectedPayload = data;
        });
    });
  
    // GET request test case
    it('GET /posts', () => {
    //Act
    cy.request(`${baseUrl}/posts`)
    //Assert
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).is.an('array');
        expect(response.body).to.deep.equal(expectedPayload);
        console.log('GET /posts length is: '+response.body.length);
      });
  });
    
  // POST request test case
    it('POST /posts', () => {
    //Act
    cy.request('POST', `${baseUrl}/posts`, body)
    //Assert
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.include(body);
        expect(response.body).to.have.property('id');
        console.log('POST /posts body is: '+ JSON.stringify(response.body) );
      });
  });

  after(() => {
      console.log('*** Completed API Endpoints Testing ***');
  });
});
