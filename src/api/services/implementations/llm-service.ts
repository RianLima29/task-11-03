import { ILLMService } from '../interfaces/llm-service';

/**
 * LLM Service implementation.
 * @param repository - The repository object.
 * @returns An object with LLM service methods.
 */
export const LLMService: ILLMService = repository => ({
  /**
   * Send input to model and return the result as a stream.
   * @param input - The input to send.
   * @param threadId - The ID of the thread.
   * @returns A promise that resolves to the result of the model.
   */
  sendToModel: async ({ input }) => {
    return await repository.sendToModel({ input });
  },
});
