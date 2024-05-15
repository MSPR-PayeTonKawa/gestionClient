import {expect} from '@loopback/testlab';
import {ClientRepository} from '../../repositories/client.repository';
import {Client} from '../../models';
import {DbDataSource} from '../../datasources';
import {juggler} from '@loopback/repository';

describe('ClientRepository (unit)', () => {
  let repo: ClientRepository;
  let dataSource: juggler.DataSource;

  before(() => {
    dataSource = new DbDataSource();
    repo = new ClientRepository(dataSource);
  });

  it('creates a client', async () => {
    const client = await repo.create({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
    });

    expect(client).to.have.properties({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
    });
  });

  it('finds a client by id', async () => {
    const client = await repo.findById(1);
    expect(client).to.have.properties({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
    });
  });
});
