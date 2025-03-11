/**
 * Represents a message.
 */
export interface IMessage {
  from: 'ai' | 'human';
  content: string;
}
