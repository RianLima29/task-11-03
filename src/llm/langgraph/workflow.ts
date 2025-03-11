import { StateGraph, START, END } from '@langchain/langgraph';
import { graphAnnotation } from './graph-annotation';
import { urlDetectionNode } from './nodes/url-detection-node';
import { searchUrlNode } from './nodes/search-url-node';
import { foundAnyUrls } from './conditional-edges/found-any-urls';
import { semanticSearchNode } from './nodes/semantic-search-node';
import { callModelNode } from './nodes/call-model-node';

const workflow = new StateGraph(graphAnnotation);

workflow
  .addNode('url-detection', urlDetectionNode)
  .addEdge(START, 'url-detection')
  .addNode('search-url', searchUrlNode)
  .addNode('semantic-search', semanticSearchNode)
  .addConditionalEdges('url-detection', foundAnyUrls, {
    'search-url': 'search-url',
    'semantic-search': 'semantic-search',
  })
  .addNode('call-model', callModelNode)
  .addEdge('semantic-search', 'call-model')
  .addEdge('search-url', 'call-model');

export { workflow };
