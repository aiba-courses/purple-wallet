import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface IAppAuthStore {
  token: string | null
  tokenType: string | null
  expiresIn: string | null
}

const STORE_INITIAL_STATE: IAppAuthStore = {
  token: null,
  tokenType: null,
  expiresIn: null,
};

@Injectable({ providedIn: 'root' })
export class AuthStoreService {
  private readonly _dataSubject = new BehaviorSubject<IAppAuthStore>({
    ...STORE_INITIAL_STATE,
  });

  public getValue<K extends keyof IAppAuthStore>(key: K): IAppAuthStore[K] {
    return this._dataSubject.getValue()[key];
  }

  public getValueAsync<K extends keyof IAppAuthStore>(
    key: K
  ): Observable<IAppAuthStore[K]> {
    return this._dataSubject.asObservable().pipe(map(state => state[key]));
  }

  public setValue<K extends keyof IAppAuthStore>(
    key: K,
    value: IAppAuthStore[K]
  ): void {
    this._dataSubject.next({
      ...this._dataSubject.getValue(),
      [key]: value,
    });
  }
}
