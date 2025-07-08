const express = require("express");
const {
  createProduct,
  getAllProducts,
} = require("../controller/productController");
const { uploadProductImage } = require("../controller/uploadController");
const router = express.Router();

router.route("/").post(createProduct).get(getAllProducts);
router.route("/uploads").post(uploadProductImage);
module.exports = router;
