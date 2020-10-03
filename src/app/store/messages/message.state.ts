import { Message } from '../../data/models/message.interface';

export interface MessageState {
  messages: Message[];
  selectedMessage: Message;
}

export const initialMessageState: MessageState = {
  messages: [],
  selectedMessage: null
};
