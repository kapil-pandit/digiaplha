// Import necessary modules and libraries
const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('../app'); // Import your Express app
const models = require('../database/models')

// Describe block for the User API tests
describe('User API Tests', function () {

  // Before hook to ensure the database is set up before running tests
let user;
  before(async function (done) {
    user = await models.sequelize.query(`INSERT INTO "Users" (firstname,lastname, email, phone) VALUES ('Kapil', 'PAndit','kapilpandit@0408@gmail','8088706502'`)
    // Perform any setup here (e.g., creating a test database or migrating data)
    // Call done() when setup is complete
    done();
  });

  // After hook to clean up after running tests
  after(function (done) {
    // Perform any cleanup here (e.g., dropping the test database)
    // Call done() when cleanup is complete
    done();
  });

  // Test case for GET /users endpoint
  it('should retrieve all users', async function (done) {
    await supertest(app)
      .get('/user')
      .expect(200) // Expecting HTTP status code 200
      .end(function (err, res) {
        // Handle the response and assertions
        expect(res.body).to.be.an('array');
        // Add more assertions based on your API response structure
        done();
      });
  });

  // Test case for POST /users endpoint
  it('should create a new user', function (done) {
    supertest(app)
      .post('/users')
      .send({ name: 'John Doe', email: 'john.doe@example.com' })
      .expect(201) // Expecting HTTP status code 201 (Created)
      .end(function (err, res) {
        // Handle the response and assertions
        expect(res.body).to.have.property('id');
        // Add more assertions based on your API response structure
        done();
      });
  });

  it('should Update a user', function (done) {
    supertest(app)
      .post('/users')
      .send({ name: 'John Doe', email: 'john.doe@example.com' })
      .expect(201) // Expecting HTTP status code 201 (Created)
      .end(function (err, res) {
        // Handle the response and assertions
        expect(res.body).to.have.property('id');
        // Add more assertions based on your API response structure
        done();
      });
  });

  it('should Delete a user', function (done) {
    supertest(app)
      .delete('/user/:id')
      .send({ name: 'John Doe', email: 'john.doe@example.com' })
      .expect(201) // Expecting HTTP status code 201 (Created)
      .end(function (err, res) {
        // Handle the response and assertions
        expect(res.body).to.have.property('id');
        // Add more assertions based on your API response structure
        done();
      });
  });

  // Add more test cases for other CRUD operations and edge cases

});
