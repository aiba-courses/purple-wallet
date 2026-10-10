import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { IRateModel } from '../models/rate.model';
import { FAKE_RATES } from '../../../../shared/const/fake-rates.const';
import { StoreService } from '../../../../shared/services/store.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagedResponseModel } from '../../../../shared/models/paged-response.model';
import { logger } from 'prettier-eslint';

@Injectable()
export class RatesService {
  private _httpClient = inject(HttpClient);

  private _store = inject(StoreService);
  private readonly _ratesSubject = new BehaviorSubject<IRateModel[]>([]);

  readonly rates$: Observable<IRateModel[]> = this._store.getValueAsync('rates').pipe();
  readonly popularRates$: Observable<IRateModel[]> = this._store.getValueAsync('rates').pipe(
    map(rates => rates.slice(0, 4))
  );

  readonly searchForm$: Observable<string> =
    this._store.getFormValueAsync('search');

  readonly filteredRates$: Observable<IRateModel[]> = combineLatest([
    this.rates$,
    this.searchForm$,
  ]).pipe(
    map(([rates, formValue]) =>
      rates.filter(rate =>
        rate.assetName.toLowerCase().includes(formValue.toLowerCase())
      )
    )
  );

  constructor() {
    this._updateRates$().subscribe();
  }

  private _updateRates$(): Observable<void> {
    const params = new HttpParams().set('page', 1).set('limit', 20);

    return this._httpClient
      .get<IPagedResponseModel<IRateModel[]>>(
        'http://localhost:3000/api/v1/rates',
        { params }
      )
      .pipe(
        tap(response => this._store.setValue('rates', response.data)),
        map(() => void 0)
      );
  }
}
