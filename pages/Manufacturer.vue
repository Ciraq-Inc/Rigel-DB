<template>
	<div class="container-fluid">
		<div class="parent">
			<div class="div1 card">
				<div class="card h-100">
					<div class="card-body">
						<div class="col-12 d-flex justify-content-between align-items-center">
							<div>
								<SearchForm2 :placeholder="customPlaceholder" />
							</div>
								<div>
									<button class="custom-btn btn-2" data-bs-toggle="modal" data-bs-target="#addManufacturer">
										Add
									</button>
								</div>
						</div>

						<!-- ADD MANUFACTURER MODAL -->
						<div class="modal fade custom-modal mx-auto" id="addManufacturer" tabindex="-1"
							aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div class="modal-dialog modal-md">
								<div class="modal-content">
									<div class="modal-header d-flex justify-content-between">
										<h5 class="modal-title" id="exampleModalLabel">
											Add Manufacturer
										</h5>
										<i data-bs-dismiss="modal" class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"></i>
									</div>
									<div class="modal-body">
										<AddManufacturerForm @manufacturerAdded="addManufacturer" />
									</div>
								</div>
							</div>
						</div>

						<!-- TABLE -->
						<table class="table mt-4">
							<thead class="text-center fw-bolder">
								<tr>
									<th scope="col">Manufacturer</th>
									<th scope="col">Country</th>
									<th scope="col">Parent Company</th>
									<th scope="col">Type</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="manufacturer in manufacturerList" :key="manufacturer.id">
									<td class="text-capitalize text-center">
										{{ manufacturer.name }}
									</td>
									<td class="text-capitalize text-center">
										{{ manufacturer.country }}
									</td>
									<td class="text-capitalize text-center">
										{{ manufacturer.parentCompany }}
									</td>
									<td class="text-capitalize text-center">
										{{ manufacturer.companyType }}
									</td>
									<td class="text-capitalize text-center">
                    <button class="btn btn-secondary" @click="editManufacturer(manufacturer)">Edit</button>
                  </td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

		<!-- EDIT MODAL -->
		<div class="modal fade" id="editManufacturer" tabindex="-1" aria-labelledby="editManufacturerLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-md">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="editProductLabel">
							{{ selectedManufacturerName }}
						</h5>
					</div>
					<div class="modal-body">
							<form class="form-horizontal" style="width: 90%; margin: 0 auto;" @submit.prevent="updatedManufacturer">
								<fieldset>
								<!-- PARENT COMPANY -->
									<div class="row justify-content-between text-left my-4">
										<div class="form-group col-sm-6 flex-column d-flex">
											<label class="control-label px-3">Parent Company<span class="text-danger"> *</span></label>
											<input autofocus="autofocus" type="text" id="username" name="username" placeholder=""
											v-model.trim="localManufacturer.parentCompany" required>
										</div>  
										<!-- COMPANY TYPE -->
										<div class="form-group col-sm-6 flex-column d-flex">
											<label class="control-label px-3">Company Type<span class="text-danger"> *</span></label>
											<input autofocus="autofocus" type="text" id="password" name="password" placeholder=""
											v-model.trim="localManufacturer.companyType" required>
										</div>
										</div>
										<div class="d-flex mt-6 justify-content-center">
											<button type="submit" class="custom-btn btn-2">Update</button>
										</div>
								</fieldset>
							</form>
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
			selectedManufacturer: null,
      selectedManufacturerName: '',
			
			localManufacturer: {
        parentCompany: '',
        companyType: '',
      },
			customPlaceholder: 'Search manufacturer...',
			manufacturerList: [
				{ id: 1, name: 'Manufacturer 1', country: 'Country A', parentCompany: 'Parent A', companyType: 'Generics' },
				{ id: 2, name: 'Manufacturer 2', country: 'Country B', parentCompany: 'Parent B', companyType: 'Biotech' },
			],

		};
	},

	methods: {
		editManufacturer(manufacturer) {
      this.selectedManufacturer = manufacturer;
      this.selectedManufacturerName = manufacturer.name;
      this.localManufacturer = { ...manufacturer };
      $("#editManufacturer").modal('show')
    },

		addManufacturer(newManufacturer) {
			this.manufacturerList.push(newManufacturer);
		},

		updatedManufacturer() {
      if (this.selectedManufacturer) {
        this.selectedManufacturer.parentCompany = this.localManufacturer.parentCompany;
        this.selectedManufacturer.companyType = this.localManufacturer.companyType;
        console.log('Form Submitted');
        $("#editManufacturer").modal('hide');
    }
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

.div1 {
	grid-area: 1 / 1 / 2 / 2;
	height: 88vh;
}

.btn1 {
	color: #3700ff;
	background-color: transparent;
	padding: 4px 8px;
	border: none;
	border-radius: 10px;
	margin-left: 10px;
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


input[type="text"],
select,
.form-select,
.input-file {
	border: 1px solid #555;
	/* Change #555 to your desired darker color */
}
</style>