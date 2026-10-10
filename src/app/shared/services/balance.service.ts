import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BalanceStoreService, IAppBalanceStore } from './balance-store.service';

@Injectable()
export class BalanceService {
  private _httpClient: HttpClient = inject(HttpClient);

  private _store: BalanceStoreService = inject(BalanceStoreService);
  readonly balance$: Observable<IAppBalanceStore> = this._store.getValueAsync();

  constructor() {
    this._updateData$().subscribe();
  }

  private _updateData$(): Observable<void> {
    return this._httpClient
      .get<IAppBalanceStore>('http://localhost:3000/api/v1/balance')
      .pipe(
        tap(response => this._store.setValue(response)),
        map(() => void 0)
      );
  }
}
