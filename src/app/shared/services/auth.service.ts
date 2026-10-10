import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
  take,
  tap,
} from 'rxjs';
import { AuthStoreService } from './authStore.service';

export interface IAppAuthResponse {
  token: string | null;
  tokenType: 'Bearer' | null;
  expiresIn: 'string' | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _httpClient = inject(HttpClient);
  private _authStoreService = inject(AuthStoreService);

  public isAuthenticated$ = new BehaviorSubject<boolean>(false);

  login$(email: string, password: string): Observable<boolean> {
    return this._httpClient
      .post<IAppAuthResponse>('http://localhost:3000/api/v1/auth/login', {
        email,
        password,
      })
      .pipe(
        tap(response => {
          if (response != null) {
            this._updateAuthData(response);
          }
        }),
        map(response => {
          return response.token != null;
        }),
        catchError(() => {
          return EMPTY;
        })
      );
  }

  logout$(): Observable<boolean> {
    this._updateAuthData(null);
    return this.isAuthenticated$.asObservable().pipe(take(1));
  }

  private _updateAuthData(data: IAppAuthResponse | null): void {
    if (data == null) {
      this._authStoreService.setValue('token', null);
      this._authStoreService.setValue('tokenType', null);
      this._authStoreService.setValue('expiresIn', null);

      this.isAuthenticated$.next(false);
      return;
    }

    this._authStoreService.setValue('token', data.token);
    this._authStoreService.setValue('tokenType', data.tokenType);
    this._authStoreService.setValue('expiresIn', data.expiresIn);

    this.isAuthenticated$.next(true);
  }
}
