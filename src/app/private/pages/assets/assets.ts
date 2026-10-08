import { Component } from '@angular/core';
import { IAssetModel } from './models/asset.model';
import { FAKE_ASSETS } from '../../../shared/const/fake-assets.const';
import { JsonPipe } from '@angular/common';
import { Asset } from './components/asset/asset';

@Component({
  imports: [JsonPipe, Asset],
  selector: 'app-assets',
  styleUrl: './assets.scss',
  templateUrl: './assets.html',
})
export class Assets {
  assets: IAssetModel[] = FAKE_ASSETS;
}
