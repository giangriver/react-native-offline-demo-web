import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Login } from '../../shared/models/login';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('vendorAnimation', [
      state('fadeOut', style({
        display: 'none',
      })),
      state('fadeIn', style({
        display: 'block',
      })),

      transition('* => fadeIn', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition('* => fadeOut', [
        animate(0, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  @Input() fading = 'fadeIn';
  // locals
  public loginForm: FormGroup;
  public message: string = null;
  public login: Login = new Login();

  // local subscriptions
  private subLogin: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) { }

  // validators
  public username = new FormControl('', [Validators.required, Validators.minLength(5)]);
  public password = new FormControl('', [Validators.required]);

  ngOnInit(): any {
    this.loginForm = this.formBuilder.group({ });
    this.loginForm.addControl('username', this.username);
    this.loginForm.addControl('password', this.password);
  }

  ngOnDestroy(): any {
    if (this.subLogin != null) { this.subLogin.unsubscribe(); }
  }

  reset(): any {}

  submit(): any {
    this.login.email_address = this.login.username;
    this.subLogin = this.userService.login(this.login).subscribe((res: any) => {

      if (!res.success) {
        this.message = res.errorMessage;
      } else {
        console.log(res.value);
        // console.log('res.value.expiryDate:' + res.value.expiryDate);
        this.authService.setUser(res.value, res.value.token, res.value.expiryDate);
      }
    }, error => {
      console.log(JSON.stringify(error));
      alert(JSON.stringify(error));
    });

  }

  onCancel(): any {}

  onRegister(): any {}

  onChangedUserName(event): any { this.message = null; }
  onChangedPass(event): any { this.message = null; }
}
