import { MessageState, initialMessageState } from './message.state';
import { MessageActions, MessageActionsEnum } from './message.actions';


export const messageReducers = (
  state = initialMessageState,
  action: MessageActions
): MessageState => {
  switch (action.type) {
    case MessageActionsEnum.GetMessagesSuccess:
      return {
        ...state,
        messages: action.payload
      };

    case MessageActionsEnum.GetMessageSuccess:
      return {
        ...state,
        selectedMessage: action.payload
      };

    case MessageActionsEnum.MarkAsSeenSuccess:
      return {
        ...state,
        messages: action.payload
      };

    default:
      return state;
  }
};
