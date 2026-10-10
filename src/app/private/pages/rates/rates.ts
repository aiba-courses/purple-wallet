import {
  Component,
  computed,
  inject,
  Injector,
  OnInit,
  Signal,
} from '@angular/core';
import { IRateModel } from './models/rate.model';
import { Rate } from './components/rate/rate';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RatesService } from './service/rates.service';
import { StoreService } from '../../../shared/services/store.service';
import { FAKE_RATES } from '../../../shared/const/fake-rates.const';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [Rate],
  selector: 'app-rates',
  styleUrl: './rates.scss',
  templateUrl: './rates.html',
  providers: [RatesService],
})
class Rates implements OnInit {
  private _injector = inject(Injector);
  private _activatedRoute = inject(ActivatedRoute);
  private _store = inject(StoreService);

  searchQuery = toSignal(
    this._activatedRoute.queryParamMap.pipe(
      map(params => (params.get('q') ?? '').trim().toLowerCase())
    ),
    {
      initialValue: '',
    }
  );

  filterRates = computed(() => {
    const query = this.searchQuery();
    const list = this.rates();

    if (!query) {
      return list;
    }

    return list?.filter(
      rate =>
        rate.assetId.toLowerCase().includes(query.toLowerCase()) ||
        rate.assetName.toLowerCase().includes(query.toLowerCase())
    );
  });

  // rates = toSignal(this._store.getValueAsync('rates'), { initialValue: [] });

  ngOnInit() {
    this._store.setValue('rates', FAKE_RATES);
  }

  private _ratesService = inject(RatesService);
  rates: Signal<IRateModel[] | undefined> = toSignal(this._ratesService.filteredRates$);
}

export default Rates;
