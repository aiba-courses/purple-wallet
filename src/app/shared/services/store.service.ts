import { IRateModel } from '../../private/pages/rates/models/rate.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IAssetModel } from '../../private/pages/assets/models/asset.model';
import { FAKE_ASSETS } from '../const/fake-assets.const';

export interface IAppStore {
  rates: IRateModel[];
  assets: IAssetModel[];
  form: {
    search: string;
  }
}

const STORE_INITIAL_STATE: IAppStore = {
  rates: [],
  assets: FAKE_ASSETS,
  form: {
    search: '',
  }
};

@Injectable({ providedIn: 'root' })
export class StoreService {
  private readonly _storeSubject = new BehaviorSubject<IAppStore>({
    ...STORE_INITIAL_STATE,
  });

  public getValue<K extends keyof IAppStore>(key: K): IAppStore[K] {
    return this._storeSubject.getValue()[key];
  }

  public getValueAsync<K extends keyof IAppStore>(
    key: K
  ): Observable<IAppStore[K]> {
    return this._storeSubject.asObservable().pipe(map(state => state[key]));
  }

  public getFormValueAsync<K extends keyof IAppStore['form']>(
    key: K
  ): Observable<IAppStore['form'][K]> {
    return this._storeSubject.asObservable().pipe(map(state => state.form[key]));
  }

  public setValue<K extends keyof IAppStore>(
    key: K,
    value: IAppStore[K]
  ): void {
    this._storeSubject.next({
      ...this._storeSubject.getValue(),
      [key]: value,
    });
  }

  public setFormValue<K extends keyof IAppStore['form']>(
    key: K,
    value: IAppStore['form'][K]
  ): void {
    this._storeSubject.next({
      ...this._storeSubject.getValue(),
      form: {
        ...this._storeSubject.getValue().form,
        [key]: value,
      },
    });
  }
}
