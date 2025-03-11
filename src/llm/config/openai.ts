import { ChatOpenAI } from '@langchain/openai';
import { OpenAIEmbeddings } from '@langchain/openai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../../.env'),
});

const openaiModel = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0,
});

const openaiEmbeddingModel = new OpenAIEmbeddings({
  model: 'text-embedding-3-large',
});

export { openaiModel, openaiEmbeddingModel };
