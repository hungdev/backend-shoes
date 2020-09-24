// http://www.codingpedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example#before
const mongoose = require("mongoose");
const fs = require("fs")
const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const Product = require("../models/product");
const _ = require('lodash')

//https://stackoverflow.com/questions/33627238/mongoose-find-with-multiple-conditions
exports.getOrders = async (req, res, next) => {
  let criteria = {}
  try {
    const limit = parseInt(req.query.limit, 0) || 10;
    const skip = parseInt(req.query.skip, 0) || 0;
    const result = await Order.find(criteria).skip(skip).limit(limit).sort({ name: 1 }) // sort theo title
    res.status(200).json({
      result: "ok",
      data: result,
      count: result.length,
      message: "Query list of posts successfully"
    })
  } catch (err) {
    return res.status(500).json({
      error: err
    });
  }
};

exports.getOrderDetail = async (req, res, next) => {
  try {
    const order = await OrderItem.find({ orderId: req.params.orderId })
      // .populate({ path: 'productId', select: 'name' })
      .populate({ path: 'productId' })
      .exec();
    res.json({
      result: "ok",
      data: order,
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

exports.createOrder = async (req, res, next) => {
  const { productList } = req.body
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    userId: req.userData.userId
  });

  try {
    const createOrder = await order.save()
    const orderItemList = productList.map(e => ({
      userId: req.userData.userId,
      productId: e.productId,
      orderId: createOrder._id,
      quantity: e.quantity
    }))
    const createOrderItem = await OrderItem.insertMany(orderItemList)
    res.status(200).json({
      result: "ok",
      data: createOrderItem,
      message: "create successfully"
    })
  } catch (error) {

  }
};

exports.category_delete = (req, res, next) => {
  Category.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.params.categoryId) }, (err) => {
    if (err) {
      res.json({
        result: "failed",
        message: `Cannot delete category with Id: ${req.params.categoryId}. Error is : ${err}`
      });
      return;
    }
    Product.deleteMany({ category_id: { $in: req.params.categoryId } }, (err, response) => {
      if (err) {
        res.json({
          result: "failed",
          message: `Cannot delete Product with Id: ${req.params.categoryId}. Error is : ${err}`
        });
        return;
      }
      res.json({
        result: "ok",
        message: `Delete successful`
      });
    })
  });
};