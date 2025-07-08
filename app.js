require('dotenv').config()
const express = require("express");
const connectDB = require("./db/connect");
const notFoundMiddleware = require('./middlewares/not-found')
const globalErrorHandler = require('./middlewares/error-handler')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const productRouter = require('./routes/productRoutes')
const app = express();
const PORT = process.env.PORT || 3000;

// Cloudinary Config
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET,
  // secure_distribution: 'mydomain.com',
  // upload_prefix: 'https://api-eu.cloudinary.com'
});

// Middlewares
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true
}))
app.use(express.static('./public'))

// Routes
app.use('/api/v1/products',productRouter);


// Not Found && Error Handler Middleware
app.use(notFoundMiddleware)
app.use(globalErrorHandler)




const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server started at port: ${PORT}...`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
