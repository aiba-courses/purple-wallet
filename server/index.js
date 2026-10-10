const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const assets = require('./data/assets');
const rates = require('./data/rates');
const profile = require('./data/profile');

const app = express();
const PORT = process.env.PORT || 3000;
const API_PREFIX = '/api/v1';
const JWT_SECRET = process.env.JWT_SECRET || 'purple-wallet-dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));

const router = express.Router();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const normalizeEmail = value =>
  typeof value === 'string' ? value.trim().toLowerCase() : '';

const isValidEmail = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));

const isValidPassword = password =>
  typeof password === 'string' && password.trim().length > 0;

const authenticateRequest = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authorization header is missing or invalid' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const normalizedEmail = normalizeEmail(email);

  if (!isValidEmail(normalizedEmail) || !isValidPassword(password)) {
    return res
      .status(400)
      .json({ message: 'Email или пароль указаны неверно' });
  }

  const token = jwt.sign({ email: normalizedEmail }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  res.json({
    token,
    tokenType: 'Bearer',
    expiresIn: JWT_EXPIRES_IN,
  });
});

const getPaginationParams = (req, totalItems) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.max(
    Math.min(parseInt(req.query.limit, 10) || totalItems, totalItems),
    1
  );
  const totalPages = Math.max(Math.ceil(totalItems / limit), 1);
  const currentPage = Math.min(page, totalPages);

  return { page: currentPage, limit, totalPages };
};

router.get('/rates', (req, res) => {
  const total = rates.length;
  const { page, limit, totalPages } = getPaginationParams(req, total);
  const startIndex = (page - 1) * limit;
  const data = rates.slice(startIndex, startIndex + limit);

  res.json({
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
  });
});

router.use(authenticateRequest);

router.get('/profile', (_req, res) => {
  res.json(profile);
});

router.get('/assets', (_req, res) => {
  res.json({ data: assets });
});

router.get('/assets/:assetId', (req, res) => {
  const asset = assets.find(({ assetId }) => assetId === req.params.assetId);

  if (!asset) {
    return res.status(404).json({ message: 'Asset not found' });
  }

  res.json(asset);
});

router.get('/rates/:assetId', (req, res) => {
  const rate = rates.find(({ assetId }) => assetId === req.params.assetId);

  if (!rate) {
    return res.status(404).json({ message: 'Rate not found' });
  }

  res.json(rate);
});

router.get('/balance', (_req, res) => {
  const amount = assets.reduce(
    (total, asset) => total + Number(asset.valueInFiat || 0),
    0
  );

  res.json({
    amount,
    currency: 'RUB',
  });
});

app.use(API_PREFIX, router);

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`PurpleWallet API is running on port ${PORT}`);
});

module.exports = app;
