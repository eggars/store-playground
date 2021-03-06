import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MessageService } from './data/services/message.service';
import { AppState } from './store';
import { Store, select } from '@ngrx/store';
import { GetMessages, GetMessage, MarkAsSeen, DeleteMessage } from './store/messages/message.actions';
import { selectMessageCount, selectUnseenMessageCount, selectMessageList, selectSelectedMessage } from './store/messages/message.selector';
import { Message } from './data/models/message.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'storePlayground';
  messageCount$: Observable<number>;
  unseenMessageCount$: Observable<number>;
  messages$: Observable<Message[]>;
  selectedMessage$: Observable<Message>;
  selectedMessage: Message;
  subscriptions: Subscription[] = [];
  doneLoading = true;

  constructor(private messageService: MessageService, private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.messageCount$ = this.store.pipe(select(selectMessageCount));
    this.unseenMessageCount$ = this.store.pipe(select(selectUnseenMessageCount));
    this.messages$ = this.store.pipe(select(selectMessageList));
    this.selectedMessage$ = this.store.pipe(select(selectSelectedMessage));
    const subscription = this.selectedMessage$.subscribe(message => {
      this.selectedMessage = message;
      if (!!message && !message.seen) {
        this.store.dispatch(new MarkAsSeen(message.id));
      }
    });
    this.subscriptions.push(subscription);
  }

  selectMessage(messageId: string): void {
    this.store.dispatch(new GetMessage(messageId));
  }

  deleteMessage(messageId: string): void {
    this.store.dispatch(new DeleteMessage(messageId));
  }

  generateMessages(): void {
    const subscription = this.messageService.messageStorage$.subscribe(res => {
      if (res.doneLoading && res.doneLoading !== this.doneLoading) {
        this.store.dispatch(new GetMessages());
      }
      this.doneLoading = res.doneLoading;
    });
    this.subscriptions.push(subscription);
    this.messageService.generateMessages();
  }

}
