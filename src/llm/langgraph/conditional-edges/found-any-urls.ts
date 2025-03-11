import { graphType } from '../graph-annotation';

const foundAnyUrls = ({ inputUrls }: graphType) => {
  return inputUrls.length > 0 ? 'search-url' : 'semantic-search';
};

export { foundAnyUrls };
