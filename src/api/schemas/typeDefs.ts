import { createSchema } from 'graphql-yoga';

const typeDefs = `
  type Source {
    title: String!
    url: String!
    date: String!
  }

  type ModelResponse {
    answer: String!
    sources: [Source!]!
  }

  type Query {
    getModelResponse(query: String!): ModelResponse!
  }

  type Subscription {
    modelResponseStream(query: String!): String!
  }
`;

export { typeDefs };
