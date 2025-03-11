
Copy
# News Article Agent - Full-Stack JavaScript with RAG/LLM

## Overview

This project is a Node.js-based query-response application that integrates with a large language model (LLM) to create a Retrieval-Augmented Generation (RAG) system using a vector database. The application ingests a dataset containing recent news links, extracts and cleans the content, and provides answers to user queries. It can also "read" information from links and answer questions about their contents.

## Design Decisions and Optimizations

1. **ID-Based Search Before Semantic Search**: Before performing a semantic search in the vector database, the system first checks for exact matches using IDs. This reduces token usage and improves latency.
2. **Asynchronous Processing**: Data ingestion and processing are handled asynchronously to ensure the system remains responsive.
3. **LangGraph for Workflow Modularity**: LangGraph is used to break down complex workflows into smaller, reusable components, improving code readability and maintainability.
4. **Langfuse Integration**: Langfuse is used for monitoring and debugging, providing insights into LLM usage, response times, and error tracking.

## Bonus Points Implemented

- **Structured Output**: The response format is standardized for consistency.
- **Monitoring with Langfuse**: Integrated Langfuse for enhanced observability.
- **Optimization Strategies**: Described in the README for improving quality, cost, and latency.

## Features

- **Real-time Data Ingestion**: Ingest news article links via Kafka.
- **Content Extraction and Cleaning**: Extract HTML content from links, clean it, and structure it into a standardized format.
- **Vector Database Storage**: Store cleaned data in a vector database (Pinecone) for fast retrieval and similarity searches.
- **Query-Response Interface**: A POST endpoint (`/agent`) to handle user queries and return answers with relevant sources.
- **Optimizations**: Implemented ID-based search in the vector database before semantic search, asynchronous processing, and LangGraph for improved readability and modularity of workflows.
- **Monitoring and Debugging**: Integrated Langfuse for enhanced monitoring and debugging.

## Technologies Used

- **Backend**: Node.js with TypeScript, Express.js.
- **Vector Database**: Pinecone.
- **LLM Integration**: OpenAI API, Langchain, Langgraph.
- **Monitoring**: Langfuse.
- **Data Ingestion**: Kafka.

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher) installed.
- API keys for OpenAI, Pinecone, Kafka, and Langfuse.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```plaintext
OPENAI_API_KEY=your_openai_api_key
HTTP_SERVER_PORT=3475
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=your_pinecone_index_name
KAFKA_BROKER=your_kafka_broker
KAFKA_USERNAME=your_kafka_username
KAFKA_PASSWORD=your_kafka_password
KAFKA_TOPIC_NAME=news
KAFKA_GROUP_ID_PREFIX=test-task-
LANGFUSE_SECRET_KEY=your_langfuse_secret_key
LANGFUSE_PUBLIC_KEY=your_langfuse_public_key
```

### How to run it

1. Run ```npm i```
2. Run ```npm run dev```

## Testing the GraphQL Endpoint

The application provides a GraphQL endpoint for querying the model. Below is an example of how to test the endpoint using the provided query.

### GraphQL Query

Use the following query to get a response from the model:

```
query GetModelResponse($query: String!) {
  getModelResponse(query: $query) {
    answer
    sources {
      title
      url
      date
    }
  }
}
```
**Expected Response**

```
{
  "data": {
    "getModelResponse": {
      "answer": "Justin Trudeau recently announced new climate policies...",
      "sources": [
        {
          "title": "Justin Trudeau announces new climate policies",
          "url": "https://www.example.com/news/justin-trudeau-climate",
          "date": "2023-10-01T13:17:36Z"
        }
      ]
    }
  }
}
```

