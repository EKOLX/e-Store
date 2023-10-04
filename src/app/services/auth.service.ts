import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

import User from '../models/User';
import Auth from '../models/Auth';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://fakestoreapi.com/auth/login';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<Auth> {
    return this.http.post<Auth>(this.url, user).pipe(
      tap((data) => this.setToken(data)),
      catchError(
        this.handleError('login', 'Something went wrong. Please, try again..')
      )
    );
  }

  logout() {
    this.setToken(null);
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN);
  }

  private setToken(auth: Auth | null) {
    if (auth) {
      localStorage.setItem(TOKEN, auth.token);
    } else {
      localStorage.removeItem(TOKEN);
    }
  }

  private handleError(operation: string, message: string): any {
    return (error: any) => {
      console.error(operation, error); // TODO: use logging service
      throw new Error(message);
    };
  }
}