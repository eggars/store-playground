import { Action } from '@ngrx/store';
import { Message } from 'src/app/data/models/message.interface';


export enum MessageActionsEnum {
  GetMessages = '[Message] get messages',
  GetMessagesSuccess = '[Message] get messages success',
  GetMessage = '[Message] get message',
  GetMessageSuccess = '[Message] get message success'
}

export class GetMessages implements Action {
  public readonly type = MessageActionsEnum.GetMessages;
}

export class GetMessagesSuccess implements Action {
  public readonly type = MessageActionsEnum.GetMessagesSuccess;
  constructor(public payload: Message[]) {}
}

export class GetMessage implements Action {
  public readonly type = MessageActionsEnum.GetMessage;
  constructor(public payload: string) {}
}

export class GetMessageSuccess implements Action {
  public readonly type = MessageActionsEnum.GetMessageSuccess;
  constructor(public payload: Message) {}
}

export type MessageActions =
  GetMessages
  | GetMessagesSuccess
  | GetMessage
  | GetMessageSuccess;
