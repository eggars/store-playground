import { MessageState, initialMessageState } from './messages/message.state';

export interface AppState {
  messageState: MessageState;
}

export const initialAppState: AppState = {
  messageState: initialMessageState
};
