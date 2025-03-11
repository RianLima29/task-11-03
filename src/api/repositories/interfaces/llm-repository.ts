import { graphType } from '../../../llm/langgraph/graph-annotation';

/**
 * Represents the interface for the LLM repository.
 */
export interface ILLMRepository {
  /**
   * Sends input to the model for processing.
   * @param args - The arguments for sending to the model.
   * @returns A promise that resolves to an iterable readable stream.
   */
  sendToModel: (args: { input: string }) => Promise<graphType>;
}
