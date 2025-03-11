import { ILLMRepository } from '../../repositories/interfaces/llm-repository';

interface IReturnType extends ILLMRepository {}

/**
 * Represents a function type for an LLM service.
 * @param repository - The LLM repository.
 * @returns The return type of the LLM service.
 */
export type ILLMService = (repository: ILLMRepository) => IReturnType;
