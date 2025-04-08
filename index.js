const express = require('express');
const limiter = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'G7x!pL9@wQ3#zT1';

app.use(express.json());
app.use(limiter.rateLimit({
  windowMs: 1000,
  limit: 100,
  legacyHeaders: false
}));
app.use((req, res, next) => {
  const key = req.header['x-api-key'];
  if (key !== API_KEY) {
    res.status(401).send({
      status: req.statusCode,
      message: 'Incorrect API key'
    });
  }

  next();
});

app.listen(PORT, () => {
  console.log(`Servidor listo en: ${PORT}`);
});
