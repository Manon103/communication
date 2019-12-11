import { Component, OnInit, TemplateRef } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { UserInfoService } from '../service/user-info.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-communication-component',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {

  friendList: SelectItem[];
  selectedFriend = '';
  displayAddFriendDialog = false;
  searchInfo = '';

  constructor(
    private userInfoService: UserInfoService,
    private messageService: MessageService,
    private location: PlatformLocation,
  ) {
  }

  ngOnInit(): void {
    // 初始化病人好友列表
    this.userInfoService.getFriendList({ userName: sessionStorage.getItem('userName') }).subscribe(data => {
      this.friendList = data.map(item => {
        return {
          label: item, value: item,
        };
      });
    }, err => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'error', detail: '获取好友列表失败，请稍后再试' });
    }, () => {
        // 解决刷新界面时左侧好友栏和信息栏不同步的问题
        // this.location.pathname获取当前路由
        const routerArray = this.location.pathname.split('/');
        if (routerArray.length === 4) {
          this.selectedFriend = routerArray[3];
        } else {
          this.selectedFriend = this.friendList[0].label;
        }
    });

  }

  showAddDialog() {
    this.searchInfo = '';
    this.displayAddFriendDialog = true;
  }

  hideAddDialog() {
    this.displayAddFriendDialog = false;
  }

  // 验证添加的好友是否存在
  validateSearchInfo() {
    if (this.searchInfo) {
      this.userInfoService.validateSearchInfo(this.searchInfo).subscribe(data => {
        if (data.length === 0) {
          this.messageService.add({severity: 'error', summary: 'error', detail: '用户不存在'});
        } else {
          const addInfo = {
            userName: sessionStorage.getItem('userName'),
            friendName: this.searchInfo
          };
          this.userInfoService.addFriend(addInfo).subscribe(_data => {
            this.displayAddFriendDialog = false;
            this.messageService.add({severity: 'success', summary: 'success', detail: _data.body});
          }, err => {
            this.messageService.add({severity: 'error', summary: 'error', detail: err.body});
          });
        }
      }, err => {
          console.log(err);
          this.messageService.add({severity: 'error', summary: 'error', detail: '服务器错误'});
      });
    }
  }
}
