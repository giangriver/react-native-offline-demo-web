import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ApiResponse } from 'src/app/core/models/apiresponse';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  isResetCompleted = false;
  registerError: string;
  opened = false;
  public user: User = new User();

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  async onRegister(event: any) {
    this.isLoading = true;
    this.registerError = '';
    this.user = {
      username: event.username,
      password: event.password,
      email_address: event.emailAddress,
      _id: null,
      photo: null,
      phone_number: null
    };
    this.userService.register(this.user)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: res => {
          if (res.status === 'success') {
            this.open();
          }
          else {
            this.handleError(res);
          }
        },
        error: err => {
          this.handleError(err);
        },
        complete: () => { }
      });
  }

  onBackToLoginPage(): void {
    this.router.navigate(['login'], { replaceUrl: true });
  }

  close(status): any {
    this.opened = false;
    this.router.navigate(['/login'], {
      replaceUrl: true
    });
  }

  open(): any {
    this.opened = true;
  }

  handleError(error: ApiResponse): void {
    this.isLoading = false;
    if (error.violations) {
      let message = '';
      for (const violation of (error as ApiResponse).violations || []) {
        message += violation.message + ' ';
      }
      this.registerError = message;
    } else {
      this.registerError = error.message;
    }
  }
}
