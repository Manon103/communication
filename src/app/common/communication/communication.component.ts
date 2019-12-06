import { Component, OnInit, TemplateRef } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { UserInfoService } from '../service/user-info.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-communication-component',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {

  friendList: SelectItem[];
  selectedCity1: '';
  displayAddFriendDialog = false;
  searchInfo = '';

  constructor(
    private userInfoService: UserInfoService,
    private messageService: MessageService,
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
    });
  }

  showAddDialog() {
    this.searchInfo = '';
    this.displayAddFriendDialog = true;
  }

  hideAddDialog() {
    this.displayAddFriendDialog = false;
  }

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
        this.messageService.add({severity: 'error', summary: 'error', detail: '服务器错误'});
      });
    }
  }
}
