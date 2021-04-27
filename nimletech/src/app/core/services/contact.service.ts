import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/apiresponse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getContacts(): Observable<ApiResponse> {
    const options = {
      headers: new HttpHeaders({
        accept: 'application/json',
        token: this.auth.getToken()
      })
    };

    return this.http.get<ApiResponse>(`${environment.urls.api}/contact`, options).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  getContact(id): Observable<ApiResponse> {
    const options = {
      headers: new HttpHeaders({
        accept: 'application/json',
        token: this.auth.getToken()
      })
    };

    return this.http.get<ApiResponse>(`${environment.urls.api}/contact/` + id, options).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  updateContact(id, data): Observable<ApiResponse> {
    const options = {
      headers: new HttpHeaders({
        accept: 'application/json',
        token: this.auth.getToken()
      })
    };

    return this.http.put<ApiResponse>(`${environment.urls.api}/contact/update/` + id, data, options).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  createContact(data): Observable<ApiResponse> {
    const options = {
      headers: new HttpHeaders({
        accept: 'application/json',
        token: this.auth.getToken()
      })
    };

    return this.http.post<ApiResponse>(`${environment.urls.api}/contact/add`, data, options).pipe(
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
