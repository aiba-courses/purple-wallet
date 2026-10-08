import { Component, Input } from '@angular/core';
import { IAssetModel } from '../../models/asset.model';
import { NgClass, NgOptimizedImage, UpperCasePipe } from '@angular/common';

@Component({
  imports: [NgOptimizedImage, NgClass, UpperCasePipe],
  selector: 'app-asset',
  styleUrl: './asset.scss',
  templateUrl: './asset.html',
})
export class Asset {
  @Input()
  data: IAssetModel | null = null;
}
