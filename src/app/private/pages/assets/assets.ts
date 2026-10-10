import { Component, inject } from '@angular/core';
import { Asset } from './components/asset/asset';
import { toSignal } from '@angular/core/rxjs-interop';
import { AssetsService } from './sevices/assets.service';

@Component({
  imports: [Asset],
  selector: 'app-assets',
  styleUrl: './assets.scss',
  templateUrl: './assets.html',
  providers: [AssetsService]
})
export class Assets {
  private _assetsService = inject(AssetsService);

  assetsSignal = toSignal(this._assetsService.assets$, {
    initialValue: [],
  });
}
