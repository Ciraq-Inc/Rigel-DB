<template>
    <div>
      <div class="wrapper">
        <div class="tabs">
          <!--===== CATEGORY TAB  =====-->
          <div class="tab">
            <input type="radio" name="css-tabs" id="tab-1" checked class="tab-switch">
            <label for="tab-1" class="tab-label">Company Type</label>
            <div class="tab-content">
              <div style="display: flex; justify-content: space-between">
                <div style="width: 90%">
                  <div style="
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                    ">
                    <h5>COMPANY TYPE</h5>
  
                    <div>
                      <input type="text" name="" id="" placeholder="company type" v-model="itemName" @input="handleInput">
                      <button :disabled="isButtonDisabled" @click="addItem(5)" class="btn btn-primary">
                        Create Company Type
                      </button>
                    </div>
                  </div>
                  <table class="table">
                    <thead>
                      <tr>
                        <th class="col fw-normal text-primary" scope="col">
                          Name
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(companyType, index) in companyTypes" :key="companyType.id">
                        <td>{{ companyType.name }}</td>
                        <td class="text-center">
                          <button class="btn-1">Edit</button>
                          <button class="btn-2" @click="deleteItem(index,4, companyType)">Del</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
  
          <!--===== CLASSIFICATIONS TAB  =====-->
          <div class="tab">
            <input type="radio" name="css-tabs" id="tab-6" class="tab-switch">
            <label for="tab-6" class="tab-label">Classifications</label>
            <div class="tab-content">
              <div style="display: flex; justify-content: space-between">
                <div style="width: 90%">
                  <div style="
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                    ">
                    <h5>CLASSIFICATIONS UNITS</h5>
  
                    <div>
                      <input type="text" name="" id="" placeholder="Classification" v-model="itemName" @input="handleInput">
                      <button :disabled="isButtonDisabled" @click="addItem(4)" class="btn btn-primary">
                        Create Classification
                      </button>
                    </div>
                  </div>
                  <table class="table">
                    <thead>
                      <tr>
                        <th class="col fw-normal text-primary" scope="col">
                          Name
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(classification, index)  in classifications" :key="classification.id">
                        <td>{{ classification.name }}</td>
                        <td class="text-center">
                          <button class="btn-1" @click="editItem(3, classification)">Edit</button>
                          <button class="btn-2" @click="deleteItem(index,4, classification)">Del</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
  
          <!--===== ACTIVE INGREDIENTS TAB  =====-->
          <div class="tab">
            <input type="radio" name="css-tabs" id="tab-7" class="tab-switch">
            <label for="tab-7" class="tab-label">Active Ingredients</label>
            <div class="tab-content">
              <div style="display: flex; justify-content: space-between">
                <div style="width: 90%">
                  <div style="
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                    ">
                    <h5>Active Ingredients</h5>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <SearchForm2 @search="onSearchIngredients" placeholder="Search ingredients..." />
                      <button @click="refreshData" class="btn btn-secondary" title="Refresh">
                        <i class="bx bx-refresh"></i>
                      </button>
                    </div>
                  </div>
  
                  <div style="margin-top: 10px;">
                    <input type="text" name="" id="" placeholder="Active Ingredient" v-model="itemName"
                      @input="handleInput">
                    <button :disabled="isButtonDisabled" @click="addItem(3)" class="btn btn-primary">
                      Add Ingredient
                    </button>
                  </div>
                  <table class="table">
                    <thead>
                      <tr>
                        <th class="col fw-normal text-primary" scope="col">
                          Name
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(activeIngredient, index)  in filteredIngredients" :key="activeIngredient.id">
                        <td>{{ activeIngredient.name }}</td>
                        <td class="text-center d-flex">
                          <button class="btn-1" @click="editItem(activeIngredient)">Edit</button>
                          <button class="btn-2" @click="deleteItem(index,3, activeIngredient)">Del</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
  
  
          <!--===== UNITS TAB  =====-->
          <div class="tab">
            <input type="radio" name="css-tabs" id="tab-3" class="tab-switch">
            <label for="tab-3" class="tab-label">Unit</label>
            <div class="tab-content">
              <div style="display: flex; justify-content: space-between">
                <div style="width: 99%">
                  <div style="
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                    ">
                    <h5>UNITS</h5>
  
                    <div>
                      <input type="text" name="" id="" placeholder="Unit name" v-model="itemName" @input="handleInput">
                      <button :disabled="isButtonDisabled" @click="addItem(2)" class="btn btn-primary">
                        Create Unit
                      </button>
                    </div>
                  </div>
                  <table class="table">
                    <thead>
                      <tr>
                        <th class="col fw-normal text-primary" scope="col">
                          Name
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(unit, index) in units" :key="unit.id">
                        <td>{{ unit.name }}</td>
                        <td class="text-center">
                          <button class="btn-1" @click="editItem(unit)">Edit</button>
                          <button class="btn-2" @click="deleteItem(index,2, unit)">Del</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
  
  
          <!--===== STRENGTH TAB  =====-->
          <div class="tab">
            <input type="radio" name="css-tabs" id="tab-9" class="tab-switch">
            <label for="tab-9" class="tab-label">Strengths</label>
            <div class="tab-content">
              <div style="display: flex; justify-content: space-between">
                <div style="width: 99%">
                  <div style="
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                    ">
                    <h5>STRENGTHS</h5>
  
                    <div>
                      <input type="text" name="" id="" placeholder="Strength name" v-model="itemName" @input="handleInput">
                      <button :disabled="isButtonDisabled" @click="addItem(1)" class="btn btn-primary">
                        Create Strength
                      </button>
                    </div>
                  </div>
                  <table class="table">
                    <thead>
                      <tr>
                        <th class="col fw-normal text-primary" scope="col">
                          Name
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(strength, index) in strengths" :key="strength.id">
                        <td>{{ strength.name }}</td>
                        <td class="text-center">
                          <button class="btn-1" @click="editItem(strength)">Edit</button>
                          <button class="btn-2" @click="deleteItem(index,1, strength)">Del</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--===== MODALS  =====-->
  
      <!-- CREATE CATEGORY  -->
      <div class="modal fade" id="createCategory" tabindex="-1" aria-labelledby="createCategoryLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add New Category</h5>
              <i data-bs-dismiss="modal" class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"></i>
              <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
            </div>
            <div class="modal-body">
              <input type="text" name="" id="" placeholder="Name">
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- EDIT CATEGORY MODAL -->
      <div class="modal fade" id="editCategory" tabindex="-2" aria-labelledby="editCategoryLabel" aria-hidden="true">
              <div class="modal-dialog modal-md modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="editCategoryLabel">
                      Edit Item
                    </h5>
                  </div>
                  <div class="modal-body">
                    <input type="text" name="editItem" id="editItem" v-model="itemEdit" placeholder="Name">
                    <button class="bg-primary">Submit</button>
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
        itemId: 0,
        itemName: "",
        companyTypes: [],
        classifications: [],
        activeIngredients: [],
        units: [],
        strengths: [],
        isButtonDisabled: true,
        itemSelected: {},
        itemEdit: '',
        ingredientSearchTerm: '',
      }
    },

    computed: {
      filteredIngredients() {
        return this.activeIngredients.filter(ing =>
          ing.name.toLowerCase().includes(this.ingredientSearchTerm.toLowerCase())
        );
      }
    },

    methods: {
      onSearchIngredients(value) {
        this.ingredientSearchTerm = value;
      },

      addGeneralItem(itemId, name) {
        const newItem = { id: itemId, other1: name };
        const newItem2 = { id: itemId, name: name };
  
        let dat = this;
  
        let payload = {};
        payload.info = "Are you sure you want to add " + name + "?";
        payload.addfun = async function (state, page, axios) {
          try {
            let response = await axios.post(
              state.urlBase +
              "rest/mps/addgeneral",
              newItem
            );
  
            console.log(response)
            let data = response.data.sucessful;
            if (data === true) {
  
              newItem2.id = response.data.data
              switch (itemId) {
                case 47:
                  dat.companyTypes.push(newItem2);
                  break;
                case 4:
                  dat.classifications.push(newItem2);
                  break;
                case 3:
                  dat.activeIngredients.push(newItem2);
                  break;
                case 2:
                  dat.units.push(newItem2);
                case 1:
                  dat.strengths.push(newItem2);
                  break;
                default:
                  break;
              }
  
            } else {
  
            }
  
            payload.message = response.data.message;
          } catch (err) {
            console.log(err)
            payload.message = err;
          }
        };
  
        this.$store.commit("showSimpleYesOrNo2", payload);
  
        dat.isButtonDisabled = true;
        dat.itemName = "";
      },
      addItem(itemId) {
        this.addGeneralItem(itemId, this.itemName);
      },
  
      editItem(item) {
        this.itemSelected = item.name;
        this.itemEdit = item.name;
        $("#editCategory").modal('show')
      },
  
      deleteItem(index, type, item) {
        let dat = this;
        let payload = {};
        payload.info = "Are you sure you want to delete " + item.name + "?";
        payload.addfun = async function (state, page, axios) {
          try {
            let response = await axios.get(
              state.urlBase +
              "rest/mps/del/" + type + "/" + item.id
            );
            console.log(response);
  
            let data = response.data.sucessful;
            if (data === true) {
              // Remove the item from the local array
              switch (type) {
                case 47:
                  dat.categories.splice(index, 1);
                  break;
                case 4:
                  dat.classifications.splice(index, 1);
                  break;
                case 3:
                  dat.activeIngredients.splice(index, 1);
                  break;
                case 2:
                  dat.units.splice(index, 1);
                  break;
                case 1:
                  dat.strengths.splice(index, 1);
                  break;
                default:
                  break;
              }
            } else {
              dat.isButtonDisabled = true;
  
            }
  
            payload.message = response.data.message;
          } catch (err) {
            console.log(err)
            payload.message = err;
          }
        };
  
        this.$store.commit("showSimpleYesOrNo2", payload);
  
      },
  
  
      handleInput() {
        this.isButtonDisabled = this.itemName.trim() === "";
        },

      refreshData() {
        this.refreshDataAsync();
      },

      async refreshDataAsync() {
        let s = await this.fetchData("rest/mps/loadall/1")
        this.strengths = s.data.data

        let s2 = await this.fetchData("rest/mps/loadall/2")
        this.units = s2.data.data

        let s3 = await this.fetchData("rest/mps/loadall/3")
        this.activeIngredients = s3.data.data;

        let s4 = await this.fetchData("rest/mps/loadall/4")
        this.classifications = s4.data.data;
      },

      async fetchData(url) {
        try {
  
            let response = await this.$axios.get(
              this.$store.state.urlBase +
              url
  
            );
  
            let data = response.data.sucessful;
            if (data === true) {
              return response
  
            }
          } catch (err) {
            console.log(err)
  
          }
          return [];
        }
  
      },
  
    async mounted() {
        await this.refreshDataAsync();
      }
  };
  </script>
  
  
  <style scoped>
  .wrapper {
    max-width: 90rem;
    width: 75%;
    margin: 0 auto;
  }
  
  .tabs {
    position: relative;
    margin: 3rem 0;
    background: hsl(264, 39%, 51%);
    height: 14.75rem;
  
  }
  
  .tabs::before,
  .tabs::after {
    content: "";
    display: table;
  }
  
  .btn-1 {
    background: blue;
    color: #fff;
  }
  
  .btn-2 {
    background: #ED0800;
    color: #fff;
  }
  
  .tabs::after {
    clear: both;
  }
  
  .tab {
    float: left;
  }
  
  .tab-switch {
    display: none;
  }
  
  .tab-label {
    position: relative;
    display: block;
    line-height: 2.75em;
    height: 3em;
    padding: 0 1.618em;
    background: hsl(264, 39%, 51%);
    border-right: 0.125rem solid hsl(264, 39%, 51%);
    color: #fff;
    cursor: pointer;
    top: 0;
    transition: all 0.25s;
  }
  
  .tab-label:hover {
    top: -0.25rem;
    transition: top 0.25s;
  }
  
  .tab-content {
    height: 38rem;
    overflow-y: auto;
    width: 100%;
    position: absolute;
    z-index: 1;
    top: 2.75em;
    left: 0;
    padding: 1.618rem;
    background: #fff;
    color: #2c3e50;
    border-bottom: 0.25rem solid #bdc3c7;
    opacity: 0;
    transition: all 0.35s;
  }
  
  .tab-switch:checked+.tab-label {
    background: #fff;
    color: #2c3e50;
    border-bottom: 0;
    border-right: 0.125rem solid #fff;
    transition: all 0.35s;
    z-index: 1;
    top: -0.0625rem;
  }
  
  .tab-switch:checked+label+.tab-content {
    z-index: 2;
    opacity: 1;
    transition: all 0.35s;
  }
  
  .tableHead {
    display: flex;
    justify-content: space-around;
    vertical-align: middle;
  }
  
  button {
    background-color: #2f64e1;
    padding: 4px 8px;
    border: none;
    border-radius: 10px;
    color: #fff;
    margin-left: 10px;
  }
  </style>