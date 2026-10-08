import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './public/_layout/layout.component';
import { PrivateLayoutComponent } from './private/_layout/layout.component';
import { LogIn } from './public/pages/log-in/log-in';
import { Dashboard } from './private/pages/dashboard/dashboard';
import { authGuard } from './shared/guard/auth-guard';
import { Assets } from './private/pages/assets/assets';
import { Exchange } from './private/pages/exchange/exchange';
import { Rates } from './private/pages/rates/rates';

export const routes: Routes = [
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'log-in',
        component: LogIn,
      },
      {
        path: '**',
        redirectTo: 'log-in',
      },
    ],
  },
  {
    path: 'private',
    component: PrivateLayoutComponent,
    // canActivate: [
    //   authGuard
    // ],
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'assets',
        component: Assets,
      },
      {
        path: 'exchange',
        component: Exchange,
      },
      {
        path: 'rates',
        component: Rates,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'public',
  },
];
