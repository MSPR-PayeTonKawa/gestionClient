import chai from 'chai';
import supertest from 'supertest';
const expect = chai.expect;
const request = supertest('http://localhost:3000');

describe('ClientController', () => {
  let createdClientId: number;

  it('should create a client', async () => {
    const response = await request
      .post('/clients')
      .send({
        // Remplacez ces données par les données pertinentes pour votre modèle Client
        name: 'Test Client',
        email: 'test@example.com',
      })
      .expect(200);

    expect(response.body).to.have.property('id');
    createdClientId = response.body.id;
  });

  it('should count clients', async () => {
    const response = await request.get('/clients/count').expect(200);
    expect(response.body).to.have.property('count');
  });

  it('should find all clients', async () => {
    const response = await request.get('/clients').expect(200);
    expect(response.body).to.be.an('array');
  });

  it('should find a client by id', async () => {
    const response = await request
      .get(`/clients/${createdClientId}`)
      .expect(200);
    expect(response.body).to.have.property('id', createdClientId);
  });

  it('should update a client by id', async () => {
    await request
      .patch(`/clients/${createdClientId}`)
      .send({
        name: 'Updated Client',
      })
      .expect(204);

    const response = await request
      .get(`/clients/${createdClientId}`)
      .expect(200);
    expect(response.body).to.have.property('name', 'Updated Client');
  });

  it('should replace a client by id', async () => {
    await request
      .put(`/clients/${createdClientId}`)
      .send({
        // Remplacez ces données par les données pertinentes pour votre modèle Client
        name: 'Replaced Client',
        email: 'replaced@example.com',
      })
      .expect(204);

    const response = await request
      .get(`/clients/${createdClientId}`)
      .expect(200);
    expect(response.body).to.have.property('name', 'Replaced Client');
    expect(response.body).to.have.property('email', 'replaced@example.com');
  });

  it('should delete a client by id', async () => {
    await request.del(`/clients/${createdClientId}`).expect(204);
    await request.get(`/clients/${createdClientId}`).expect(404);
  });
});
