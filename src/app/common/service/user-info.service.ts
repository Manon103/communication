import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserInfo } from '../model/userInfo';
import { Observable } from 'rxjs';

@Injectable()
export class UserInfoService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')
  };

  handleError(err: HttpErrorResponse): string {
    if (err.error instanceof Error) {
        return '发生错误，错误信息:' + err.error.message;
    } else {
        console.log(`Backend returned code ${err.status}, body was: ${err.error.msg}`);
        return err.error.msg;
    }
  }

  login(userInfo: UserInfo) {
    return this.http.post('http://localhost:3000/immediate-communication/login', userInfo, {
            headers: this.httpOptions.headers,
            observe: 'response',
            responseType: 'text'
        });
  }

  register(userInfo: UserInfo) {
    return this.http.post('http://localhost:3000/immediate-communication/register', userInfo, {
      headers: this.httpOptions.headers,
      observe: 'response',
      responseType: 'text'        // 当使用json以外的类型作为回复时，需要设置回复类型
    });
  }

  sendMessage(msgInfo) {
    return this.http.post('http://localhost:3000/immediate-communication/sendMessage', msgInfo, {
      headers: this.httpOptions.headers,
      observe: 'response',
      responseType: 'text'
    });
  }

  // 获取消息列表
  getMessageList(msgInfo) {   // get请求需指定返回类型，否则会返回Observable<object>
    return this.http.get<any>(`http://localhost:3000/immediate-communication/getMessage?user=${msgInfo.userName}&to=${msgInfo.aimUser}`, {
      headers: this.httpOptions.headers,
      observe: 'body',
    });
  }

  getFriendList(userInfo) {
    return this.http.get<any>(`http://localhost:3000/immediate-communication/getFriendList?userName=${userInfo.userName}`, {
      headers: this.httpOptions.headers,
      observe: 'body',
    });
  }

  // 验证添加好友时搜索的用户名是否正确
  validateSearchInfo(searchInfo) {
    return this.http.get<any>(`http://localhost:3000/immediate-communication/validateSearchInfo?searchInfo=${searchInfo}`, {
      headers: this.httpOptions.headers,
      observe: 'body',
    });
  }

  addFriend(addInfo) {
    return this.http.post(`http://localhost:3000/immediate-communication/addFriend`, addInfo, {
      headers: this.httpOptions.headers,
      observe: 'response',
      responseType: 'text'
    });
  }
}
