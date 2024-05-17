<template>
	<div class=container-fluid>
		<div class="parent">
			<div class="div1 card">
				<div class="card h-100">
					<div class="card-body">
						<div class="col-12 d-flex justify-content-between align-items-center">
							<div>
								<SearchForm2 
									:placeholder="customPlaceholder"
									@search="handleSearch" 
									/>
							</div>
							<div class="d-flex justify-content-between align-items-center">
									<button class="btn rounded-1 btn-primary" data-bs-toggle="modal" data-bs-target="#addProduct">
										<span style="white-space: nowrap;">Add Product</span>
									</button>
							</div>
						</div>

						<!-- ADD PRODUCT MODAL -->
						<div class="modal fade custom-modal mx-auto" id="addProduct" tabindex="-1" aria-labelledby="exampleModalLabel"
							aria-hidden="true">
							<div class="modal-dialog modal-lg">
								<div class="modal-content">
									<div class="modal-header d-flex justify-content-between">
										<h5 class="modal-title" id="exampleModalLabel">
											Add New Product
										</h5>
										<i data-bs-dismiss="modal" class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"></i>
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
									<th scope="col"> Product Description</th>
									<th scope="col">Active Ingredients</th>
									<th scope="col">Base Unit</th>
									<th scope="col">Manufacturer</th>
									<th scope="col">Category</th>
									<th scope="col">Image</th>
									<th scope="col"></th>
								</tr>
							</thead>

							<tbody v-if="this.searchedProducts">
								<tr v-for="(product, index) in this.searchedProducts" :key="product.id">
									<td class="text-capitalize">
										{{ product.name }}
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
										<button type="button" class="btn btn-primary" @click="viewProductImage(product)">View</button>
									</td>

									<td>
										<div class="dropdown">
											<button class="btn btn-secondary dropdown-toggle" type="button" id="actionDropdown"
												data-bs-toggle="dropdown" aria-expanded="false">
												Actions
											</button>
											<ul class="dropdown-menu" aria-labelledby="actionDropdown">
												<li><a class="dropdown-item" @click="editPro(product)"><i class="bi bi-pen"></i> Edit</a></li>
												<li><a class="dropdown-item" @click="productDetails(product)"><i class="bi bi-eye-fill"></i>
														View</a></li>
												<li><a class="dropdown-item" @click="deletePro(product, index)"><i class="bi bi-trash3-fill"></i>
														Delete</a></li>
											</ul>
										</div>
									</td>
								</tr>
							</tbody>
						</table>

						<!-- IMAGE MODAL -->
						<div class="modal fade" id="imageModal1">
							<div class="modal-dialog modal-dialog-centered">
								<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title">Image Preview</h5>
										<button type="button" class="close" data-dismiss="modal">&times;</button>
									</div>
									<div class="modal-body">
										<img id="modalImage1" :src="selectedProductImage" alt="Modal Image" class="img-fluid">
									</div>
								</div>
							</div>
						</div>

						<!-- EDIT PRODUCT MODAL -->
						<div class="modal fade" id="editProduct" tabindex="-1" aria-labelledby="editProductLabel" aria-hidden="true">
							<div class="modal-dialog modal-lg">
								<div class="modal-content">
									<div class="modal-header d-flex justify-content-between">
										<h5 class="modal-title" id="editProductLabel">
											Edit Product
										</h5>
										<i data-bs-dismiss="modal" class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"></i>

									</div>
									<div class="modal-body">
										<AddProductForm :product="productSelected" />
									</div>
								</div>
							</div>
						</div>

						<!-- VIEW PRODUCT MODAL -->
						<div class="modal fade" id="viewProduct" tabindex="-2" aria-labelledby="viewProductLabel" aria-hidden="true">
							<div class="modal-dialog modal-md">
								<div class="modal-content">
									<div class="modal-header d-flex justify-content-between">
										<h4 class="modal-title text-primary align-center" id="viewProductLabel">
											Product Details
										</h4>
										<i data-bs-dismiss="modal" class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"></i>

									</div>
									<div class="modal-body">
									</div>
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
			customPlaceholder: 'Search products...',
			productSelected: {},
			selectedProductImage: '',
			selectedProductData: {},
			searchedProducts: [],
			product: {},
		};
	},

	methods: {
		// EDIT PRODUCT FUNC.
		editPro(pro) {
			this.productSelected = pro;
			$("#editProduct").modal('show')
		},

		// ADD PRODUCT FUNC.
		// addProduct(newProduct) {
		// 	this.products.push(newProduct);
		// 	$("#editProduct").modal('hide')
		// 	$("#addProduct").modal('hide')
		// },

		// DELETE PRODUCT FUNC.
		deletePro(pro, index) {
			let dat = this;
			let payload = {};
			payload.info = "Are you sure you want to delete " + pro.name + "?";
			payload.addfun = async function (state, page, axios) {
				try {
					let response = await axios.get(
						state.urlBase + 'rest/mps/delete/' + pro.id
					);
					payload.message = response.data.message;
					dat.searchedProducts.splice(index, 1)
				} catch (err) {
					payload.message = err;
				}
			};
			this.$store.commit("showSimpleYesOrNo2", payload);
		},

		// VIEW PRODUCT FUNC.
		productDetails(product) {
			this.productSelected = product;
			$("#viewProduct").modal('show')
		},

		// SEARCH PRODUCT FUNC.
		async handleSearch(query) {
      if (query.length >= 2) {
        try {
          let response = await this.$axios.get(`${this.$store.state.urlBase}rest/mps/all/${query}`);
          let resList = response.data.data;
					this.searchedProducts = resList;
        } catch (error) {
          console.error('Error fetching search results:', error);
				}
      }
    },

		// VIEW PRODUCT IMG FUNC.
		viewProductImage(pro) {
			let dat = this;
			let payload = {};
			payload.info = "Are you sure you want to view " + pro.name + "?";
			payload.addfun = async function (state, page, axios) {
				// let response = await axios.post(
				//   state.urlBase + process.env.NUXT_ENV_ADD_CUSTOMER,
				//   dat.formData
				// );
				// let data = response.data.sucessful;
				// if (data === true) {
				//   await page.commit("addCustomerResponse", dat.responseMessageTrue);
				//   $("#addnewcustomer").modal("hide");
				// } else {
				//   await page.commit("addCustomerResponse", dat.responseMessageFalse);
				// }

				payload.message = 'img viewed';
			};
			this.$store.commit("showSimpleYesOrNo2", payload);
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
</style>