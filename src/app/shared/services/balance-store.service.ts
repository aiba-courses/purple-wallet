import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IAppBalanceStore {
  amount: number | null;
  currency: string | null;
}

const STORE_INITIAL_STATE: IAppBalanceStore = {
  amount: null,
  currency: null,
};

@Injectable({ providedIn: 'root' })
export class BalanceStoreService {
  private readonly _dataSubject = new BehaviorSubject<IAppBalanceStore>({
    ...STORE_INITIAL_STATE,
  });

  public getValue(): IAppBalanceStore {
    return this._dataSubject.getValue();
  }

  public reset(): void {
    return this._dataSubject.next({ ...STORE_INITIAL_STATE });
  }

  public getValueAsync(): Observable<IAppBalanceStore> {
    return this._dataSubject.asObservable();
  }

  public setValue(value: IAppBalanceStore): void {
    this._dataSubject.next({
      ...this._dataSubject.getValue(),
      ...value,
    });
  }
}
