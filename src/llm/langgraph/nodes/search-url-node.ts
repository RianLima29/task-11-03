import { pineconeStore } from '../../config/pinecone';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { graphType } from '../graph-annotation';
import { Document } from '@langchain/core/documents';
import { htmlExtractorPrompt } from '../../prompts/html-extractor-prompt';
import { openaiModel } from '../../config/openai';
import * as z from 'zod';

/**
 * Performs a search for similar documents based on the input URLs and the last message content.
 * @param inputUrls - The URLs to search for similar documents.
 * @param messages - The array of messages.
 * @returns An object containing the found documents.
 */
const searchUrlNode = async ({ inputUrls, messages }: graphType) => {
  const lastMessage = messages[messages.length - 1];
  const store = await pineconeStore();

  let documents: Document[] = [];

  if (lastMessage?.content) {
    documents = await store.similaritySearch(
      lastMessage.content.toString(),
      undefined,
      {
        url: {
          $in: inputUrls,
        },
      }
    );
  }

  if (documents.length > 0) {
    return {
      documents,
    };
  }

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 200,
  });

  for (const url of inputUrls) {
    const loader = new CheerioWebBaseLoader(url, {
      selector: 'p, h1, h2, h3, h4, h5, h6, time',
    });

    const documents = await loader.load();

    const articleSchema = z.object({
      title: z.string().describe("Then articles's title"),
      content: z.string().describe('The cleaned content'),
      url: z.string().describe("article's URL"),
      date: z
        .string()
        .describe("The article's publishing date formatted as YYYY-MM-DD"),
    });
    const model = openaiModel.withStructuredOutput(articleSchema);

    const chain = htmlExtractorPrompt.pipe(model);

    const response = await chain.invoke({
      html_content: documents,
      url,
    });

    await store.addDocuments([
      new Document({
        pageContent: JSON.stringify(response),
        metadata: {
          url,
        },
      }),
    ]);

    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  if (!lastMessage?.content?.toString) {
    return {};
  }

  documents = await store.similaritySearch(
    lastMessage.content.toString(),
    undefined,
    {
      url: {
        $in: inputUrls,
      },
    }
  );

  return {
    documents,
  };
};

export { searchUrlNode };
