// http://www.codingpedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example#before
const mongoose = require("mongoose");
const fs = require("fs");
const Product = require("../models/product");
const Comment = require("../models/comment");
const _ = require('lodash');
const omitEmpty = require('omit-empty');

// res.setHeader('Content-Type', 'application/json');
//https://stackoverflow.com/questions/33627238/mongoose-find-with-multiple-conditions
exports.getProducts = async (req, res, next) => {
  const requestQuery = omitEmpty(req.query);
  console.log('requestQuery', requestQuery);
  // const criteria = _.pick(requestQuery, ['isNewArrival', 'name', 'categoryId', 'isStock'])

  // skip: lấy từ phần tử số skip đó trở đi
  try {
    const limit = parseInt(req.query.limit, 0) || 10;
    const skip = parseInt(req.query.skip, 0) || 0;
    const productRs = await Product.find(requestQuery).skip(skip).limit(limit).sort({ name: 1 }); // sort theo name
    console.log('productRs', productRs);
    // .select("title content location created_date user_id image_url likes")
    res.status(200).json({
      result: "ok",
      data: productRs,
      count: productRs.length,
      message: "Query list of product successfully"
    });
  } catch (err) {
    return res.status(500).json({
      error: err
    });
  }
};

exports.productDetail = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId).exec();
    res.json({
      result: "ok",
      data: product,
      message: "Query list successfully"
    });
  } catch (error) {
    res.json({
      result: "failed",
      data: [],
      message: `Error is : ${error}`
    });
  }
};

exports.createProduct = (req, res, next) => {
  const { name, categoryId, price, status, accessories, promotion, details, isStock, isNewArrival, genderId, size, discount, star, brandId } = req.body;
  // console.log('aaaa', req.files)
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.json({
      result: "failed",
      data: {},
      message: "You must enter valid categoryId"
    });
  }

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    genderId: mongoose.Types.ObjectId(genderId),
    categoryId: mongoose.Types.ObjectId(categoryId),
    size: size,
    price: price,
    status: status,
    accessories: accessories,
    promotion: promotion,
    details: details,
    isStock: isStock,
    isNewArrival: isNewArrival,
    discount: discount,
    star: star,
    brandId: brandId,
    images: req.files.map(e => e.path)
  });
  product.save((err) => {
    if (err) {
      res.json({
        result: "failed",
        data: {},
        message: `Error is : ${err}`
      });
    } else {
      res.json({
        result: "ok",
        message: "Insert new product successfully"
      });
    }
  });
};

exports.product_delete = (req, res, next) => {
  Product.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.params.productId) }, (err) => {
    if (err) {
      res.json({
        result: "failed",
        message: `Cannot delete with Id: ${req.params.productId}. Error is : ${err}`
      });
      return;
    }
    Comment.deleteMany({ product_id: { $in: req.params.productId } }, (err, response) => {
      if (err) {
        res.json({
          result: "failed",
          message: `Cannot delete comment with Id: ${req.params.productId}. Error is : ${err}`
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