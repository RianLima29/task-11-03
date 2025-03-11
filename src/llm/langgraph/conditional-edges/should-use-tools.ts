import { AIMessage } from '@langchain/core/messages';
import { graphType } from '../graph-annotation';

export const shouldUseTools = ({ messages }: graphType) => {
  const lastMessage = messages[messages.length - 1] as AIMessage;

  if (!lastMessage.additional_kwargs?.tool_calls?.length) {
    return 'END';
  }

  return 'tool-node';
};
