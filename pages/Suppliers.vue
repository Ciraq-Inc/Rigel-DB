<template>
	<div class=container-fluid>
		<div class="parent">
			<div class="div1 card">
				<div class="card h-100">
					<div class="card-body">
						<div class="d-flex justify-content-between align-items-right col-12">
							<h3 class="text-primary">Suppliers</h3>
							<div>
								<SearchForm2 :placeholder="customPlaceholder" />
							</div>
						</div>


						<!-- SUPPLIER MODE -->
						<div>
							<table class="table table-hover mt-2">
								<thead class="text-center fw-bolder">
									<tr>
										<th scope="col">Company</th>
										<th scope="col">Branch</th>
										<th scope="col">Parent Comp</th>
										<th scope="col">Country</th>
										<th scope="col">Tel</th>
										<th scope="col">Tel-2</th>
										<th scope="col">Whatsapp</th>
										<th scope="col">Whatsapp-2</th>
										<th scope="col">Email</th>
										<th scope="col">Payment Info</th>
									</tr>
								</thead>

								<tbody>
									<tr v-for="supplier in supplierList" :key="supplier.id">
										<td class="text-center">{{ supplier.company }}</td>
										<td class="text-center">{{ supplier.branch }}</td>
										<td class="text-center">{{ supplier.parentCompany }}</td>
										<td class="text-center">{{ supplier.location }}</td>
										<td class="text-center">{{ supplier.tel }}</td>
										<td class="text-center">{{ supplier.tel2 }}</td>
										<td class="text-center">{{ supplier.whatsapp }}</td>
										<td class="text-center">{{ supplier.whatsapp2 }}</td>
										<td class="text-center">{{ supplier.email }}</td>
										<td class="text-center">
											<button data-bs-toggle="modal" data-bs-target="#paymentInfo"
												class="btn btn-outline-primary">View</button>
										</td>
										<!-- <td class="text-center">
											<button class="btn btn-primary" @click="editCompany(company)">Edit</button>
										</td> -->
									</tr>
								</tbody>
							</table>
						</div>

						<!-- PAYMENT INFO MODAL -->
						<div class="modal fade" id="paymentInfo" tabindex="-1" aria-labelledby="paymentinfoLabel"
							aria-hidden="true">
							<div class="modal-dialog modal-lg">
								<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title text-primary" id="paymentinfoLabel">
											Payment Information
										</h5>
									</div>
									<div class="modal-body">
										<PaymentInfo />
									</div>
								</div>
							</div>
						</div>

						<!-- EDIT COMPANY MODAL -->
						<!-- <div class="modal fade" id="editCompany" tabindex="-1" aria-labelledby="editCompanyLabel" aria-hidden="true">
							<div class="modal-dialog modal-lg">
								<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title text-primary" id="editCompanyLabel">
											{{ selectedCompanyName }}
										</h5>
									</div>
									<div class="modal-body">
										<EditCompanyForm @editCompany="editCompany" />
									</div>
								</div>
							</div>
						</div> -->


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
			customPlaceholder: 'Search supplier...',
			searchTerm: '',
			searchStart: false,
			supplierList: [
				{
					id: 1,
					company: 'Supplier 1',
					branch: 'Branch A',
					parentCompany: 'Parent Comp A',
					location: 'Country A',
					tel: '123456789',
					tel2: '987654321',
					whatsapp: '123456789',
					whatsapp2: '987654321',
					email: 'supplier1@example.com',
				},
				{
					id: 2,
					company: 'Supplier 2',
					branch: 'Branch B',
					parentCompany: 'Parent Comp B',
					location: 'Country B',
					tel: '987654321',
					tel2: '123456789',
					whatsapp: '987654321',
					whatsapp2: '123456789',
					email: 'supplier2@example.com',
				},
				{
					id: 3,
					company: 'Supplier 3',
					branch: 'Branch C',
					parentCompany: 'Parent Comp C',
					location: 'Country C',
					tel: '555555555',
					tel2: '666666666',
					whatsapp: '555555555',
					whatsapp2: '666666666',
					email: 'supplier3@example.com',
				},
			],
		};
	},

	methods: {
		paymentInfo(supplier) {
			// Implement your momoInfo method logic here
			console.log('Momo Info for:', supplier);
		},

		editCompany(company) {
			this.selectedCompany = company;
			this.selectedCompanyName = company.name;
			this.localCompany = { ...company };
			$("#editCompany").modal('show')
		},

		submitAdded() {
			if (this.selectedCompany) {
				this.selectedCompany.username = this.localCompany.username;
				this.selectedCompany.password = this.localCompany.password;
				console.log('Form Submitted');
				$("#editCompany").modal('hide');
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
	grid-column-gap: 10px;
	grid-row-gap: 0px;
	margin: 1rem;
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

.header-cell {
	border-bottom: 1px solid #000;
}

.dropdown-menu li:hover {
	background-color: #f2f2f2;
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

.div1 {
	grid-area: 1 / 1 / 2 / 2;
	height: 88vh;
}

.div2 {
	grid-area: 1 / 2 / 2 / 3;
	height: 88vh;
}

.card {
	background-color: #fff;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
		rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
	border-radius: 10px;
}

input[type="text"],
select,
.form-select,
.input-file {
	border: 1px solid #555;
	/* Change #555 to your desired darker color */
}
</style>
