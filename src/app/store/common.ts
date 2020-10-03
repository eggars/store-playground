import { ActionReducerMap } from '@ngrx/store';
import { messageReducers } from './messages/message.reducers';
import { AppState } from '.';


export const appReducers: ActionReducerMap<AppState, any> = {
  messageState: messageReducers
};
