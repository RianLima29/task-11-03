import { Kafka } from 'kafkajs';
import { searchUrlNode } from './langgraph/nodes/search-url-node';
import dotenv from 'dotenv';
import path from 'path';
import { ELogType, log } from '../common/helpers/log';

dotenv.config({
  path: path.join(__dirname, '../../', '.env'),
});

const kafka = new Kafka({
  clientId: 'news-agent',
  brokers: [process.env.KAFKA_BROKER as string],
  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME as string,
    password: process.env.KAFKA_PASSWORD as string,
  },
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 25000,
});

const consumer = kafka.consumer({
  groupId:
    (process.env.KAFKA_GROUP_ID_PREFIX as string) + 'rian-da-costa2-lima',
});

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'news', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const stringObj = message.value?.toString();

      if (!stringObj) return;

      try {
        const link = JSON.parse(stringObj)?.value?.url;
        await searchUrlNode({ inputUrls: [link], messages: [], documents: [] });
      } catch (error) {
        log('Error while processing Kafka article', ELogType.error);
      }
    },
  });
};

export { run as runKafkaConsumer };
