const url = "/api/v1/products";
const fileFormDOM = document.querySelector(".file-form");
const nameInputDOM = document.querySelector("#name");
const priceInputDOM = document.querySelector("#price");
const imageInputDOM = document.querySelector("#image");
const containerDOM = document.querySelector("#productsContainer");
const loadingContainer = document.querySelector("#loadingContainer");
const emptyState = document.querySelector("#emptyState");
const imagePreview = document.querySelector("#imagePreview");

let imageValue;
let submitButton; // Store button reference globally

// Toast notification function
const showToast = (message, type = 'success') => {
  const toastContainer = document.querySelector("#toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Show toast
  setTimeout(() => toast.classList.add("show"), 100);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// Enhanced product card creation
const createProductCard = (product) => {
  const article = document.createElement("article");
  const footer = document.createElement("footer");
  const prodNameP = document.createElement("p");
  const priceSpan = document.createElement("span");
  const img = document.createElement("img");
  
  // Set up the image
  img.src = product.image;
  img.alt = product.name;
  img.loading = "lazy";
  img.onerror = function() {
    this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f1f5f9'/%3E%3Ctext x='100' y='100' text-anchor='middle' dy='0.3em' fill='%2394a3b8' font-family='Arial' font-size='14'%3EImage not found%3C/text%3E%3C/svg%3E";
  };
  
  // Set up the content
  prodNameP.textContent = product.name;
  priceSpan.textContent = product.price;
  
  // Assemble the card
  footer.appendChild(prodNameP);
  footer.appendChild(priceSpan);
  article.className = "product";
  article.appendChild(img);
  article.appendChild(footer);
  
  return article;
};

// Show loading state
const showLoading = () => {
  loadingContainer.classList.add("show");
  emptyState.classList.remove("show");
  containerDOM.style.display = "none";
};

// Hide loading state
const hideLoading = () => {
  loadingContainer.classList.remove("show");
};

// Show empty state
const showEmptyState = () => {
  emptyState.classList.add("show");
  containerDOM.style.display = "none";
};

// Show products grid
const showProductsGrid = () => {
  emptyState.classList.remove("show");
  containerDOM.style.display = "grid";
};

// Image preview functionality
const showImagePreview = (file) => {
  const reader = new FileReader();
  reader.onload = function(e) {
    imagePreview.innerHTML = `
      <img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 200px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <p style="margin-top: 8px; font-size: 14px; color: #64748b;">Selected: ${file.name}</p>
    `;
  };
  reader.readAsDataURL(file);
};

// Clear image preview
const clearImagePreview = () => {
  imagePreview.innerHTML = "";
};

// Enhanced image change handler
const handleImageChange = async (event) => {
  const imgfile = event.target.files[0];
  
  // Check if button exists
  if (!submitButton) {
    console.error("Submit button not found");
    return;
  }
  
  // Prevent image changes during form submission
  if (submitButton.innerHTML.includes('Adding Product')) {
    showToast("Please wait for the current operation to complete", "error");
    event.target.value = ""; // Clear the file input
    return;
  }
  
  if (!imgfile) {
    clearImagePreview();
    imageValue = null;
    // Re-enable button and file input if no image selected
    submitButton.disabled = false;
    submitButton.innerHTML = '<i class="fas fa-plus"></i> Add Product';
    imageInputDOM.disabled = false;
    return;
  }
  
  // Show preview immediately
  showImagePreview(imgfile);
  
  // Validate file type
  if (!imgfile.type.startsWith('image/')) {
    showToast("Please select a valid image file", "error");
    clearImagePreview();
    imageValue = null;
    submitButton.disabled = false;
    submitButton.innerHTML = '<i class="fas fa-plus"></i> Add Product';
    imageInputDOM.disabled = false;
    return;
  }
  
  // Validate file size (1MB = 1048576 bytes)
  if (imgfile.size > 1048576) {
    showToast("Image size must be less than 1MB", "error");
    clearImagePreview();
    imageValue = null;
    submitButton.disabled = false;
    submitButton.innerHTML = '<i class="fas fa-plus"></i> Add Product';
    imageInputDOM.disabled = false;
    return;
  }
  
  // Disable button and file input during image upload
  console.log("Disabling button during upload");
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading Image...';
  imageInputDOM.disabled = true;
  
  const formData = new FormData();
  formData.append("image", imgfile);
  
  try {
    const {
      data: {
        data: {
          image: { src },
        },
      },
    } = await axios.post(`${url}/uploads`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    imageValue = src;
    showToast("Image uploaded successfully!");
    
    // Re-enable button and file input after successful upload
    console.log("Re-enabling button after successful upload");
    submitButton.disabled = false;
    submitButton.innerHTML = '<i class="fas fa-plus"></i> Add Product';
    imageInputDOM.disabled = false;
    
  } catch (error) {
    imageValue = null;
    console.error("Upload error:", error);
    showToast(error.response?.data?.message || "Failed to upload image", "error");
    clearImagePreview();
    
    // Re-enable button and file input after failed upload
    console.log("Re-enabling button after failed upload");
    submitButton.disabled = false;
    submitButton.innerHTML = '<i class="fas fa-plus"></i> Add Product';
    imageInputDOM.disabled = false;
  }
};

// Enhanced fetch products
const fetchProducts = async () => {
  showLoading();
  
  try {
    const {
      data: {
        data: { products },
      },
    } = await axios.get(url);
    
    hideLoading();
    
    if (products.length === 0) {
      showEmptyState();
      return;
    }
    
    showProductsGrid();
    containerDOM.innerHTML = "";
    
    products.forEach((product) => {
      const productCard = createProductCard(product);
      containerDOM.appendChild(productCard);
    });
    
  } catch (error) {
    hideLoading();
    console.error("Fetch error:", error);
    showToast(error.response?.data?.message || "Failed to load products", "error");
    showEmptyState();
  }
};

// Enhanced form submission
const handleAddProduct = async (e) => {
  e.preventDefault();
  
  const nameValue = nameInputDOM.value.trim();
  const priceValue = priceInputDOM.value.trim();
  
  // Validation
  if (!nameValue) {
    showToast("Please enter a product name", "error");
    nameInputDOM.focus();
    return;
  }
  
  if (!priceValue || parseFloat(priceValue) <= 0) {
    showToast("Please enter a valid price", "error");
    priceInputDOM.focus();
    return;
  }
  
  if (!imageValue) {
    showToast("Please upload an image", "error");
    imageInputDOM.focus();
    return;
  }
  
  // Disable form during submission
  const originalButtonText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding Product...';
  
  try {
    const product = { 
      name: nameValue, 
      price: parseFloat(priceValue), 
      image: imageValue 
    };
    
    await axios.post(url, product);
    
    // Reset form
    nameInputDOM.value = "";
    priceInputDOM.value = "";
    imageInputDOM.value = "";
    imageValue = null;
    clearImagePreview();
    
    // Reset input border colors
    nameInputDOM.style.borderColor = '#e2e8f0';
    priceInputDOM.style.borderColor = '#e2e8f0';
    
    showToast("Product added successfully!");
    fetchProducts();
    
  } catch (error) {
    console.error("Add product error:", error);
    showToast(error.response?.data?.message || "Failed to add product", "error");
  } finally {
    // Re-enable form
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }
};

// Enhanced drag and drop functionality
const setupDragAndDrop = () => {
  const fileUploadLabel = document.querySelector(".file-upload-label");
  
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    fileUploadLabel.addEventListener(eventName, preventDefaults, false);
  });
  
  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  ['dragenter', 'dragover'].forEach(eventName => {
    fileUploadLabel.addEventListener(eventName, highlight, false);
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    fileUploadLabel.addEventListener(eventName, unhighlight, false);
  });
  
  function highlight(e) {
    fileUploadLabel.style.borderColor = '#0ea5e9';
    fileUploadLabel.style.backgroundColor = '#f0f9ff';
  }
  
  function unhighlight(e) {
    fileUploadLabel.style.borderColor = '#cbd5e1';
    fileUploadLabel.style.backgroundColor = '#f8fafc';
  }
  
  fileUploadLabel.addEventListener('drop', handleDrop, false);
  
  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
      imageInputDOM.files = files;
      handleImageChange({ target: { files: files } });
    }
  }
};

// Form validation styling
const setupFormValidation = () => {
  [nameInputDOM, priceInputDOM].forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() === '') {
        this.style.borderColor = '#ef4444';
      } else {
        this.style.borderColor = '#22c55e';
      }
    });
    
    input.addEventListener('input', function() {
      if (this.style.borderColor === '#ef4444' && this.value.trim() !== '') {
        this.style.borderColor = '#e2e8f0';
      }
    });
  });
};

// Event listeners
imageInputDOM.addEventListener("change", handleImageChange);
fileFormDOM.addEventListener("submit", handleAddProduct);

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  // Store button reference for global access
  submitButton = fileFormDOM.querySelector('button[type="submit"]');
  
  setupDragAndDrop();
  setupFormValidation();
  fetchProducts();
});

// Add some smooth animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe product cards for animation
const observeProducts = () => {
  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    product.style.opacity = '0';
    product.style.transform = 'translateY(20px)';
    product.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(product);
  });
};

// Call observeProducts after products are loaded
const originalFetchProducts = fetchProducts;
fetchProducts = async () => {
  await originalFetchProducts();
  setTimeout(observeProducts, 100);
};
