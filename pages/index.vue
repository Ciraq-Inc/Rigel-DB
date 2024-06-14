<template>
  <div class="container-fluid">
    <div class="parent">
      <div class="div1 card">
        <div class="card h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-right col-12">
              <!-- <h3 class="text-primary">Company List</h3> -->
              <div>
                <SearchForm2 />
              </div>
              <div>
                <button type="button" data-bs-toggle="modal" data-bs-target="#addCompany" class="custom-btn btn-2">
                  Add
                </button>
              </div>
            </div>

            <!-- ADD COMPANY MODAL -->
            <div class="modal fade custom-modal mx-auto" id="addCompany" tabindex="-1"
              aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                  <div class="modal-header d-flex justify-content-between">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Add New Company
                    </h5>
                    <i data-bs-dismiss="modal" class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"></i>
                  </div>
                  <div class="modal-body">
                    <AddCompanyForm />
                  </div>
                </div>
              </div>
            </div>

            <!-- EDIT COMPANY MODAL -->
            <div class="modal fade custom-modal mx-auto" id="editCompany" tabindex="-1"
              aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                  <div class="modal-header d-flex justify-content-between">
                    <h5 class="modal-title" id="exampleModalLabel">
                      {{ selectedCompanyName }}
                    </h5>
                    <i data-bs-dismiss="modal" class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"></i>
                  </div>
                  <div class="modal-body">
                    <AddCompanyForm :company="selectedCompany" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Company MODE -->
            <div>
              <div class="tableFixHead2">
                <table class="table table-striped mt-2">
                  <thead class="text-capitalize text-center fw-bolder text-primary">
                    <tr>
                      <th scope="col" class="header-cell col">Name</th>
                      <th scope="col" class="header-cell col">Tel</th>
                      <th scope="col" class="header-cell col">Tel-2</th>
                      <th scope="col" class="header-cell col">Address</th>
                      <th scope="col" class="header-cell col">Address-2</th>
                      <th scope="col" class="header-cell col">Location</th>
                      <th scope="col" class="header-cell col">Type</th>
                      <th scope="col" class="header-cell col">UIId</th>
                      <th scope="col" class="header-cell col">Serial Number</th>
                      <th scope="col" class="header-cell col">Sub Companies</th>
                      <th scope="col" class="header-cell col"></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(company, index) in companies" :key="company.id" class="text-center">
                      <td>{{ company.name }}</td>
                      <td>{{ company.tel }}</td>
                      <td>{{ company.tel2 }}</td>
                      <td>{{ company.address1 }}</td>
                      <td>{{ company.address2 }}</td>
                      <td>{{ company.location }}</td>
                      <td>{{ company.companytype }}</td>
                      <td>{{ company.serialNumber }}</td>
                      <td class="text-center">
                        <button type="button" data-bs-toggle="modal" data-bs-target="#viewSubCompany"
                          class="btn btn-secondary rounded-3" @click="viewSubCompanies(company)">
                          View
                        </button>
                      </td>
                      <td>
                        <div class="dropdown">
                          <button class="btn btn-secondary dropdown-toggle" type="button" id="actionDropdown"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Actions
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="actionDropdown">
                            <li><a class="dropdown-item" @click="editCompany(company)"><i class="bi bi-eye-fill"></i>
                                Edit</a></li>
                            <li><a class="dropdown-item" @click="deleteCompany(company, index)"><i
                                  class="bi bi-trash3-fill"></i>
                                Delete</a></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!--VIEW SUB-COMPANY MODAL -->
      <div class="modal fade custom-modal mx-auto" id="viewSubCompany" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header d-flex justify-content-between">
              <div class="modal-title" id="exampleModalLabel">
                <button type="button" data-bs-toggle="modal" data-bs-target="#addSubCompany" class="custom-btn btn-2">
                  Add
                </button>
              </div>
              <div>
                <h4> {{ selectedCompanyName }} </h4>

              </div>
              <i data-bs-dismiss="modal" class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"></i>
            </div>
            <div class="modal-body">
              <table class="table table-hover mt-4">
                <thead class="text-capitalize text-center fw-bolder text-primary header-cell">
                  <tr>
                    <th scope="col" class="header-cell col">Name</th>
                    <th scope="col" class="header-cell col">Tel</th>
                    <th scope="col" class="header-cell col">Tel-2</th>
                    <th scope="col" class="header-cell col">Address</th>
                    <th scope="col" class="header-cell col">Location</th>
                    <th scope="col" class="header-cell col">Serial Number</th>
                    <th scope="col" class="header-cell col">Email</th>
                  </tr>
                </thead>

                <tbody v-if="selectedCompany">
                  <tr v-for="(subCompany, index) in selectedCompany.subCompanies" :key="subCompany.name"
                    class="text-center">
                    <td>{{ subCompany.name }}</td>
                    <td>{{ subCompany.tel }}</td>
                    <td>{{ subCompany.tel2 }}</td>
                    <td>{{ subCompany.address }}</td>
                    <td>{{ subCompany.location }}</td>
                    <td>{{ subCompany.serialNumber }}</td>
                    <td>{{ subCompany.email }}</td>
                    <td>
                      <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="actionDropdown"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          Actions
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="actionDropdown">
                          <li><a class="dropdown-item" @click="editSubCompany(subCompany)"><i
                                class="bi bi-eye-fill"></i>
                              Edit</a></li>
                          <li><a class="dropdown-item" @click="deleteSub(subCompany, index)"><i
                                class="bi bi-trash3-fill"></i>
                              Delete</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- ADD SUB-COMPANY MODAL FORM-->
      <div class="modal fade custom-modal mx-auto" id="addSubCompany" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header d-flex justify-content-between">
              <h5 class="modal-title" id="exampleModalLabel">
                {{ selectedCompanyName }}
              </h5>
              <i data-bs-dismiss="modal" class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"></i>
            </div>
            <div class="modal-body">
              <AddSubCompanyForm @companyAdded="addSubCompany" />
            </div>
          </div>
        </div>
      </div>

      <!-- EDIT SUB COMPANY MODAL -->
      <div class="modal fade custom-modal mx-auto" id="editSubCompany" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header d-flex justify-content-between">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Company
              </h5>
              <i data-bs-dismiss="modal" class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"></i>
            </div>
            <div class="modal-body">
              <AddSubCompanyForm :subCompany="selectedCompany" @companyAdded="addCompany" />
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
      companies: [
      ],
      searchTerm: '',
      searchStart: false,
      companySearchResults: null,
      selectedCompany: {},
      selectedCompanyName: '',
      company: {}
    };
  },
  methods: {
    async fetchCompanies() {
      try {
        const response = await this.$axios.get(this.$store.state.urlBase + "rest/adcomp/all");
        if (response.data.sucessful) {
          this.companies = response.data.data;
          console.log('Companies fetched successfully');
        } else {
          console.log('Could not fetch companies', response.data.message);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    },

    async deleteCompany(company, index) {
      let dat = this;
      let payload = {};
      payload.info = "Are you sure you want to delete " + company.name + "?";
      payload.addfun = async function (state, page, axios) {
        try {
          let response = await this.$axios.get(this.$store.state.urlBase + "rest/adcomp/del/" + company.id);
          if (response.data.sucessful) {
            dat.companies.splice(index, 1);
            payload.message = response.data.message;
          } else {
            payload.message = "Failed to delete: " + response.data.message;
          }
        } catch (err) {
          payload.message = err;
        }

      };
      this.$store.commit("showSimpleYesOrNo2", payload);
    },


    viewSubCompanies(company) {
      this.selectedCompany = company;
      this.selectedCompanyName = company.name;
    },

    addCompany(newCompany) {
      this.companies.push(newCompany);
      $("#editCompany").modal('hide')
      $("#addCompany").modal('hide')
    },

    editCompany(company) {
      this.selectedCompany = company;
      $("#editCompany").modal('show')
    },

    addSubCompany(newSubCompany) {
      this.subCompany.push(newSubCompany);
      $("#addSubCompany").modal('show')
    },

    editSubCompany(subCompany) {
      this.selectedCompany = subCompany;
      $("#editSubCompany").modal('show')
    },



    async deleteSub(subCompany, index) {
      let dat = this;
      let payload = {};
      payload.info = "Are you sure you want to delete " + subCompany.name + "?";
      payload.addfun = async function (state, page, axios) {
        const response = await
          dat.selectedCompany.subCompanies.splice(index, 1);
        // payload.message = response.data.message;
      };
      this.$store.commit("showSimpleYesOrNo2", payload);
    },
  },

  mounted() {
    this.fetchCompanies();
  }
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

.tableFixHead2 {
  overflow-y: auto;
  height: 75vh;
  text-align: left;
}

.tableFixHead2 thead th {
  /* background-color: #000; */
  position: sticky;
  top: 0px;
  border-bottom: 1px solid #000;
}


.header-cell {
  border-bottom: 1px solid #000;
}

.card {
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 10px;
}

.search-input {
  padding: 4px 4px 0 25px;
}

.c-icon {
  font-size: 18px;
}
</style>
