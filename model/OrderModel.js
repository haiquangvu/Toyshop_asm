const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  total: Number
});

var OrderModel = mongoose.model('Order', orderSchema,'order');

module.exports = OrderModel;