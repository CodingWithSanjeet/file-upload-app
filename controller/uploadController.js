const asyncWrapper = require("../helper/asyncWrapper");
const path = require("path");
const { sendSuccessResponse } = require("../helper/response");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadProductImageLocal = asyncWrapper(async (req, res) => {
  console.log(req.files);
  if (!req.files) {
    throw new CustomError.BadRequestError(
      "No file was uploaded. Please attach an image file and try again."
    );
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError(
      "Invalid file type. Please upload a valid image file (e.g., .jpg, .png, .jpeg, .gif)."
    );
  }
  // 1KB = 1024 bytes
  // 1MB = 1024KB => 1024 * 1024 bytes
  if (productImage.size > process.env.MAX_SIZE) {
    throw new CustomError.BadRequestError(
      `Image size exceeds the allowed limit of ${(
        process.env.MAX_SIZE /
        (1024 * 1024)
      ).toFixed(2)} MB. Uploaded image size: ${(
        productImage.size /
        (1024 * 1024)
      ).toFixed(2)} MB.`
    );
  }
  const imagePath = path.join(
    __dirname,
    `../public/uploads/${productImage.name}`
  );
  await productImage.mv(imagePath);
  sendSuccessResponse(
    res,
    { image: { src: `/uploads/${productImage.name}` } },
    "Image uploaded successfully.",
    StatusCodes.OK
  );
});

const uploadProductImage = asyncWrapper(async (req, res) => {
  console.log("Test", req.files);
  if (!req.files) {
    throw new CustomError.BadRequestError(
      "No file was uploaded. Please attach an image file and try again."
    );
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError(
      `Invalid file type. Please upload a valid image file (e.g., .jpg, .png, .jpeg, .gif).`
    );
  }
  if (productImage.size > process.env.MAX_SIZE) {
    throw new CustomError.BadRequestError(
      `Image size exceeds the allowed limit of ${(
        process.env.MAX_SIZE /
        (1024 * 1024)
      ).toFixed(2)} MB. Uploaded image size: ${(
        productImage.size /
        (1024 * 1024)
      ).toFixed(2)} MB.`
    );
  }
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: "file-upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  sendSuccessResponse(
    res,
    { image: { src: result.url } },
    "Image Successfully uploaded",
    StatusCodes.OK
  );
});

module.exports = {
  // uploadProductImage,
  uploadProductImage,
};
