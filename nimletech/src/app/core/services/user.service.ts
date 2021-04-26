
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { ApiResponse } from '../models/apiresponse';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    // this.auth.resetToken();
  }

  getMe(): any {
    return this.http.get(`${environment.urls.api}/me`);
  }

  addRegistration(registration): any {
    return this.http.post(`${environment.urls.api}/user`, registration);
  }

  login(login): Observable<ApiResponse> {
    const options = {
      headers: new HttpHeaders({
        accept: 'application/json'
      })
    };

    return this.http.post<ApiResponse>(`${environment.urls.api}/authentication/login`, login, options).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  register(user): Observable<ApiResponse> {
    const options = {
      headers: new HttpHeaders({
        accept: 'application/json'
      })
    };

    return this.http.post<ApiResponse>(`${environment.urls.api}/user/signup`, user, options).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  // tslint:disable-next-line:typedef
  protected handleError(error: any) {
    const response = error.error as ApiResponse;
    if (response.status) {
      return throwError((error.error as ApiResponse) || error.message);
    } else {
      return throwError(error);
    }
  }

}
