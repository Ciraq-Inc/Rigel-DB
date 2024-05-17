<template>
    <div class="container-fluid">
      <div class="parent">
        <div class="div1 card">
          <div class="m-2">
              <div class="d-flex justify-content-between align-items-right col-12">
                <SearchForm2 />
  
                <!-- Search Filter -->
                <div>
                  <button class="btn btn-outline-primary dropdown-toggle" type="button" id="filterDropdown"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    Search Filter
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="filterDropdown">
                    <li>
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" v-model="filters.dbPort" />
                        DB-Port
                      </label>
                    </li>
                    <li>
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" v-model="filters.macad" />
                        Macad
                      </label>
                    </li>
                    <li>
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" v-model="filters.rHost" />
                        R-Host
                      </label>
                    </li>
                    <li>
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" v-model="filters.rPort" />
                        R-Port
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
  
              <!-- COMPANY MODE -->
              <div>
                <table class="table table-striped mt-2">
                  <thead class="text-center fw-bolder">
                    <tr>
                      <th scope="col"># ID</th>
                      <th scope="col">Company Name</th>
                      <th scope="col">DB-Port</th>
                      <th scope="col">Macad</th>
                      <th scope="col">R-Host</th>
                      <th scope="col">R-Port</th>
                    </tr>
                  </thead>
  
                  <tbody>
                    <tr v-for="company in companyServer" :key="company.id">
                      <td class="text-center">{{ company.id }}</td>
                      <td class="text-center">{{ company.name }}</td>
                      <td class="text-center">{{ company.dbPort }}</td>
                      <td class="text-center">{{ company.macad }}</td>
                      <td class="text-center">{{ company.rHost }}</td>
                      <td class="text-center">{{ company.rPort }}</td>
                      <td class="text-center">
                        <button class="btn btn-primary" @click="editCompany(company)">Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
  
  
        <!-- EDIT MODAL -->
        <div class="modal fade" id="editCompany" tabindex="-1" aria-labelledby="editProductLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
              <div class="modal-header d-flex justify-content-between">
                <h5 class="modal-title" id="editProductLabel">
                  {{ selectedCompanyName }}
                </h5>
              <i data-bs-dismiss="modal" class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"></i>
              </div>
              <div class="modal-body">
                  <form class="form-horizontal" style="width: 90%; margin: 0 auto;" @submit.prevent="submitAdded">
                    <fieldset>
                    <!-- USERNAME -->
                      <div class="row justify-content-between text-left my-4">
                        <div class="form-group col-sm-6 flex-column d-flex">
                          <label class="control-label px-3">DB-Port<span class="text-danger"> *</span></label>
                          <input autofocus="autofocus" type="text" id="username" name="username" placeholder=""
                          v-model.trim="localCompany.dbPort" required>
                        </div>  
                        <!-- PASSWORD -->
                        <div class="form-group col-sm-6 flex-column d-flex">
                          <label class="control-label px-3">R-Host<span class="text-danger"> *</span></label>
                          <input autofocus="autofocus" type="text" id="password" name="password" placeholder=""
                          v-model.trim="localCompany.rHost" required>
                        </div>
                        </div>
                        <div class="d-flex mt-6 justify-content-center">
                          <button type="submit" class="custom-btn btn-2">Submit</button>
                        </div>
                    </fieldset>
                  </form>
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
        selectedCompany: null,
        selectedCompanyName: '',
  
        localCompany: {
          username: '',
          password: '',
        },
  
        companyServer: [
          {
            id: 1,
            name: 'BlueBand',
            dbPort: 3306,
            macad: '00:11:22:33:44:55',
            rHost: 'example.com',
            rPort: 22,
          },
          {
            id: 2,
            name: 'Indomie',
            dbPort: 5432,
            macad: '11:22:33:44:55:66',
            rHost: 'sample.com',
            rPort: 80,
          },
          {
            id: 3,
            name: 'ECG',
            dbPort: 1433,
            macad: '22:33:44:55:66:77',
            rHost: 'test.com',
            rPort: 3389,
          },
          {
            id: 4,
            name: 'Rigelis',
            dbPort: 1521,
            macad: '33:44:55:66:77:88',
            rHost: 'demo.com',
            rPort: 1522,
          },
        ],
  
        filters: {
          dbPort: false,
          macad: false,
          rHost: false,
          rPort: false,
        },
      };
    },
    methods: {
      editCompany(company) {
        this.selectedCompany = company;
        this.selectedCompanyName = company.name;
        this.localCompany = { ...company };
        $("#editCompany").modal('show')
      },
  
      submitAdded() {
        if (this.selectedCompany) {
          this.selectedCompany.dbPort = this.localCompany.dbPort;
          this.selectedCompany.rHost = this.localCompany.rHost;
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
    grid-template-columns: fr;
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
  
  #dateBkg {
    background-color: #b8b8b831;
    border: 1px solid #3030302c;
    border-radius: 8px;
  }
  
  #dateBkg:focus {
    background-color: #b8b8b831;
    border-radius: 10px;
  }
  
  .div1 {
    grid-area: 1 / 1 / 2 / 2;
    height: 88vh;
  }
  
  .card {
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 10px;
  }
  </style>
  