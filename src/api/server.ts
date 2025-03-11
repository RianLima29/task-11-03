import { createYoga } from 'graphql-yoga';
import { typeDefs } from './schemas/typeDefs';
import { llmResolvers } from './resolvers/llm-resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: llmResolvers,
});

const yoga = createYoga({
  schema,
  graphiql: {
    subscriptionsProtocol: 'SSE',
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    methods: ['POST'],
  })
);

app.use('/graphql', yoga);

export { app as server };
