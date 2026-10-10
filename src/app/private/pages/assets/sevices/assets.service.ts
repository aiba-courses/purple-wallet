import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of, tap } from 'rxjs';
import { FAKE_ASSETS } from '../../../../shared/const/fake-assets.const';
import { IAssetModel } from '../models/asset.model';
import { StoreService } from '../../../../shared/services/store.service';
import { HttpClient } from '@angular/common/http';
import { IHTTPResponseModel } from '../../../../shared/models/http-response.model';

@Injectable()
export class AssetsService {
  private _httpClient = inject(HttpClient);
  private _store: StoreService = inject(StoreService);

  readonly assets$: Observable<IAssetModel[]> = this._store.getValueAsync('assets');

  constructor() {
    this._updateAssets$().subscribe();
  }

  private _updateAssets$(): Observable<void> {
    return this._httpClient.get<IHTTPResponseModel<IAssetModel[]>>('http://localhost:3000/api/v1/assets').pipe(
      tap(response => this._store.setValue('assets', response.data)),
      map(() => undefined)
    );
    // return of(0).pipe(
    //   delay(1000),
    //   tap(() => this._store.setValue('assets', FAKE_ASSETS)),
    //   map(() => void 0)
    // );
  }
}
