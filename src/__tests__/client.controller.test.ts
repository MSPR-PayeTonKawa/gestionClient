const {Client, expect} = require('@loopback/testlab');
const {MyApplication} = require('../..');
const supertest = require('supertest');

describe('ClientController', () => {
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

  it('should create a new client', async () => {
    const newClient = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
    };

    await client
      .post('/clients')
      .send(newClient)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        expect(response.body).to.have.properties([
          'id',
          'name',
          'email',
          'phone',
          'address',
        ]);
        expect(response.body.name).to.equal(newClient.name);
        expect(response.body.email).to.equal(newClient.email);
      });
  });

  it('should return a list of clients', async () => {
    await client
      .get('/clients')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        expect(response.body).to.be.an.Array();
        // Add more assertions as needed
      });
  });

  it('should update a client by id', async () => {
    const updateData = {
      name: 'Jane Doe',
    };

    const createdClient = await client
      .post('/clients')
      .send({
        name: 'Temporary Name',
        email: 'temp@example.com',
      })
      .then(response => response.body);

    await client
      .patch(`/clients/${createdClient.id}`)
      .send(updateData)
      .expect(204);

    await client
      .get(`/clients/${createdClient.id}`)
      .expect(200)
      .then(response => {
        expect(response.body.name).to.equal(updateData.name);
      });
  });

  it('should delete a client by id', async () => {
    const createdClient = await client
      .post('/clients')
      .send({
        name: 'To Be Deleted',
        email: 'delete@example.com',
      })
      .then(response => response.body);

    await client.del(`/clients/${createdClient.id}`).expect(204);

    await client.get(`/clients/${createdClient.id}`).expect(404);
  });

  it('should count the number of clients', async () => {
    await client
      .get('/clients/count')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        expect(response.body).to.have.property('count');
        expect(response.body.count).to.be.a.Number();
      });
  });

  it('should replace a client by id', async () => {
    const createdClient = await client
      .post('/clients')
      .send({
        name: 'Old Name',
        email: 'old@example.com',
      })
      .then(response => response.body);

    const replacementData = {
      name: 'New Name',
      email: 'new@example.com',
      phone: '0987654321',
      address: '456 Another St',
    };

    await client
      .put(`/clients/${createdClient.id}`)
      .send(replacementData)
      .expect(204);

    await client
      .get(`/clients/${createdClient.id}`)
      .expect(200)
      .then(response => {
        expect(response.body).to.have.properties([
          'id',
          'name',
          'email',
          'phone',
          'address',
        ]);
        expect(response.body.name).to.equal(replacementData.name);
        expect(response.body.email).to.equal(replacementData.email);
        expect(response.body.phone).to.equal(replacementData.phone);
        expect(response.body.address).to.equal(replacementData.address);
      });
  });
});
