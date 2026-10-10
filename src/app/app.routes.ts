import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './public/_layout/layout.component';
import { LogIn } from './public/pages/log-in/log-in';
import { Dashboard } from './private/pages/dashboard/dashboard';
import { authGuard } from './shared/guard/auth-guard';
import { Assets } from './private/pages/assets/assets';
import { Exchange } from './private/pages/exchange/exchange';
import Rates from './private/pages/rates/rates';
import { PrivateLayoutComponent } from './private/_layout/layout.component';

export const routes: Routes = [
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'log-in',
        component: LogIn,
        title: 'Авторизация',
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
        title: 'Главная',
      },
      {
        path: 'assets',
        component: Assets,
        title: 'Мои ассеты',
      },
      {
        path: 'exchange',
        component: Exchange,
        title: 'Обмен',
      },
      {
        path: 'rates',
        component: Rates,
        title: 'Курсы валют',
        data: {
          isShowSearch: true,
        },
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
