import { IAppProfieStore, ProfileStoreService } from './profile-store.service';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUserModel } from '../const/fake-profile.const';

@Injectable()
export class ProfileService {
  private _httpClient: HttpClient = inject(HttpClient);

  private _store: ProfileStoreService = inject(ProfileStoreService);
  readonly profile$: Observable<IAppProfieStore> = this._store.getValueAsync();

  constructor() {
    this._updateProfile$().subscribe();
  }

  private _updateProfile$(): Observable<void> {
    return this._httpClient
      .get<IUserModel>('http://localhost:3000/api/v1/profile')
      .pipe(
        tap(response => this._store.setValue(response)),
        map(() => void 0)
      );
  }
}
