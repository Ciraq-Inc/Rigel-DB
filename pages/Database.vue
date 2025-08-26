<template>
  <div class="container-fluid">
    <div class="parent">
      <div class="div1 card">
        <div class="card h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-right col-12">
              <SearchForm2 />

              <!-- Search Filter -->
              <!-- <div>
                <button class="btn btn-outline-primary dropdown-toggle" type="button" id="filterDropdown"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Search Filter
                </button>
                <ul class="dropdown-menu" aria-labelledby="filterDropdown">
                  <li>
                    <label class="form-check-label">
                      <input class="form-check-input" type="checkbox" v-model="filters.isOnline" />
                      Online
                    </label>
                  </li>
                  <li>
                    <label class="form-check-label">
                      <input class="form-check-input" type="checkbox" v-model="filters.onlineDate" />
                      Online Date
                    </label>
                  </li>
                  <li>
                    <label class="form-check-label">
                      <input class="form-check-input" type="checkbox" v-model="filters.localOnlineDate" />
                      Local Online Date
                    </label>
                  </li>
                  <li>
                    <label class="form-check-label">
                      <input class="form-check-input" type="checkbox" v-model="filters.isLocalOnline" />
                      Local Online
                    </label>
                  </li>
                </ul>
              </div> -->
            </div>

            <!-- COMPANY MODE -->
            <div class="mt-4">
              <table class="table table-striped">
                <thead class="text-center fw-bolder">
                  <tr>
                    <th scope="col">Company Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Online</th>
                    <th scope="col">Online Date</th>
                    <th scope="col">Local Online</th>
                    <th scope="col">Local Online Date</th>
                    <th scope="col">Username</th>
                    <th scope="col">Password</th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(company, index) in companyDatabase" :key="company.name">
                    <td>{{ `${index + 1}. ${company.company}` }}</td>
                    <td class="text-center">{{ company.ddate }}</td>
                    <td class="text-center">{{ company.isonline }}</td>
                    <td class="text-center">{{ company.lastonlinedate }}</td>
                    <td class="text-center">{{ company.islocalonline }}</td>
                    <td class="text-center">{{ company.lastlocalonlinedate }}</td>
                    <td class="text-center">{{ company.username }}</td>
                    <td class="text-center">{{ company.passw }}</td>
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
                      <label class="control-label px-3">Username<span class="text-danger"> *</span></label>
                      <input autofocus="autofocus" type="text" id="username" name="username" placeholder=""
                        v-model.trim="localCompany.username" required>
                    </div>
                    <!-- PASSWORD -->
                    <div class="form-group col-sm-6 flex-column d-flex">
                      <label class="control-label px-3">Password<span class="text-danger"> *</span></label>
                      <input autofocus="autofocus" type="text" id="password" name="password" placeholder=""
                        v-model.trim="localCompany.passw" required>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCompany: null,
      selectedCompanyName: '',
      localCompany: {
      },
      companyDatabase: [
      ],

      // filters: {
      //   isOnline: false,
      //   onlineDate: false,
      //   localOnlineDate: false,
      //   isLocalOnline: false,
      // },
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
        this.selectedCompany.username = this.localCompany.username;
        this.selectedCompany.password = this.localCompany.password;
        console.log('Form Submitted');
        $("#editCompany").modal('hide');
      }
    },

    async fetchDatabase() {
      try {
        const response = await this.$axios.get(this.$store.state.urlBase + "rest/adcomp/computers");
        if (response.data.sucessful) {
          this.companyDatabase = response.data.data;
          console.log("Company Database successfully fetched")
        } else {
          console.log('Could not fetch company database', response.data.message);
        }
      } catch (err) {
        console.log("Error fetching company database", error)
      }
    },


  },
  mounted() {
    this.fetchDatabase();
  }

}
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

.card {
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 10px;
}

.header-cell {
  border-bottom: 2px solid #000;
}
</style>
