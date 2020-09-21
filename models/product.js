'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  categoryId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  price: {
    type: String
  },
  status: {
    type: String
  },
  accessories: {
    type: String
  },
  promotion: {
    type: String
  },
  details: {
    type: String
  },
  isStock: {
    type: Boolean
  },
  isNewArrival: {
    type: Boolean
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
// ProductSchema.path('name').set((inputString) => {
//   return inputString[0].toUpperCase() + inputString.slice(1);
// });

module.exports = mongoose.model('Product', ProductSchema);