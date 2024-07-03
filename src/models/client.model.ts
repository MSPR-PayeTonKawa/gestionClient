import {Entity, model, property} from '@loopback/repository';
import {sendClientEvent} from '../kafka/kafka-producer';

@model()
export class Client extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  address?: string;

  constructor(data?: Partial<Client>) {
    super(data);
    if (data && data.id && data.name) {
      // Assurez-vous d'avoir les informations nécessaires pour envoyer l'événement
      sendClientEvent(data.id, data.name, 'your-password-here')
        .then(() => console.log('Event sent'))
        .catch(err => console.error('Error sending event', err));
    }
  }
}

export interface ClientRelations {
  // describe navigational properties here
}

export type ClientWithRelations = Client & ClientRelations;
