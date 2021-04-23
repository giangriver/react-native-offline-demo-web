import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenTimer: any;
  // public variables
  public currentUser: User = new User();

  constructor(
    public router: Router,
    private http: HttpClient
    ) {}

  public setUser(data: any): any {
    // set new user
    this.currentUser.username = data.username;
    this.currentUser.email_address = data.email_address;

    // Set the time that the access token will expire at
    // const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    // set token data
    localStorage.setItem('access_token', data.token);
    localStorage.setItem('expires_at', data.expiryDate.toString());

    // save
    localStorage.setItem('current_user', JSON.stringify(this.currentUser));
  }

  public setOnlyCurrentUser(user: User): any {

    // set new user
    this.currentUser.username = user.username;
    this.currentUser.email_address = user.email_address;
    this.currentUser.phone_number = user.phone_number;
    this.currentUser.photo = user.photo;

    // Set the time that the access token will expire at
    // const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    // save
    localStorage.setItem('current_user', JSON.stringify(this.currentUser));
  }

  public getToken(): any {
    return localStorage.getItem('access_token');
  }

  public resetData(): any {

    // check for authentication
    if (this.isAuthenticated()) {

      // get current user
      this.currentUser = !localStorage.getItem('access_token') ? new User() :
          JSON.parse(localStorage.getItem('current_user')) ?
          JSON.parse(localStorage.getItem('current_user')) : new User();
    } else {
      this.currentUser = new User();
    }
    // console.log(this.currentUser);

  }

  public logout(): void {

    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('current_user');

    // reset user
    this.currentUser = new User();

    // Go back to the home route
    this.router.navigate(['/']);
  }


  public isLoggedIn(): boolean {
    if (!this.currentUser.username) {
      return false;
    } else {
      return true;
    }
  }

  public isAuthenticated(): boolean {
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const dateNow = new Date().getTime() / 1000;
    // Check whether the current time is past the
    return dateNow < expiresAt;
  }

  public resetToken(): any {

    // check access token
    if (localStorage.getItem('access_token')) {
      // console.log('Refreshing Token');
      // retrieve new token
      try {
        const options = {
          headers: new HttpHeaders({
            accept: 'application/json',
            token: localStorage.getItem('access_token')
          })
        };
        this.http.get(`${environment.urls.api}/authentication/refresh`, options).subscribe((res: any) => {
          // console.log(res);

          // check for valid token
          if (res) {
            // set token
            localStorage.setItem('access_token', res.value.token);
          } else {
            this.logout();
          }
        });
        } catch (error) {
          this.logout();
        }
    } else {
      // console.log('Ignore Token Refresh');
    }

  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  autoAuthUser(): any {
    const authInformation = this.getAuthData();
    if (!authInformation)    {
      return;
    }

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    // console.log('expiresIn:' + JSON.stringify( expiresIn));
    if (expiresIn > 0) {
      this.setAuthTimer(expiresIn / 1000);
    } else {
      this.logout();
    }
  }

  private getAuthData(): any {
    const token = localStorage.getItem('access_token');
    const expirationDate: any = localStorage.getItem('expires_at');
    // tslint:disable-next-line:variable-name
    const current_user = localStorage.getItem('current_user');
    if ( !token || ! expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date( expirationDate * 1000),
      current_user
    };
  }
  private setAuthTimer(duration: number): any {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
