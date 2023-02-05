import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  url: string = environment.apiHost + "api/socket";
  restUrl:string = environment.apiHost + "/sendMessageRest";

  constructor(private http: HttpClient) { }

  post(data: Message) {
    return this.http.post<Message>(this.url, data)
      .pipe(map((data: Message) => { return data; }));
  }

  postRest(data: Message) {
    return this.http.post<Message>(this.restUrl, data)
      .pipe(map((data: Message) => { return data; }));
  }
}

export interface Message {
  message: string,
  fromId: string,
  toId: string,
}
