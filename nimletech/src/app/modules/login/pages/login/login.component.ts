import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ApiResponse } from 'src/app/core/models/apiresponse';
import { Login } from 'src/app/core/models/login';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginError: string;
  isLoading = false;
  public acclogin: Login = new Login();
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {}

  // tslint:disable-next-line:typedef
  ngOnDestroy() {}

  // tslint:disable-next-line:typedef
  async login(event: any) {
    this.isLoading = true;
    this.loginError = '';
    this.acclogin = {
      username: event.username,
      password: event.password,
      email_address: event.username
    }
    this.userService.login(this.acclogin)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: res => {
          if (res.status === 'success') {
            this.authService.setUser(res.responseData);
            this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], {
              replaceUrl: true
            });
          }
          else {
            this.handleError(res);
          }
        },
        error: err => {
          this.handleError(err);
        },
        complete: () => {}
      });
  }

  // tslint:disable-next-line:typedef
  onRegister() {
    this.router.navigate(['register'], { replaceUrl: true });
  }

  handleError(error: ApiResponse): void {
    this.isLoading = false;
    if (error.violations) {
      let message = '';
      for (const violation of (error as ApiResponse).violations || []) {
        message += violation.message + ' ';
      }
      this.loginError = message;
    } else {
      this.loginError = error.message;
    }
  }
}
