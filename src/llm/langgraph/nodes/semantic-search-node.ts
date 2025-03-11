import { pineconeStore } from '../../config/pinecone';
import { graphType } from '../graph-annotation';

/**
 * Performs a semantic search based on the provided messages.
 * @param {graphType} options - The options for the semantic search.
 * @param {Array<Message>} options.messages - The array of messages to perform the search on.
 * @returns {Promise<{ documents: Array<Document> }>} The search results containing an array of documents.
 */
const semanticSearchNode = async ({ messages }: graphType) => {
  const lastMessage = messages[messages.length - 1];

  const store = await pineconeStore();

  let documents = await store.similaritySearch(lastMessage.content.toString());

  return {
    documents,
  };
};

export { semanticSearchNode };
