import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WebSocketService {
  ws: WebSocket;
  constructor() { }
  createObservableWebSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => {
          observer.next(event.data);
        };
        this.ws.onerror = (event) => {
          observer.error(event);
        };
        this.ws.onclose = (event) => {
          observer.complete();
        };
      }
    );
  }
  sendMessage(msg) {
    this.ws.send(JSON.stringify(msg));
  }

}
