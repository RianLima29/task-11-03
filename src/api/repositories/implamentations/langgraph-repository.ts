import { ILLMRepository } from '../interfaces/llm-repository';
import { HumanMessage } from '@langchain/core/messages';
import { workflow } from '../../../llm/langgraph/workflow';
import { langfuseCallback } from '../../../llm/config/langfuse';

/**
 * Repository implementation for langgraph.
 */
export const langgraphRepository: ILLMRepository = {
  /**
   * Sends input to the model and returns the response as a stream.
   * @param input The input message.
   * @returns The response from the model.
   */
  sendToModel: async ({ input }) => {
    const app = workflow.compile();
    return app.invoke(
      {
        messages: [new HumanMessage(input)],
      },
      { callbacks: [langfuseCallback] }
    );
  },
};
