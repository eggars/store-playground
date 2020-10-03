import { AppState } from '..';
import { createSelector } from '@ngrx/store';
import { MessageState } from './message.state';

const selectMessageState = (state: AppState) => state.messageState;

export const selectMessageList = createSelector(
  selectMessageState,
  (state: MessageState) => state.messages
);

export const selectSelectedMessage = createSelector(
  selectMessageState,
  (state: MessageState) => state.selectedMessage
);

export const selectMessageCount = createSelector(
  selectMessageState,
  (state: MessageState) => state.messages.length
);

export const selectUnseenMessageCount = createSelector(
  selectMessageState,
  (state: MessageState) => state.messages.filter(m => !m.seen).length
);
