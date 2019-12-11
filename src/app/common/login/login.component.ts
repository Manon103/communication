import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInfoService } from '../service/user-info.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private fb: FormBuilder,
    private userInfoService: UserInfoService,
    private route: Router,
    private messageService: MessageService,
  ) {

  }
  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberOrNot: new FormControl(''),
    });
  }

  login() {

    // 需要订阅才成成功的发送post请求
    this.userInfoService.login(this.loginForm.value).subscribe(
      res => {
        sessionStorage.setItem('userName', this.loginForm.controls.userName.value);
        this.messageService.add({ severity: 'success', summary: 'success', detail: '登录成功！' });
        this.route.navigate(['/communication']);
      },
      err => {
        if (err.status === 401) {
          this.messageService.add({ severity: 'error', summary: 'error', detail: '密码错误' });
        }
        this.userInfoService.handleError(err);
      }
    );
  }
}

