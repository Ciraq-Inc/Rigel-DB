<template>
  <div class="container-fluid">
    <div class="parent">
      <div class="div1 card">
        <div class="card h-100">
          <div class="card-body">
            <div
              class="col-12 d-flex justify-content-between align-items-center"
            >
              <div>
                <SearchForm2
                  :placeholder="customPlaceholder"
                  @search="handleSearch"
                />
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <button
                  class="btn rounded-1 btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#addProduct"
                >
                  <span style="white-space: nowrap">Add Product</span>
                </button>
              </div>
            </div>

            <!-- ADD PRODUCT MODAL -->
            <div
              class="modal fade custom-modal mx-auto"
              id="addProduct"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header d-flex justify-content-between">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Add New Product
                    </h5>
                    <i
                      data-bs-dismiss="modal"
                      class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"
                    ></i>
                  </div>
                  <div class="modal-body">
                    <AddProductForm />
                  </div>
                </div>
              </div>
            </div>

            <!-- TABLE -->
            <table class="table mt-4">
              <thead class="fw-bolder">
                <tr>
                  <th scope="col">Product Description</th>
                  <th scope="col">MasterID</th>
                  <th scope="col">Active Ingredients</th>
                  <th scope="col">Base Unit</th>
                  <th scope="col">Manufacturer</th>
                  <th scope="col">Category</th>
                  <th scope="col">Image</th>
                  <th scope="col"></th>
                </tr>
              </thead>

              <tbody v-if="this.searchedProducts">
                <tr
                  v-for="(product, index) in this.searchedProducts"
                  :key="product.id"
                >
                  <td class="text-capitalize">
                    {{ product.name }}
                  </td>
                  <td class="text-capitalize">
                    {{ product.id }}
                  </td>

                  <td>
                    {{ product.productactiveCollection }}
                  </td>

                  <td class="text-capitalize">
                    {{ product.basiunit }}
                  </td>

                  <td class="text-capitalize">
                    {{ product.manufacturer }}
                  </td>

                  <td class="text-capitalize">
                    {{ product.category }}
                  </td>

                  <td>
                    <div class="image-container" :data-product-id="product.id">
                      <img
                        :src="
                          productImageUrls[product.id] ||
                          getProductImageUrlSync(product.id)
                        "
                        :alt="product.name"
                        :data-product-id="product.id"
                        class="product-thumbnail clickable-image"
                        @error="handleImageError"
                        @click="handleImageClick(product)"
                        :title="
                          hasProductImage(product.id)
                            ? 'Click to view image'
                            : 'Click to add image'
                        "
                      />
                    </div>
                  </td>

                  <td>
                    <div class="dropdown">
                      <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="actionDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Actions
                      </button>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="actionDropdown"
                      >
                        <li>
                          <a class="dropdown-item" @click="editPro(product)"
                            ><i class="bi bi-pen"></i> Edit</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            @click="productDetails(product)"
                            ><i class="bi bi-eye-fill"></i> View</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            @click="deletePro(product, index)"
                            ><i class="bi bi-trash3-fill"></i> Delete</a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- IMAGE MODAL -->
            <div class="modal fade" id="imageModal1">
              <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">
                      {{ selectedProductData.name || "Product Image" }}
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <img
                      :src="selectedProductImage"
                      :alt="selectedProductData.name || 'Product Image'"
                      class="img-fluid modal-image"
                      style="width: 100%; height: auto"
                      />
                      <!-- @error="handleModalImageError" -->
                    <div v-if="imageLoadError" class="alert alert-warning mt-3">
                      <i class="bi bi-exclamation-triangle"></i>
                      Image not available for this product
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ADD IMAGE MODAL -->
            <div
              class="modal fade"
              id="addImageModal"
              tabindex="-1"
              aria-labelledby="addImageModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-md">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="addImageModalLabel">
                      {{ getImageModalTitle() }}
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="mb-3">
                      <label for="productImageUpload" class="form-label"
                        >Select JPG Image</label
                      >
                      <input
                        type="file"
                        id="productImageUpload"
                        @change="handleImageUploadForProduct"
                        accept=".jpg,.jpeg,image/jpeg"
                        class="form-control"
                        ref="productImageInput"
                      />
                      <small class="form-text text-muted"
                        >Only JPG/JPEG images are allowed (Max 100KB)</small
                      >
                    </div>
                    <div v-if="uploadImagePreview" class="mb-3">
                      <img
                        :src="uploadImagePreview"
                        alt="Preview"
                        class="img-fluid preview-image"
                        style="max-height: 200px"
                      />
                    </div>
                    <div
                      v-if="uploadProgress > 0 && uploadProgress < 100"
                      class="mb-3"
                    >
                      <div class="progress">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          :style="`width: ${uploadProgress}%`"
                          :aria-valuenow="uploadProgress"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {{ uploadProgress }}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="uploadImageForProduct"
                      :disabled="!selectedImageFile || uploadProgress > 0"
                    >
                      <span v-if="uploadProgress > 0" class="spinner-border spinner-border-sm me-2"></span>
                      {{ getUploadButtonText() }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- EDIT PRODUCT MODAL -->
            <div
              class="modal fade"
              id="editProduct"
              tabindex="-1"
              aria-labelledby="editProductLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header d-flex justify-content-between">
                    <h5 class="modal-title" id="editProductLabel">
                      Edit Product
                    </h5>
                    <i
                      data-bs-dismiss="modal"
                      class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"
                    ></i>
                  </div>
                  <div class="modal-body">
                    <AddProductForm :product="productSelected" />
                  </div>
                </div>
              </div>
            </div>

            <!-- VIEW PRODUCT MODAL -->
            <div
              class="modal fade"
              id="viewProduct"
              tabindex="-2"
              aria-labelledby="viewProductLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-md">
                <div class="modal-content">
                  <div class="modal-header d-flex justify-content-between">
                    <h4
                      class="modal-title text-primary align-center"
                      id="viewProductLabel"
                    >
                      Product Details
                    </h4>
                    <i
                      data-bs-dismiss="modal"
                      class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"
                    ></i>
                  </div>
                  <div class="modal-body"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customPlaceholder: "Search products...",
      productSelected: {},
      selectedProductImage: "",
      selectedProductData: {},
      searchedProducts: [],
      product: {},
      // Firebase Storage configuration
      defaultImageUrl: "/images/addimage.jpg",
      imageLoadError: false,
      productImageUrls: {},
      // Optimization properties
      imageLoadingQueue: [],
      isProcessingQueue: false,
      debounceTimer: null,
      intersectionObserver: null,
      visibleProducts: new Set(),
      // Image upload properties
      selectedProductForImage: {},
      selectedImageFile: null,
      uploadImagePreview: "",
      uploadProgress: 0,
    };
  },

  methods: {
    // NORMALIZE FILE EXTENSION (always use jpg for consistency)
    normalizeFileExtension(filename) {
      const ext = filename.split('.').pop().toLowerCase();
      return ['jpg', 'jpeg'].includes(ext) ? 'jpg' : ext;
    },

    // GET PRODUCT IMAGE URL FROM FIREBASE (IMPROVED)
    async getProductImageUrl(productId, forceRefresh = false) {
      try {
        // Check cache first (unless forcing refresh)
        if (!forceRefresh && this.productImageUrls[productId]) {
          return this.productImageUrls[productId];
        }

        // Always check for jpg first (our standard format)
        const storageRef = this.$fire.storage.ref(`masterproducts/${productId}.jpg`);
        
        try {
          const downloadURL = await storageRef.getDownloadURL();
          // Cache the URL
          this.$set(this.productImageUrls, productId, downloadURL);
          return downloadURL;
        } catch (error) {
          if (error.code === 'storage/object-not-found') {
            // Image doesn't exist, cache the fallback
            const fallbackUrl = require("~/assets/images/addimage.jpg");
            this.$set(this.productImageUrls, productId, fallbackUrl);
            return fallbackUrl;
          }
          throw error; // Re-throw other errors
        }
      } catch (error) {
        console.error(`Error getting image URL for product ${productId}:`, error);
        const fallbackUrl = require("~/assets/images/addimage.jpg");
        this.$set(this.productImageUrls, productId, fallbackUrl);
        return fallbackUrl;
      }
    },

    // LAZY LOADING - CHECK IF PRODUCT IS VISIBLE
    isProductVisible(productId) {
      return this.visibleProducts.has(productId);
    },

    // GET PRODUCT IMAGE URL (SYNC VERSION FOR TEMPLATE)
    getProductImageUrlSync(productId) {
      // Check if we have a cached URL first
      if (this.productImageUrls[productId]) {
        return this.productImageUrls[productId];
      }

      // Only queue for loading if product is visible
      if (this.isProductVisible(productId)) {
        this.queueImageLoad(productId);
      }

      // Return fallback immediately while loading
      return require("~/assets/images/addimage.jpg");
    },

    // BATCH PROCESSING - QUEUE IMAGE FOR LOADING
    queueImageLoad(productId) {
      if (
        !this.imageLoadingQueue.includes(productId) &&
        !this.productImageUrls[productId]
      ) {
        this.imageLoadingQueue.push(productId);
        this.debouncedProcessQueue();
      }
    },

    // DEBOUNCING - DELAYED QUEUE PROCESSING
    debouncedProcessQueue() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.processImageQueue();
      }, 300);
    },

    // IMPROVED LAZY LOADING QUEUE PROCESSING
    async processImageQueue() {
      if (this.isProcessingQueue || this.imageLoadingQueue.length === 0) {
        return;
      }

      this.isProcessingQueue = true;
      const batchSize = 3; // Reduced batch size for better reliability

      while (this.imageLoadingQueue.length > 0) {
        const batch = this.imageLoadingQueue.splice(0, batchSize);

        // Process batch with better error handling
        const promises = batch.map(async (productId) => {
          try {
            // Skip if already cached and not a fallback
            if (this.hasProductImage(productId)) {
              return;
            }
            
            const url = await this.getProductImageUrl(productId);
            // URL is already cached in getProductImageUrl
            
          } catch (error) {
            console.error(`Error loading image for product ${productId}:`, error);
            // Set fallback
            this.$set(
              this.productImageUrls,
              productId,
              require("~/assets/images/addimage.jpg")
            );
          }
        });

        await Promise.allSettled(promises); // Use allSettled to handle errors gracefully

        // Longer delay between batches for Firebase rate limiting
        if (this.imageLoadingQueue.length > 0) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      this.isProcessingQueue = false;
    },

    // INTERSECTION OBSERVER - SETUP LAZY LOADING
    setupIntersectionObserver() {
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect();
      }

      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const productId = entry.target.getAttribute("data-product-id");
            if (entry.isIntersecting) {
              this.visibleProducts.add(productId);
              this.queueImageLoad(productId);
            } else {
              this.visibleProducts.delete(productId);
            }
          });
        },
        {
          root: null,
          rootMargin: "50px",
          threshold: 0.1,
        }
      );
    },

    // OBSERVE PRODUCT IMAGES FOR LAZY LOADING
    observeProductImages() {
      this.$nextTick(() => {
        const imageContainers = document.querySelectorAll("[data-product-id]");
        imageContainers.forEach((container) => {
          this.intersectionObserver.observe(container);
        });
      });
    },

    // HANDLE IMAGE ERROR (fallback)
    handleImageError(event) {
      event.target.src = require("~/assets/images/addimage.jpg");
    },

    // HANDLE MODAL IMAGE ERROR
    handleModalImageError(event) {
      this.imageLoadError = true;
      event.target.style.display = "none";
    },

    // EDIT PRODUCT FUNC.
    editPro(pro) {
      this.productSelected = pro;
      $("#editProduct").modal("show");
    },

    // DELETE PRODUCT FUNC.
    deletePro(pro, index) {
      let dat = this;
      let payload = {};
      payload.info = "Are you sure you want to delete " + pro.name + "?";
      payload.addfun = async function (state, page, axios) {
        try {
          let response = await axios.get(
            state.urlBase + "rest/mps/delete/" + pro.id
          );
          payload.message = response.data.message;
          dat.searchedProducts.splice(index, 1);
        } catch (err) {
          payload.message = err;
        }
      };
      this.$store.commit("showSimpleYesOrNo2", payload);
    },

    // VIEW PRODUCT FUNC.
    productDetails(product) {
      this.productSelected = product;
      $("#viewProduct").modal("show");
    },

    // SEARCH PRODUCT FUNC.
    async handleSearch(query) {
      if (query.length >= 2) {
        try {
          let response = await this.$axios.get(
            `${this.$store.state.urlBase}rest/mps/all/${query}`
          );
          let resList = response.data.data;
          this.searchedProducts = resList;

          // Clear previous image queue and reset visibility tracking
          this.imageLoadingQueue = [];
          this.visibleProducts.clear();

          // Setup lazy loading observation for new products
          this.observeProductImages();
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    },

    // SMART IMAGE CLICK HANDLER
    handleImageClick(product) {
      if (this.hasProductImage(product.id)) {
        // If product has an image, view it
        this.viewProductImage(product);
      } else {
        // If no image (showing placeholder), add image
        this.addImageToProduct(product);
      }
    },

    // CHECK IF PRODUCT HAS IMAGE (IMPROVED)
    hasProductImage(productId) {
      const imageUrl = this.productImageUrls[productId];
      return imageUrl && 
             !imageUrl.includes('addimage.jpg') && 
             !imageUrl.includes('assets/images') &&
             imageUrl.startsWith('https://'); // Ensure it's a real Firebase URL
    },

    // VIEW PRODUCT IMG FUNC.
    async viewProductImage(product) {
      this.selectedProductData = product;
      this.selectedProductImage = await this.getProductImageUrl(product.id);
      this.imageLoadError = false;
      $("#imageModal1").modal("show");
    },

    // ADD IMAGE TO PRODUCT FUNC.
    addImageToProduct(product) {
      this.selectedProductForImage = product;
      this.selectedImageFile = null;
      this.uploadImagePreview = "";
      this.uploadProgress = 0;
      $("#addImageModal").modal("show");
    },

    // IMPROVED FILE VALIDATION
    validateImageFile(file) {
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      
      if (!allowedTypes.includes(file.type) && !['jpg', 'jpeg'].includes(fileExtension)) {
        alert('Only JPG/JPEG images are allowed. Please select a different file.');
        this.resetFileInput();
        return false;
      }

      // Check file size (limit to 100KB)
      const maxSize = 100 * 1024; // 100KB
      if (file.size > maxSize) {
        alert('File size must be less than 100KB. Please choose a smaller file.');
        this.resetFileInput();
        return false;
      }

      return true;
    },

    // HANDLE IMAGE UPLOAD FOR PRODUCT
    handleImageUploadForProduct(event) {
      const file = event.target.files[0];
      if (file) {
        if (!this.validateImageFile(file)) {
          return;
        }

        this.selectedImageFile = file;

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadImagePreview = e.target.result;
        };
        reader.onerror = () => {
          alert('Error reading file. Please try again.');
          this.resetFileInput();
        };
        reader.readAsDataURL(file);
      }
    },

    // IMPROVED IMAGE UPLOAD WITH BETTER ERROR HANDLING
    async uploadImageForProduct() {
      if (!this.selectedImageFile || !this.selectedProductForImage.id) {
        alert('Please select a file and product');
        return;
      }

      const productId = this.selectedProductForImage.id;
      
      try {
        // Reset progress
        this.uploadProgress = 0;

        // Validate file type
        if (!this.validateImageFile(this.selectedImageFile)) {
          return;
        }

        // Delete existing image first (with better error handling)
        await this.deleteExistingProductImage(productId);

        // Upload new image (always as jpg for consistency)
        const storageRef = this.$fire.storage.ref();
        const imageRef = storageRef.child(`masterproducts/${productId}.jpg`);
        
        const uploadTask = imageRef.put(this.selectedImageFile, {
          contentType: 'image/jpeg',
          customMetadata: {
            'uploadedAt': new Date().toISOString(),
            'productId': productId.toString()
          }
        });

        // Handle upload progress and completion
        await this.handleUploadTask(uploadTask, productId);
        
      } catch (error) {
        console.error('Upload error:', error);
        this.handleUploadError(error);
      }
    },

    // SEPARATE UPLOAD TASK HANDLER
    async handleUploadTask(uploadTask, productId) {
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Update progress
            this.uploadProgress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            // Handle upload error
            console.error('Upload task error:', error);
            this.uploadProgress = 0;
            reject(error);
          },
          async () => {
            try {
              // Get download URL
              const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
              
              // Clear old cache and update with new URL
              this.$delete(this.productImageUrls, productId);
              this.$set(this.productImageUrls, productId, downloadURL);
              
              // Force refresh the image in UI
              await this.$nextTick();
              
              this.resetUploadState();
              $('#addImageModal').modal('hide');
              
              alert('Image uploaded successfully!');
              resolve(downloadURL);
              
            } catch (error) {
              console.error('Error getting download URL:', error);
              this.uploadProgress = 0;
              reject(error);
            }
          }
        );
      });
    },

    // IMPROVED DELETE EXISTING IMAGE
    async deleteExistingProductImage(productId) {
      try {
        // Only try to delete jpg (our standard format)
        const imageRef = this.$fire.storage.ref(`masterproducts/${productId}.jpg`);
        await imageRef.delete();
        console.log(`Deleted existing image: masterproducts/${productId}.jpg`);
        
        // Clear from cache
        this.$delete(this.productImageUrls, productId);
        
      } catch (error) {
        if (error.code !== 'storage/object-not-found') {
          console.warn('Error deleting existing image:', error);
          // Don't throw error - continue with upload
        }
      }
    },

    // UTILITY METHODS
    resetUploadState() {
      this.selectedImageFile = null;
      this.uploadImagePreview = '';
      this.uploadProgress = 0;
      this.resetFileInput();
    },

    resetFileInput() {
      if (this.$refs.productImageInput) {
        this.$refs.productImageInput.value = '';
      }
    },

    handleUploadError(error) {
      let errorMessage = 'Error uploading image. Please try again.';
      
      if (error.code) {
        switch (error.code) {
          case 'storage/unauthorized':
            errorMessage = 'You do not have permission to upload images.';
            break;
          case 'storage/canceled':
            errorMessage = 'Upload was cancelled.';
            break;
          case 'storage/quota-exceeded':
            errorMessage = 'Storage quota exceeded. Please contact support.';
            break;
          case 'storage/invalid-format':
            errorMessage = 'Invalid file format. Please use JPG images only.';
            break;
        }
      }
      
      alert(errorMessage);
      this.uploadProgress = 0;
    },

    // FORCE REFRESH IMAGE CACHE
    async refreshProductImage(productId) {
      this.$delete(this.productImageUrls, productId);
      const newUrl = await this.getProductImageUrl(productId, true);
      this.$forceUpdate(); // Force UI update
      return newUrl;
    },

    // UPDATE PRODUCT IMAGES WITH PROPER FIREBASE URLS (SIMPLIFIED)
    async updateProductImages() {
      // This method is now mainly for backwards compatibility
      // Most image loading is handled by the lazy loading system
      const visibleProductIds = Array.from(this.visibleProducts);

      for (const productId of visibleProductIds.slice(0, 3)) {
        // Only load first 3 visible
        if (!this.productImageUrls[productId]) {
          this.queueImageLoad(productId);
        }
      }
    },

    // GET MODAL TITLE BASED ON IMAGE EXISTENCE
    getImageModalTitle() {
      if (!this.selectedProductForImage.name) return "Manage Image";

      const hasImage = this.hasProductImage(this.selectedProductForImage.id);
      const action = hasImage ? "Replace Image for" : "Add Image to";
      return `${action} ${this.selectedProductForImage.name}`;
    },

    // GET UPLOAD BUTTON TEXT
    getUploadButtonText() {
      if (this.uploadProgress > 0) {
        return "Uploading...";
      }

      const hasImage = this.hasProductImage(this.selectedProductForImage.id);
      return hasImage ? "Replace Image" : "Upload Image";
    },
  },

  async mounted() {
    // Setup intersection observer for lazy loading
    this.setupIntersectionObserver();

    // Load proper image URLs for any existing products
    if (this.searchedProducts.length > 0) {
      this.observeProductImages();
    }
  },

  beforeDestroy() {
    // Clean up intersection observer and timers
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  },

  watch: {
    searchedProducts: {
      handler() {
        // When products are loaded, setup lazy loading
        this.$nextTick(() => {
          this.observeProductImages();
        });
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  margin: 1rem;
}

a:hover svg path {
  fill: hsl(264, 39%, 51%);
}

.div1 {
  grid-area: 1 / 1 / 2 / 2;
  height: 88vh;
}

.custom-icon {
  font-size: 18px;
  align-items: left;
}

.btn1 {
  color: #3700ff;
  background-color: transparent;
  padding: 4px 8px;
  border: none;
  border-radius: 10px;
  font-size: normal;
  border: 1px solid #3700ff;
}

.btn1:hover {
  background: #3700ff;
  color: #fff;
}

button.on {
  color: #ec1b1b;
  background-color: transparent;
  border: 1px solid #ec1b1b;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown .btn {
  background-color: #ffffff;
  color: #333333;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  list-style: none;
  background-color: #ffffff;
  padding: 0;
  margin: 0;
  border: 1px solid #cccccc;
}

.dropdown-menu li {
  padding: 8px 16px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f2f2f2;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  grid-auto-rows: minmax(40px, auto);
}

input[type="text"],
select,
.form-select,
.input-file {
  border: 1px solid #555;
}
.roleCon {
  display: flex;
  margin: 10px;
  justify-content: space-evenly;
}

#dateBkg {
  background-color: #b8b8b831;
  border: 1px solid #3030302c;
  border-radius: 8px;
}

#dateBkg:focus {
  background-color: #b8b8b831;
  border-radius: 10px;
}
.formCon {
  border-radius: 10px;
  background-color: #b8b8b831;
}
.tableColumn {
  width: 20%;
}
.header-cell {
  border-bottom: 1px solid #000;
}

/* Image styling */
.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.image-buttons {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: center;
}

.product-thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.product-thumbnail:hover {
  transform: scale(1.05);
  border-color: #007bff;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.clickable-image {
  position: relative;
}

.clickable-image::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.clickable-image:hover::after {
  opacity: 1;
}

.modal-image {
  max-height: 70vh;
  border-radius: 8px;
}

.preview-image {
  border-radius: 8px;
  border: 1px solid #ddd;
}

.progress {
  height: 20px;
  border-radius: 10px;
}

.progress-bar {
  border-radius: 10px;
}
</style>
