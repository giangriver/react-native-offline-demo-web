import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const emailKey = 'emailAddress';
const passwordKey = 'password';
const userNameKey = 'username';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent implements OnInit, OnDestroy {
  @Output() backToLoginEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitEvent: EventEmitter<any> = new EventEmitter<any>();
  registerError: string;
  isResetCompleted = false;

  registerForm!: FormGroup;
  showClearEmail = false;
  loginError: string;
  showClearUserName = false;
  showClearPassword = false;
  hidePassword = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {}

  async onRegister(): Promise<any> {
    this.submitEvent.emit(this.registerForm.value);
  }

  getEmailErrorMessage(): string {
    if (this.registerForm.controls[emailKey].hasError('required')) {
      return 'Email is required';
    }
    if (this.registerForm.controls[emailKey].hasError('email')) {
      return 'Email is not valid';
    }

    return 'Username is not valid';
  }

  getUserNameErrMessage(): string {
    if (this.registerForm.controls[userNameKey].hasError('required')) {
      return 'Username is required';
    }
    return 'Username is not valid';
  }

  getPasswordErrorMessage(): string {
    if (this.registerForm.controls[passwordKey].hasError('required')) {
      return 'Password is required';
    }
    return 'Password is not valid';
  }

  onEmailChange(): void {
    this.registerError = null;
    const emailAddress = this.registerForm.controls[emailKey].value;
    if (!emailAddress || emailAddress.length === 0) {
      this.showClearEmail = false;
    } else {
      this.showClearEmail = true;
    }
  }

  clearEmail(): void {
    this.registerError = null;
    this.registerForm.controls[emailKey].setValue(undefined);
    this.showClearEmail = false;
  }

  onBackToLoginPage(): void {
    this.backToLoginEvent.emit(true);
  }

  // tslint:disable-next-line:typedef
  onUserNameChange() {
    this.loginError = '';
    const username = this.registerForm.controls.username.value;
    if (!username || username.length === 0) {
      this.showClearUserName = false;
    } else {
      this.showClearUserName = true;
    }
  }
  // tslint:disable-next-line:typedef
  clearUserName() {
    this.loginError = '';
    this.registerForm.controls.username.setValue(undefined);
    this.showClearUserName = false;
  }

  // tslint:disable-next-line:typedef
  onPasswordChange() {
    this.loginError = '';
    const password = this.registerForm.controls.password.value;
    if (!password || password.length === 0) {
      this.showClearPassword = false;
    } else {
      this.showClearPassword = true;
    }
  }

  // tslint:disable-next-line:typedef
  clearPassword() {
    this.loginError = '';
    this.registerForm.controls.password.setValue(undefined);
    this.showClearPassword = false;
  }

  private createForm(): void {
    this.registerForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
