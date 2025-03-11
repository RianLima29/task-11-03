import { openaiModel } from '../../config/openai';
import { mainAgentPrompt } from '../../prompts/main-agent-prompt';
import { graphType } from '../graph-annotation';
import { z } from 'zod';

const callModelNode = async ({ messages, documents }: graphType) => {
  const SourceSchema = z.object({
    title: z.string().describe('The title of the source article'),
    url: z.string().describe('The URL of the source article'),
    date: z
      .string()
      .describe('The publication date of the source article in ISO format'),
  });

  const AnswerSchema = z.object({
    answer: z.string().describe('The LLM-generated answer'),
    sources: z
      .array(SourceSchema)
      .describe('A list of sources related to the answer'),
  });

  const lastMessage = messages[messages.length - 1];
  const model = openaiModel.withStructuredOutput(AnswerSchema);
  const chain = mainAgentPrompt.pipe(model);

  const response = await chain.invoke({
    question: lastMessage.content?.toString(),
    context: documents,
  });
  return {
    messages: [response],
  };
};

export { callModelNode };
