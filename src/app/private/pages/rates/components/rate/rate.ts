import { Component, input } from '@angular/core';
import { IRateModel } from '../../models/rate.model';
import {
  JsonPipe,
  NgClass,
  NgOptimizedImage,
  PercentPipe,
} from '@angular/common';

@Component({
  imports: [NgOptimizedImage, PercentPipe, NgClass],
  selector: 'app-rate',
  styleUrl: './rate.scss',
  templateUrl: './rate.html',
})
export class Rate {
  data = input<IRateModel>();
}
