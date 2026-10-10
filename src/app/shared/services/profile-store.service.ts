import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IAppProfieStore {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  gender: 'male' | 'female' | null;
  avatar: string | null;
}

const STORE_INITIAL_STATE: IAppProfieStore = {
  id: null,
  firstName: null,
  lastName: null,
  gender: null,
  avatar: null,
};

@Injectable({ providedIn: 'root' })
export class ProfileStoreService {
  private readonly _dataSubject = new BehaviorSubject<IAppProfieStore>({
    ...STORE_INITIAL_STATE,
  });

  public getValue(): IAppProfieStore {
    return this._dataSubject.getValue();
  }

  public reset(): void {
    return this._dataSubject.next({ ...STORE_INITIAL_STATE });
  }

  public getValueAsync(): Observable<IAppProfieStore> {
    return this._dataSubject.asObservable();
  }

  public setValue(value: IAppProfieStore): void {
    this._dataSubject.next({
      ...this._dataSubject.getValue(),
      ...value,
    });
  }
}
