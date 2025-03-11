import { ChatPromptTemplate } from '@langchain/core/prompts';

const htmlExtractorPrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `Given the following HTML content, extract the data in the format below. 
    The data should contain the title, content (cleaned from unnecessary HTML tags), URL, and the publication date in YYYY-MM-DD format.
    Article's url: {url} 
    HTML content: {html_content}`,
  ],
]);

export { htmlExtractorPrompt };
