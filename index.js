const express = require('express');
const limiter = require('express-rate-limit');
const handleOrders = require('./src/routes/handle_orders');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'G7x!pL9@wQ3#zT1';

app.use(express.json());
app.use(limiter.rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  legacyHeades: false,
  message: {
    status: 429,
    message: 'Too many requst, plase try again later'
  }
}));
app.use((req, res, next) => {
  const key = req.headers['x-api-key'];
  if (key !== API_KEY) {
    res.status(401).send({
      status: 401,
      message: 'Incorrect API key'
    });
  }

  next();
});

app.use(handleOrders);

app.listen(PORT, () => {
  console.log(`Servidor listo en: ${PORT}`);
});
