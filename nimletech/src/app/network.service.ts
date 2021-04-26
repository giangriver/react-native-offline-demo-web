import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Contact } from './models/Contact';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
	private contactUrl = 'https://maritimedemo.herokuapp.com/demo/api/v1.0/contact';  // URL to web api
	httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTg4ODU3NTAsImV4cGlyZXNJbiI6NDMyMCwiaXAiOiI6OjEiLCJlbWFpbF9hZGRyZXNzIjoidHVvbmdtYXJ0aW4xMkB5b3BtYWlsLmNvbSIsInVzZXJuYW1lIjoid3d3In0.51aBVVpHZQssHlXQ7kPAQCRP6QlEAGRXNHjm5ykJlGQ'})
	};

	constructor(private http: HttpClient) { }

	getContacts(): Observable<Contact[]> {
	    return this.http.get<Contact[]>(this.contactUrl, this.httpOptions)
	      .pipe(
	        catchError(this.handleError<Contact[]>('getContacts', []))
	    );
    }

    private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
