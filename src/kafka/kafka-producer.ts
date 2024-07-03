import {producer} from './kafka-config';

export async function sendClientEvent(
  clientId: number,
  username: string,
  password: string,
) {
  await producer.connect();
  await producer.send({
    topic: 'client-events',
    messages: [
      {
        key: String(clientId),
        value: JSON.stringify({clientId, username, password}),
      },
    ],
  });
  await producer.disconnect();
}
