import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { WebSocketService } from '../../service/websocket.service';
import { RecieveMessage } from '../../model/recieveMessage';
import { UserInfoService } from '../../service/user-info.service';

@Component({
  selector: 'app-message-component',
  styleUrls: ['./message.component.css'],
  templateUrl: './message.component.html'
})

export class MessageComponent implements OnInit {

  constructor(
    private webSocketService: WebSocketService,
    private userInfoService: UserInfoService,
    private el: ElementRef,
  ) {

  }

  msgEmitter: EventEmitter<string> = new EventEmitter();
  messageList = [];
  msg = '';

  ws: WebSocket;
  session = sessionStorage.getItem('userName');
  recieveMsg: RecieveMessage;

  ngOnInit(): void {
    const searchParams = {
      userName: this.session,
      aimUser: 'nicai'
    };
    this.userInfoService.getMessage(searchParams).subscribe(
      data => {
        this.messageList = data.map(item => {
          return {
            message: item.message,
            userName: item.userName,
            styleClass: item.userName === this.session ? 'fRight' : 'fLeft',
          };
        });
        console.log(this.messageList);
      },
      err => {
        this.userInfoService.handleError(err);
      }
    );
    this.webSocketService.createObservableWebSocket('ws://localhost:8085').subscribe(
      data => {
          this.recieveMsg = {
            message: JSON.parse(data).msg,
            userName: JSON.parse(data).session,
            styleClass: JSON.parse(data).session === this.session ? 'fRight' : 'fLeft',
          };
          this.messageList.push(this.recieveMsg);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('流已结束');
      }
    );
  }

  sendMsg() {
    const message = {
      msg: this.msg,
      session: this.session
    };
    this.webSocketService.sendMessage(message);
    this.userInfoService.sendMessage(message).subscribe(
      data => { },
      err => {
        this.userInfoService.handleError(err);
      }
    );
    const msgTable = this.el.nativeElement.querySelector('.msgTable');
    setTimeout(() => {
      msgTable.scrollTop = msgTable.scrollHeight;
    }, 300);
    this.msg = '';
  }

}
