import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInfoService } from '../service/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private el: ElementRef,
    private userInfoService: UserInfoService,
    private route: Router,
  ) { }

  registerForm: FormGroup;

  ngOnInit() {

    this.registerForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      userName: new FormControl('', Validators.required)
    });
  }

  register() {
    this.userInfoService.register(this.registerForm.value).subscribe(
      res => {
        alert('注册成功，即将转去登录');
        this.route.navigate(['/login']);
      },
      err => {
        this.userInfoService.handleError(err);
      }
    );
  }
}
