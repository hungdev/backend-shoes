'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  userId: {
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
// OrderSchema.path('name').set((inputString) => {
//   return inputString[0].toUpperCase() + inputString.slice(1);
// });

module.exports = mongoose.model('Order', OrderSchema);