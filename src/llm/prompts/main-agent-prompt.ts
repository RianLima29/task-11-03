import { ChatPromptTemplate } from '@langchain/core/prompts';

const mainAgentPrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question.
    If you don't know the answer, just say that you don't know in a friendly way.
    If you don't find the answer on the context below. Just tell you don't know in a friendly way and do not provide any sources.
    Your sources must contain the URLs you used in order to formulate your answer.
    Answer in the same language as the user's question
    Use three sentences maximum and keep the answer concise.
    Question: {question} 
    Context: {context} 
    Answer:`,
  ],
]);

export { mainAgentPrompt };
