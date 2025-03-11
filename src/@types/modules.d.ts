declare namespace NodeJS {
  interface ProcessEnv {
    HTTP_SERVER_PORT: string;
    OPEN_API_KEY: string;
    PINECONE_API_KEY: string;
    PINECONE_INDEX: string;
    KAFKA_BROKER: string;
    KAFKA_USERNAME: string;
    KAFKA_PASSWORD: string;
    KAFKA_TOPIC_NAME: string;
    KAFKA_GROUP_ID_PREFIX: string;
    LANGFUSE_SECRET_KEY: string;
    LANGFUSE_PUBLIC_KEY: string;
  }
}
