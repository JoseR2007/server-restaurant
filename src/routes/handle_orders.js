const express = require('express');
const orders = require('../orders');
const handle_orders = express.Router();

handle_orders.post('/:table', (req, res) => {
  try {
    const table_number = req.params.table;
    const body = JSON.parse(req.body);
    const order = {
      table: table_number,
      order: body,
      completed: false
    }
    orders.push(order);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: req.statusCode,
      message: 'Internal server error'
    })
  }

  res.send({
    status: req.statusCode,
    message: 'Successful request'
  })
});