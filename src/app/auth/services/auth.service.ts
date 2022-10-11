import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;

  private _auth: Auth | undefined;

  get auth() {
    return { ...this._auth };
  }

  constructor(
    private http: HttpClient
  ) { }

  authState(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<Auth>(`${this._baseUrl}/users/1`)
      .pipe(
        map(auth => {
          this._auth = auth;
          return true;
        })
      );
  }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this._baseUrl}/users/1`)
      .pipe(
        tap(auth => this._auth = auth),
        tap(auth => localStorage.setItem('token', auth.id))
      );
  }

  logout(): void {
    this._auth = undefined;
    localStorage.removeItem('token');
  }
}
