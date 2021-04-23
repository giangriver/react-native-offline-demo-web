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

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent implements OnInit, OnDestroy {
  @Output() submitEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() backToLoginEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() resetPasswordError: string;
  @Input() isResetCompleted = false;

  resetPasswordForm!: FormGroup;
  showClearEmail = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {}

  async onResetPassword(): Promise<any> {
    this.submitEvent.emit(this.resetPasswordForm.controls[emailKey].value);
  }

  getEmailErrorMessage(): string {
    if (this.resetPasswordForm.controls[emailKey].hasError('required')) {
      return 'Email is required';
    }
    if (this.resetPasswordForm.controls[emailKey].hasError('email')) {
      return 'Email is not valid';
    }

    return 'Username is not valid';
  }

  onEmailChange(): void {
    this.resetPasswordError = null;
    const emailAddress = this.resetPasswordForm.controls[emailKey].value;
    if (!emailAddress || emailAddress.length === 0) {
      this.showClearEmail = false;
    } else {
      this.showClearEmail = true;
    }
  }

  clearEmail(): void {
    this.resetPasswordError = null;
    this.resetPasswordForm.controls[emailKey].setValue(undefined);
    this.showClearEmail = false;
  }

  onBackToLoginPage(): void {
    this.backToLoginEvent.emit(true);
  }

  private createForm(): void {
    this.resetPasswordForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
