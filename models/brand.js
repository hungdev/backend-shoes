'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrandSchema = new Schema({
  name: {
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
// BrandSchema.path('name').set((inputString) => {
//   return inputString[0].toUpperCase() + inputString.slice(1);
// });

module.exports = mongoose.model('Brand', BrandSchema);