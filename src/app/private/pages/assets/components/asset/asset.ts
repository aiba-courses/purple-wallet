import { Component, Input } from '@angular/core';
import { IAssetModel } from '../../models/asset.model';
import {
  CurrencyPipe,
  DecimalPipe,
  NgClass,
  NgOptimizedImage,
  PercentPipe,
  UpperCasePipe,
} from '@angular/common';
import { LegacyUppercasePipe } from '../../../../../shared/pipes/legacy-uppercase.pipe';

@Component({
  imports: [
    NgOptimizedImage,
    NgClass,
    UpperCasePipe,
    CurrencyPipe,
    PercentPipe,
    DecimalPipe,
    LegacyUppercasePipe,
  ],
  selector: 'app-asset',
  styleUrl: './asset.scss',
  templateUrl: './asset.html',
})
export class Asset {
  @Input()
  data: IAssetModel | null = null;
}
