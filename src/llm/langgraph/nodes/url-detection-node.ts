import { graphType } from '../graph-annotation';

/**
 * Extracts URLs from the messages and returns an object containing the input URLs.
 * @param {graphType} graph - The graph object containing the messages.
 * @returns {Object} - An object with the extracted URLs.
 */
const urlDetectionNode = ({ messages }: graphType) => {
  const urlRegex = /https?:\/\/[^\s]+/g;
  const lastMessage = messages[messages.length - 1];
  const urls = lastMessage.content.toString()?.match(urlRegex) || [];
  return { inputUrls: urls };
};

export { urlDetectionNode };
