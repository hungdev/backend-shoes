// http://www.codingpedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example#before
const mongoose = require("mongoose");
const fs = require("fs");
const Gender = require("../models/gender");
const Product = require("../models/product");
const _ = require('lodash');

//https://stackoverflow.com/questions/33627238/mongoose-find-with-multiple-conditions
exports.getGenders = async (req, res, next) => {
  let criteria = {};
  // if (mongoose.Types.ObjectId.isValid(req.query.user_id)) {
  //   criteria.userID = mongoose.Types.ObjectId(req.query.user_id)
  // }
  // skip: lấy từ phần tử số skip đó trở đi
  try {
    const limit = parseInt(req.query.limit, 0) || 10;
    const skip = parseInt(req.query.skip, 0) || 0;
    const genderResult = await Gender.find(criteria).skip(skip).limit(limit).sort({ name: 1 }); // sort theo title
    res.status(200).json({
      result: "ok",
      data: genderResult,
      count: genderResult.length,
      message: "Query list of posts successfully"
    });
  } catch (err) {
    return res.status(500).json({
      error: err
    });
  }
};

exports.createGender = (req, res, next) => {
  const gender = new Gender({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name
  });
  gender.save((err) => {
    if (err) {
      res.json({
        result: "failed",
        data: {},
        message: `Error is : ${err}`
      });
    } else {
      res.json({
        result: "ok",
        message: "Insert new gender successfully"
      });
    }
  });
};

exports.deleteGender = (req, res, next) => {
  Gender.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.params.genderId) }, (err) => {
    if (err) {
      res.json({
        result: "failed",
        message: `Cannot delete category with Id: ${req.params.GenderId}. Error is : ${err}`
      });
      return;
    }
    Product.deleteMany({ category_id: { $in: req.params.GenderId } }, (err, response) => {
      if (err) {
        res.json({
          result: "failed",
          message: `Cannot delete Product with Id: ${req.params.GenderId}. Error is : ${err}`
        });
        return;
      }
      res.json({
        result: "ok",
        message: `Delete successful`
      });
    });
  });
};