import { PineconeStore } from '@langchain/pinecone';
import { Pinecone as PineconeClient } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
import path from 'path';
import { openaiEmbeddingModel } from './openai';

dotenv.config({
  path: path.join(__dirname, '../../../.env'),
});

const pinecone = new PineconeClient();

const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

/**
 * Retrieves the PineconeStore instance.
 * @returns {Promise<PineconeStore>} The PineconeStore instance.
 */
const pineconeStore = async () => {
  const vectorStore = await PineconeStore.fromExistingIndex(
    openaiEmbeddingModel,
    {
      pineconeIndex,
      maxConcurrency: 5,
    }
  );
  return vectorStore;
};

export { pineconeStore };
