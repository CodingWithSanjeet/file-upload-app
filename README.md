# File Upload App

**Developer:** [Sanjeet Kumar](https://www.linkedin.com/in/sanjeet-kumar-5a33b77b/) | [Linkedin](https://www.linkedin.com/in/sanjeet-kumar-5a33b77b/)

A modern, full-stack Node.js application for uploading and managing product images with a beautiful, professional user interface. Features dual storage options (local and Cloudinary) with comprehensive file validation and an intuitive user experience.

## 🚀 Features

### **Core Functionality**
- **Image Upload**: Upload product images with comprehensive validation
- **Dual Storage Options**: Local storage and Cloudinary cloud integration
- **Product Management**: Create and manage products with images
- **File Validation**: MIME type and file size validation (1MB limit)
- **Database Integration**: MongoDB for product storage

### **Modern UI/UX**
- **Professional Design**: Modern hero section with gradient backgrounds
- **Drag & Drop Upload**: Intuitive file upload with drag and drop support
- **Image Preview**: Real-time image preview before upload
- **Toast Notifications**: Beautiful success/error messages
- **Loading States**: Visual feedback during operations
- **Responsive Design**: Mobile-first, works on all devices
- **Smooth Animations**: Professional transitions and hover effects

### **Enhanced User Experience**
- **Form Validation**: Real-time validation with visual feedback
- **Button States**: Smart button disabling during operations
- **Empty States**: Friendly messages when no products exist
- **Error Recovery**: Graceful error handling and recovery
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🛠️ Technologies Used

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **File Upload**: express-fileupload
- **Cloud Storage**: Cloudinary
- **Environment**: dotenv for configuration
- **Development**: Nodemon for auto-restart

### **Frontend**
- **Core**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Modern CSS with CSS Custom Properties
- **Typography**: Inter font family
- **Icons**: Font Awesome 6
- **HTTP Client**: Axios for API requests
- **Animations**: CSS transitions and transforms
- **Responsive**: Mobile-first responsive design

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Cloudinary account (for cloud storage)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd file-upload
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGO_URI=mongodb://localhost:27017/file-upload
   
   # Server
   PORT=3000
   
   # File Upload (1MB = 1,048,576 bytes)
   MAX_SIZE=1048576
   
   # Cloudinary Configuration
   CLOUD_NAME=your_cloud_name
   CLOUD_API_KEY=your_api_key
   CLOUD_API_SECRET=your_api_secret
   ```

4. **Start the application**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
file-upload/
├── app.js                 # Main application file
├── controller/
│   ├── productController.js    # Product CRUD operations
│   └── uploadController.js     # File upload handling
├── db/
│   └── connect.js             # Database connection
├── errors/
│   ├── AppError.js           # Base error class
│   ├── BadRequestError.js    # Bad request error
│   ├── NotFoundError.js      # Not found error
│   └── index.js              # Error exports
├── helper/
│   ├── asyncWrapper.js       # Async error wrapper
│   └── response.js           # Response utilities
├── middlewares/
│   ├── error-handler.js      # Global error handler
│   └── not-found.js          # 404 handler
├── models/
│   └── Product.js            # Product model
├── public/
│   ├── browser-app.js        # Frontend JavaScript
│   ├── index.html            # Main HTML file
│   ├── styles.css            # Styling
│   └── uploads/              # Local file storage
├── routes/
│   └── productRoutes.js      # Product routes
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Products

- **GET** `/api/v1/products` - Get all products
- **POST** `/api/v1/products` - Create a new product

### File Upload

- **POST** `/api/v1/products/uploads` - Upload product image

#### Request Format
```javascript
// Form data with image file
const formData = new FormData();
formData.append('image', imageFile);
```

#### Response Format
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "image": {
      "src": "/uploads/image-name.jpg"
    }
  }
}
```

## 🎯 Usage

### Frontend Usage

1. **Open the application** in your browser at `http://localhost:3000`
2. **Upload Product Image**:
   - Click "Choose image or drag & drop" or drag files directly
   - Supports PNG, JPG, JPEG files up to 1MB
   - See real-time image preview
3. **Fill in product details**: Name and Price with validation
4. **Submit the form** to create a product
5. **View products** in the beautiful responsive grid
6. **Connect with developer** via LinkedIn, GitHub, or Email links

### Enhanced Features

- **Drag & Drop**: Drag image files directly onto the upload area
- **Real-time Preview**: See your image before uploading
- **Smart Validation**: Form validates input with visual feedback
- **Loading States**: Clear feedback during upload and form submission
- **Toast Messages**: Success and error notifications
- **Responsive Design**: Works perfectly on mobile and desktop

### API Usage

#### Creating a Product
```javascript
const product = {
  name: "Product Name",
  price: 29.99,
  image: "/uploads/product-image.jpg"
};

const response = await fetch('/api/v1/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(product)
});
```

#### Uploading an Image
```javascript
const formData = new FormData();
formData.append('image', imageFile);

const response = await fetch('/api/v1/products/uploads', {
  method: 'POST',
  body: formData
});
```

## ⚙️ Configuration

### File Upload Limits
- **Maximum file size**: 1MB (configurable via `MAX_SIZE` environment variable)
- **File size display**: Error messages show limits in MB for better UX
- **Allowed file types**: Images only (jpg, png, jpeg, gif, etc.)
- **Storage options**: Local storage or Cloudinary cloud storage
- **Upload feedback**: Real-time validation and preview

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `PORT` | Server port (default: 3000) | No |
| `MAX_SIZE` | Maximum file size in bytes | Yes |
| `CLOUD_NAME` | Cloudinary cloud name | Yes* |
| `CLOUD_API_KEY` | Cloudinary API key | Yes* |
| `CLOUD_API_SECRET` | Cloudinary API secret | Yes* |

*Required only if using Cloudinary storage

## 🚨 Error Handling

The application includes comprehensive error handling:

- **File validation errors**: Invalid file type, size exceeded
- **Database errors**: Connection issues, validation errors
- **Upload errors**: Failed uploads, missing files
- **General errors**: 404 not found, server errors

## 🔒 Security Features

- **File type validation**: Only image files allowed
- **File size limits**: Configurable maximum file size
- **Path traversal protection**: Secure file path handling
- **Input validation**: Comprehensive request validation

## 🧪 Development

### Running in Development Mode
```bash
npm start
```

This uses `nodemon` for automatic server restart on file changes.

### Project Structure Features
- **Modular Architecture**: Clean separation of concerns
- **Error Handling**: Comprehensive error middleware
- **Responsive Design**: Mobile-first CSS approach
- **Modern JavaScript**: ES6+ features and async/await
- **CSS Custom Properties**: Consistent theming system
- **Component-based**: Reusable UI components

### Adding New Features
1. **Backend**: Add routes in `routes/`, controllers in `controller/`, models in `models/`
2. **Frontend**: Update `public/browser-app.js` for functionality, `public/styles.css` for styling
3. **UI Components**: Follow the existing design system with CSS custom properties
4. **Responsive**: Test on multiple screen sizes
5. **Accessibility**: Ensure proper ARIA labels and keyboard navigation

## 👨‍💻 Developer Profile

**Developed by: Sanjeet Kumar**

This application includes a developer profile section featuring:
- **About the Developer**: Professional bio and skills
- **Social Links**: LinkedIn, GitHub, and email contact
- **Professional Design**: Integrated seamlessly with the app design
- **Responsive Layout**: Works on all devices

### Connect with the Developer

- **LinkedIn**: [linkedin.com/in/sanjeet-kumar-5a33b77b](https://www.linkedin.com/in/sanjeet-kumar-5a33b77b/)
- **GitHub**: [github.com/CodingWithSanjeet](https://github.com/CodingWithSanjeet)
- **Email**: Contact via LinkedIn or create a repository issue

**Note**: The developer profile section in `public/index.html` should be updated to match the information above for consistency across the application.

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support, please create an issue in the repository or contact **Sanjeet Kumar** directly via:
- **LinkedIn**: [linkedin.com/in/sanjeet-kumar-5a33b77b](https://www.linkedin.com/in/sanjeet-kumar-5a33b77b/)
- **GitHub**: [github.com/CodingWithSanjeet](https://github.com/CodingWithSanjeet)
- **Email**: sanjeet.kumar.nitt@gmail.com

## 🌟 Screenshots

The application features:
- **Modern Hero Section**: Professional gradient background with clear messaging
- **Intuitive Upload Interface**: Drag & drop with real-time preview
- **Responsive Product Grid**: Beautiful card-based layout
- **Professional Developer Profile**: Integrated contact information
- **Toast Notifications**: Elegant success/error messaging

---

**Made with ❤️ using Node.js, Express & Modern Web Technologies** 
