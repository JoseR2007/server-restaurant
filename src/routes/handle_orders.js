const express = require('express');
const orders = require('../orders');
const handleOrders = express.Router();

handleOrders.get('/', (req, res) => {
  res.send(orders);
});

handleOrders.post('/:table/orders', (req, res) => {
  try {
    const tableNumber = parseInt(req.params.table);
    const order = {
      table: tableNumber,
      order: req.body.content,
      completed: false
    };
    orders.push(order);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: req.statusCode,
      message: 'Internal server error'
    });
  }

  res.send({
    status: req.statusCode,
    message: 'Successful request'
  });
});

module.exports = handleOrders;
