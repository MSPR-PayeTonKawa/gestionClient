import {Kafka} from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka-broker1:9092', 'kafka-broker2:9092'],
});

export const producer = kafka.producer();
