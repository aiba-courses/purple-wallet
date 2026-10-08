export interface INavConst {
  text: string;
  iconUrl: string;
  iconUrlActive: string;
  link: string;
  id: string;
  disabled: boolean;
}

export const NAV_CONST: INavConst[] = [
  {
    text: 'Главная',
    iconUrl: 'menu/dashboard.svg',
    iconUrlActive: 'menu/dashboard-active.svg',
    link: '/private/dashboard',
    id: 'dashboard',
    disabled: false,
  },
  {
    text: 'Мои монеты',
    iconUrl: 'menu/wallet.svg',
    iconUrlActive: 'menu/wallet-active.svg',
    link: '/private/assets',
    id: 'wallet',
    disabled: false,
  },
  {
    text: 'Курсы',
    iconUrl: 'menu/rates.svg',
    iconUrlActive: 'menu/rates-active.svg',
    link: '/private/rates',
    id: 'rates',
    disabled: false,
  },
  {
    text: 'Обмен',
    iconUrl: 'menu/exchange.svg',
    iconUrlActive: 'menu/exchange-active.svg',
    link: '/private/exchange',
    id: 'exchange',
    disabled: false,
  },
];
