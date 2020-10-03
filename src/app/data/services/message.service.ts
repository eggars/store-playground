import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageListResponse } from '../models/message-list-response.interface';
import { Message } from '../models/message.interface';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageStorage$: BehaviorSubject<MessageStorage> = new BehaviorSubject({messages: [], doneLoading: false});

  constructor(private httpClient: HttpClient) { }

  getMessages(): Observable<MessageListResponse> {
    return of({ messages: this.messageStorage$.value.messages } as MessageListResponse);
  }

  updateStorage(updatedList: Message[]): void {
    const currentStorege = this.messageStorage$.value;
    currentStorege.messages = updatedList;
    this.messageStorage$.next(currentStorege);
  }

  generateMessages(): void {
    [...Array(5)].forEach((_, i) => {
      setTimeout(() => {
        this.httpClient.get(chuckApiUrl).subscribe((res: ChuckApiResponse) => {
          const message = this.toMessage(res);
          const storageState = this.messageStorage$.value;
          storageState.messages = storageState.messages.concat([message]);
          storageState.doneLoading = i === 4;
          this.messageStorage$.next(storageState);
        });
      }, 500 * i + 1);
    });
  }

  private toMessage(item: ChuckApiResponse): Message {
    return {
      id: item.id,
      subject: item.value.split(' ')[0],
      body: item.value,
      seen: false,
      iconSrc: item.icon_url
    } as Message;
  }
}

const chuckApiUrl = 'https://api.chucknorris.io/jokes/random';

interface ChuckApiResponse {
  icon_url: string;
  id: string;
  url: string;
  value: string;
}

interface MessageStorage {
  messages: Message[];
  doneLoading: boolean;
}
