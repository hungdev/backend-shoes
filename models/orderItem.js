'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderItemSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
});
// a setter
// OrderItemSchema.path('name').set((inputString) => {
//   return inputString[0].toUpperCase() + inputString.slice(1);
// });

module.exports = mongoose.model('OrderItem', OrderItemSchema);