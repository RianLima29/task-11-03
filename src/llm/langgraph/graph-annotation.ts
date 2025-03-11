import { Document } from '@langchain/core/documents';
import { BaseMessage } from '@langchain/core/messages';
import { Annotation } from '@langchain/langgraph';

const graphAnnotation = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (a, b) => a.concat(b),
    default: () => [],
  }),
  inputUrls: Annotation<string[]>({
    reducer: (a, b) => a.concat(b),
    default: () => [],
  }),
  documents: Annotation<Document[]>({
    reducer: (a, b) => a.concat(b),
    default: () => [],
  }),
});

type graphType = typeof graphAnnotation.State;

export { graphAnnotation, graphType };
