import { Component, OnInit, EventEmitter, ElementRef, Input } from '@angular/core';
import { WebSocketService } from '../../service/websocket.service';
import { RecieveMessage } from '../../model/recieveMessage';
import { UserInfoService } from '../../service/user-info.service';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


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
    private route: ActivatedRoute,
    private router: Router
  ) {
    // 监听路由变化，当路由导航结束时，加载消息列表，刷新组件,这是第一种，下面通过rxjs完善过滤
    /* this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        // 获取url中的参数  /message/selectedFriend
        this.selectedFriend = this.route.snapshot.params.selectedFriend;
        this.getMessageList(this.searchParams);
      }
    }); */

    // rxjs6版本以上使用filter、map需要使用pipe
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.selectedFriend = this.route.snapshot.params.selectedFriend;
        this.searchParams.aimUser = this.selectedFriend;
        this.getMessageList(this.searchParams);
      });
  }

  msgEmitter: EventEmitter<string> = new EventEmitter();
  messageList = [];
  msg = '';
  selectedFriend = '';
  msgTable = this.el.nativeElement.querySelector('.msgTable');
  showEmoji = false;

  ws: WebSocket;
  session = sessionStorage.getItem('userName');
  recieveMsg: RecieveMessage;
  I18n = {
    search: 'Search',
    notfound: 'No Emoji Found',
    categories: {
      search: 'Search Results',
      recent: 'Frequently Used',
      people: 'Smileys & People',
      nature: 'Animals & Nature',
      foods: 'Food & Drink',
      activity: 'Activity',
      places: 'Travel & Places',
      objects: 'Objects',
      symbols: 'Symbols',
      custom: 'Custom',
    }
  };

  searchParams = {
    userName: this.session,
    aimUser: ''
  };

  ngOnInit(): void {

    this.selectedFriend = this.route.snapshot.params.selectedFriend;
    this.searchParams.aimUser = this.selectedFriend;
    this.getMessageList(this.searchParams);
    // 前端建立ws流
    this.webSocketService.createObservableWebSocket(`ws://localhost:8085?id=${this.session}`).subscribe(
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

  getMessageList(searchParams) {
    this.userInfoService.getMessageList(searchParams).subscribe(
      data => {
        this.messageList = data.map(item => {
          const _userName = item.user.split('&')[0];
          return {
            message: item.message,
            userName: _userName,
            styleClass: _userName === this.session ? 'fRight' : 'fLeft',
          };
        });
      },
      err => {
        this.userInfoService.handleError(err);
      },
      () => {
        this.el.nativeElement.querySelector('.msgTable').scrollTop = 350;
      }
    );
  }

  sendMsg() {
    const message = {
      msg: this.msg,
      session: this.session,
      aimUser: this.selectedFriend,
    };
    // 发送消息
    this.webSocketService.sendMessage(message);
    this.userInfoService.sendMessage(message).subscribe(
      data => { },
      err => {
        this.userInfoService.handleError(err);
      },
      () => {
        this.el.nativeElement.querySelector('.msgTable').scrollTop = 350;
      }
    );

    this.getMessageList(this.searchParams);
    this.msg = '';
  }

  addEmoji(e) {

    // e.emoji.native当前选中的表情
    this.msg += e.emoji.native;
    this.showEmoji = false;
  }

  showEmojiBar() {
    this.showEmoji = !this.showEmoji;
  }
}
