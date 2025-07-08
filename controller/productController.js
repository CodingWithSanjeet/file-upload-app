const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../helper/asyncWrapper");
const { sendSuccessResponse } = require("../helper/response");
const Product = require("../models/Product");

const createProduct = asyncWrapper(async (req, res) => {
  console.log(req.body);
  const product = await Product.create({ ...req.body });
  sendSuccessResponse(res, { product }, "Product created successfully.", StatusCodes.CREATED);
});
const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find({});
  sendSuccessResponse(res, {products}, "All products fetched successfully.",StatusCodes.OK)
});

module.exports = {
  createProduct,
  getAllProducts,
};
