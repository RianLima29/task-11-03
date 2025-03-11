import { LLMService } from '../services/implementations/llm-service';
import { langgraphRepository } from '../repositories/implamentations/langgraph-repository';

interface Source {
  title: string;
  url: string;
  date: string;
}

interface ModelResponse {
  answer: string;
  sources: Source[];
}

export const llmResolvers = {
  Query: {
    getModelResponse: async (
      _: unknown,
      { query }: { query: string }
    ): Promise<ModelResponse> => {
      const service = LLMService(langgraphRepository);

      const state = await service.sendToModel({
        input: query,
      });

      const lastMessage = state.messages[state.messages.length - 1];

      if ('answer' in lastMessage) {
        return lastMessage as unknown as ModelResponse;
      }
      throw Error('Error while processing the request');
    },
  },
};
