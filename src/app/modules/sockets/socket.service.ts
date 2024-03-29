import { Injectable } from '@angular/core';
import { RxStomp, RxStompConfig } from '@stomp/rx-stomp';
import { IMessage } from '@stomp/stompjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private rxStomp: RxStomp;

  constructor() {
    const config: RxStompConfig = {
      brokerURL: 'ws://localhost:8080/chat',
      connectHeaders: {
      },
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
      reconnectDelay: 500,
      debug: (str: string) => {
        console.log(new Date(), str);
      },
    };
    this.rxStomp = new RxStomp();
    this.rxStomp.configure(config);
    this.rxStomp.activate();
    console.log('Broker url is:', this.rxStomp.stompClient.brokerURL);
  }

  public subscribe(destination: string): Observable<IMessage> {
    return this.rxStomp.watch(destination);
  }

  public send(destination: string, body: any): void {
    this.rxStomp.publish({ destination, body });
  }
}
