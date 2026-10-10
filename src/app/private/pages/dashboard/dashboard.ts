import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RatesService } from '../rates/service/rates.service';
import { Rate } from '../rates/components/rate/rate';
import { AssetsService } from '../assets/sevices/assets.service';
import { Asset } from '../assets/components/asset/asset';
import { BalanceService } from '../../../shared/services/balance.service';
import { DecimalPipe } from '@angular/common';
import { ProfileStoreService } from '../../../shared/services/profile-store.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
  imports: [Rate, Asset, DecimalPipe],
  providers: [RatesService, AssetsService, BalanceService],
})
export class Dashboard {
  private _ratesService: RatesService = inject(RatesService);
  private _assetsService: AssetsService = inject(AssetsService);
  private _balanceService: BalanceService = inject(BalanceService);
  private _profileStore = inject(ProfileStoreService);

  rates = toSignal(this._ratesService.popularRates$);
  assets = toSignal(this._assetsService.assets$);
  balance = toSignal(this._balanceService.balance$);
  user = toSignal(this._profileStore.getValueAsync().pipe(map((data) => `${data.firstName} ${data.lastName}`)));
}
