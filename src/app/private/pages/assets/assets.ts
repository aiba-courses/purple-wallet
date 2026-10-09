import { Component, Signal } from '@angular/core';
import { IAssetModel } from './models/asset.model';
import { FAKE_ASSETS } from '../../../shared/const/fake-assets.const';
import { JsonPipe } from '@angular/common';
import { Asset } from './components/asset/asset';
import { delay, Observable, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [JsonPipe, Asset],
  selector: 'app-assets',
  styleUrl: './assets.scss',
  templateUrl: './assets.html',
})
export class Assets {
  assets$: Observable<IAssetModel[]> = of(FAKE_ASSETS).pipe(delay(1000));

  assetsSignal: Signal<IAssetModel[]> = toSignal(this.assets$, { initialValue: [] });
}
