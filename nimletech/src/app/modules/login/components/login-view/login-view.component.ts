import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const passwordKey = 'password';
const userNameKey = 'username';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  @Output() submitEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() registerEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() loginError: string;

  loginForm!: FormGroup;
  hidePassword = true;
  showClearUserName = false;
  showClearPassword = false;

  constructor(private formBuilder: FormBuilder) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.createForm();
  }

  // tslint:disable-next-line:typedef
  async login() {
    this.submitEvent.emit(this.loginForm.value);
  }

  // tslint:disable-next-line:typedef
  getUserNameErrorMessage() {
    if (this.loginForm.controls[userNameKey].hasError('required')) {
      return 'Username is required';
    }
    return 'Username is not valid';
  }

  // tslint:disable-next-line:typedef
  getPasswordErrorMessage() {
    if (this.loginForm.controls[passwordKey].hasError('required')) {
      return 'Password is required';
    }
    return 'Password is not valid';
  }

  // tslint:disable-next-line:typedef
  onUserNameChange() {
    this.loginError = '';
    const username = this.loginForm.controls[userNameKey].value;
    if (!username || username.length === 0) {
      this.showClearUserName = false;
    } else {
      this.showClearUserName = true;
    }
  }
  // tslint:disable-next-line:typedef
  clearUserName() {
    this.loginError = '';
    this.loginForm.controls[userNameKey].setValue(undefined);
    this.showClearUserName = false;
  }

  // tslint:disable-next-line:typedef
  onPasswordChange() {
    this.loginError = '';
    const password = this.loginForm.controls[passwordKey].value;
    if (!password || password.length === 0) {
      this.showClearPassword = false;
    } else {
      this.showClearPassword = true;
    }
  }

  // tslint:disable-next-line:typedef
  clearPassword() {
    this.loginError = '';
    this.loginForm.controls[passwordKey].setValue(undefined);
    this.showClearPassword = false;
  }

  // tslint:disable-next-line:typedef
  onRegister() {
    this.registerEvent.emit(true);
  }

  // tslint:disable-next-line:typedef
  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: true
    });
  }
}
