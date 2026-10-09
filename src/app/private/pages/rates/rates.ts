import { Component } from '@angular/core';
import { IRateModel } from './models/rate.model';
import { FAKE_RATES } from '../../../shared/const/fake-rates.const';
import { Rate } from './components/rate/rate';

@Component({
  imports: [Rate],
  selector: 'app-rates',
  styleUrl: './rates.scss',
  templateUrl: './rates.html',
})
export class Rates {
  rates: IRateModel[] = FAKE_RATES;
}
