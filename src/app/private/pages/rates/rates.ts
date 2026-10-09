import {
  Component,
  computed,
  effect,
  inject,
  Injector,
  OnInit,
  signal,
} from '@angular/core';
import { IRateModel } from './models/rate.model';
import { Rate } from './components/rate/rate';
import { FAKE_RATES } from '../../../shared/const/fake-rates.const';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  imports: [Rate],
  selector: 'app-rates',
  styleUrl: './rates.scss',
  templateUrl: './rates.html',
})
class Rates implements OnInit {
  private _injector = inject(Injector);
  private _activatedRoute = inject(ActivatedRoute);

  searchQuery = toSignal(
    this._activatedRoute.queryParamMap.pipe(
      map(params => (params.get('q') ?? '').trim().toLowerCase())
    ),
    {
      initialValue: ''
    }
  );

  filterRates = computed(() => {
    const query = this.searchQuery();
    const list = this.rates();

    if (!query) {
      return list;
    }

    return list.filter(
      rate => rate.assetId.toLowerCase().includes(query.toLowerCase())
        || rate.assetName.toLowerCase().includes(query.toLowerCase())
    );
  });

  // rates: IRateModel[] = FAKE_RATES;
  rates = signal<IRateModel[]>([]);

  ngOnInit() {
    setTimeout( () => {
      this.rates.update(v => [...v, ...FAKE_RATES]);
    }, 1000);
  }

  private _log() {
    effect(
      () => {
        console.log('Rates updated:', this.rates());
      },
      { injector: this._injector }
    );
  }
}

export default Rates;
