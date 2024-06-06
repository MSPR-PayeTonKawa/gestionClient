const {Client, expect} = require('@loopback/testlab');
const {MyApplication} = require('../..');
const supertest = require('supertest');

describe('UserController', () => {
  let app;
  let client;

  before(async () => {
    app = new MyApplication();
    await app.boot();
    await app.start();

    client = supertest(app.restServer.url);
  });

  after(async () => {
    await app.stop();
  });

  it('should return a list of users', async () => {
    await client
      .get('/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        expect(response.body).to.be.an.Array();
        // Add more assertions as needed
      });
  });

  // Add more tests for other endpoints
});
