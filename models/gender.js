'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GenderSchema = new Schema({
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
// GenderSchema.path('name').set((inputString) => {
//   return inputString[0].toUpperCase() + inputString.slice(1);
// });

module.exports = mongoose.model('Gender', GenderSchema);