const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Product name is required.']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required']
    },
    image: {
        type: String,
        require: [true, 'Product image is required']
    }
},{timestamps: true})

const Product = mongoose.model('product',ProductSchema);
module.exports = Product;