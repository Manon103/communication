import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInfoService } from '../service/user-info.service';
import { Router } from '@angular/router';

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
  ) {

  }
  // url = '/client/src/assets/imgs/header.jpg';
  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberOrNot: new FormControl(''),
    });
    // this.el.nativeElement.querySelector('.container-fluid').style.height = document.documentElement.clientHeight + 'px';
  }

  login() {

    // 需要订阅才成成功的发送post请求
    this.userInfoService.login(this.loginForm.value).subscribe(
      res => {
        sessionStorage.setItem('userName', this.loginForm.controls.userName.value);
        this.route.navigate(['/communication']);
        alert('登陆成功');
      },
      err => {
        if (err.status === 401) {
          alert('密码错误！');
        }
        this.userInfoService.handleError(err);
      }
    );
  }
}

