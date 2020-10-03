import { ofType, Effect, Actions } from '@ngrx/effects';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GetMessages, MessageActionsEnum, GetMessage, GetMessageSuccess, GetMessagesSuccess, MarkAsSeen, MarkAsSeenSuccess } from './message.actions';
import { select, Store } from '@ngrx/store';
import { selectMessageList } from './message.selector';
import { AppState } from '..';
import { MessageService } from 'src/app/data/services/message.service';
import { of } from 'rxjs';
import { MessageListResponse } from 'src/app/data/models/message-list-response.interface';

@Injectable()
export class MessageEffects {
  @Effect()
  getMessage$ = this.actions$.pipe(
    ofType<GetMessage>(MessageActionsEnum.GetMessage),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectMessageList))),
    switchMap(([id, messages]) => {
      const selectedMessage = messages.filter(m => m.id === id)[0];
      return of(new GetMessageSuccess(selectedMessage));
    })
  );

  @Effect()
  getMessages$ = this.actions$.pipe(
    ofType<GetMessages>(MessageActionsEnum.GetMessages),
    switchMap(() => this.messageService.getMessages()),
    switchMap((messageListResponse: MessageListResponse) => {
      return of(new GetMessagesSuccess(messageListResponse.messages));
    })
  );

  @Effect()
  markAsSeen$ = this.actions$.pipe(
    ofType<MarkAsSeen>(MessageActionsEnum.MarkAsSeen),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectMessageList))),
    switchMap(([id, messages]) => {
      const res = messages.map((message) => (message.id === id) ? {...message, seen : true} : message);
      this.messageService.markAsSeen(res);
      return of(new MarkAsSeenSuccess(res));
    })
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private messageService: MessageService
  ) {}
}
