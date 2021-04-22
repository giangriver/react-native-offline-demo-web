
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.auth.resetToken();
  }

  getMe(): any {
    return this.http.get(`${environment.urls.api}/me`);
  }

  addRegistration(registration): any {
    return this.http.post(`${environment.urls.api}/user`, registration);
  }

  login(login): any {
    return this.http.post(`${environment.urls.api}/authenticate`, login);
  }

}
