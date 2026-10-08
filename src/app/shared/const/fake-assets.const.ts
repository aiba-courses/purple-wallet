import { IAssetModel } from '../../private/pages/assets/models/asset.model';

export const FAKE_ASSETS: IAssetModel[] = [
  {
    assetId: 'btc',
    assetName: 'Bitcoin',
    logoUrl: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    value: 52987.23, // количество BTC
    rateChange: 2.53,
    valueInFiat: 3550144410, // 52987.23 * 67000
  },
  {
    assetId: 'eth',
    assetName: 'Ethereum',
    logoUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    value: 3120.45,
    rateChange: -1.02,
    valueInFiat: 10921575, // 3120.45 * 3500
  },
  {
    assetId: 'ltc',
    assetName: 'Litecoin',
    logoUrl: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png',
    value: 98.12,
    rateChange: 0.78,
    valueInFiat: 7849.6, // 98.12 * 80
  },
  {
    assetId: 'bnb',
    assetName: 'BNB',
    logoUrl:
      'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png',
    value: 412.98,
    rateChange: 1.15,
    valueInFiat: 247788, // 412.98 * 600
  },
  {
    assetId: 'ada',
    assetName: 'Cardano',
    logoUrl: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    value: 0.445,
    rateChange: -0.63,
    valueInFiat: 0.20025, // 0.445 * 0.45
  },
  {
    assetId: 'sol',
    assetName: 'Solana',
    logoUrl: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    value: 132.34,
    rateChange: 3.44,
    valueInFiat: 21174.4, // 132.34 * 160
  },
  {
    assetId: 'doge',
    assetName: 'Dogecoin',
    logoUrl: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    value: 0.087,
    rateChange: -2.1,
    valueInFiat: 0.01305, // 0.087 * 0.15
  },
  {
    assetId: 'dot',
    assetName: 'Polkadot',
    logoUrl:
      'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
    value: 7.65,
    rateChange: 0.92,
    valueInFiat: 53.55, // 7.65 * 7
  },
  {
    assetId: 'avax',
    assetName: 'Avalanche',
    logoUrl:
      'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite.png',
    value: 34.21,
    rateChange: 1.67,
    valueInFiat: 1197.35, // 34.21 * 35
  },
  {
    assetId: 'matic',
    assetName: 'Polygon',
    logoUrl:
      'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
    value: 0.91,
    rateChange: -0.31,
    valueInFiat: 0.728, // 0.91 * 0.8
  },
];
