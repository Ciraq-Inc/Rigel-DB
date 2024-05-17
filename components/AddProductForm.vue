<template>
    <form class="form-horizontal" style="width: 90%; margin: 0 auto;" @submit.prevent="submitAdded">
      <fieldset>
        <!-- PRODUCT DESCRIPTION-->
        <div class="row justify-content-between text-left my-4">
          <div class="form-group col-12 flex-column d-flex"> <label class="form-control-label px-3">Product
              Description<span class="text-danger"> *</span></label> <input type="text" id="productDescription"
              v-model="productDescription" name="productDescription" placeholder="Production Description"
              class="form-control">
          </div>
        </div>

        <legend class="my-4 text-center text-primary">UNITS</legend>

        <!-- Basic Unit -->
        <div class="row justify-content-between text-left my-4">
          <div class="form-group col-12 flex-column d-flex">
            <label class="col-md-4 control-label">Basic unit<span class="text-danger"> *</span></label>
            <select id="Basic unit" name="Basic unit" class="form-select" v-model="baseUnit">
              <option v-for="unit in units" :key="unit.id" :value="unit.name">
                {{ unit.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="btn btn-secondary" @click="addUnits" style="width: 80px; height: 35px; white-space: nowrap;">Add
          Units
        </div>

        <!-- Unit 2 -->
        <div class="row justify-content-between text-left my-4" v-for="(additionalUnit, index) in additionalUnits"
          :key='index'>
          <div class="form-group col-sm-5 flex-column d-flex">
            <label class="col-md-4 control-label">Units {{ index + 1 }}</label>
            <select id="Unit2" name="Unit 2" class="form-select" v-model="additionalUnit.unitId">
              <option v-for="unit in units" :key="unit.id" :value="unit.id">
                {{ unit.name }}
              </option>
            </select>
          </div>
          <div class="form-group col-sm-5 flex-column d-flex">
            <label class="control-label">Number of basic units</label>
            <input id="multiplier2" name="multiplier 2" type="text" placeholder="" v-model="additionalUnit.noOfunits"
              class="form-control">
          </div>
          <div class="align-center text-white font-bold btn btn-danger btn-sm col-sm-2 col-md-2 col-lg-2 col-xlg-2"
            style="width: 50px; height: 25px; margin-top: 25px" @click="deleteUnit(index)">Del</div>
        </div>

        <div class="d-flex mt-2 justify-content-center">
          <input type="submit" class="custom-btn btn-2" :value="((product == undefined) ? 'Submit' : 'Update')"
            :disabled="isSubmitButtonDisabled" />
        </div>
      </fieldset>
    </form>
</template>

<script>
export default {
  props: {
    product: undefined,
  },
  data() {
    return {
      productDescription: '',
      baseUnit: '',
      additionalIngredients: [],
      activeIngredient: '',
      activeIngredients: [],
      classificationSelected: [],
      classificatione: [],
      classificationFiltered: [],
      manufacturers: [],
      newClassification: [],
      owners: [],
      ownerr: '',
      strengths: [],
      activeIngredientstrength: '',
      barcode: '',
      manufacturere: '',
      strength: '',
      units: [],
      additionalUnits: [],
    };
  },

  computed: {
    isSubmitButtonDisabled() {
      return (
        this.baseUnit.trim() === "" ||
        this.productDescription.trim() === ""
      );
    },
  },

  methods: {
    addUnits() {
      this.additionalUnits.push({ unitId: null, noOfunits: "" })
    },

    deleteUnit(index) {
      this.additionalUnits.splice(index, 1);
    },

    async submitAdded() {
      let dat = this;
      let payload = {
        info: "Are you sure you want to add " + this.productDescription + "?",
        addfun: async function (state, page, axios) {
          try {
            const o = {
              basiunit: dat.baseUnit,
              name: dat.productDescription,
              owners: dat.ownerr,
              activeIngredient: dat.activeIngredient,
              activeIngredientstrength: dat.activeIngredientstrength,
              barcode: dat.barcode,
              productactiveCollection: dat.additionalIngredients,
              productunitCollection: dat.additionalUnits.map((unit) => ({
                unitid: unit.unitId,
                noofunits: unit.noOfunits,
              })),
              productclassificationCollection: dat.newClassification.map((item) => ({
                classification: item.id,
              })),
            };

            const response = await dat.sendData("rest/mps/add", o);
            if (response.data.sucessful) {
              dat.resetForm();
              console.log(response);
              payload.message = response.data.message;
            } else {
              payload.message = response.data.message;
            }
          } catch (error) {
            console.log(error);
          }
        },
      };
      this.$store.commit("showSimpleYesOrNo2", payload);
    },

    resetForm() {
      this.baseUnit = '';
      this.additionalUnits = [];
      this.activeIngredient = '';
      this.additionalIngredients = [];
      this.activeIngredientstrength = '';
      this.barcode = '';
      this.classificationSelected = [];
      this.classificatione = [];
      this.classificationFiltered = [];
      this.manufacturere = '';
      this.ownerr = '';
      this.productDescription = '';
    },

    async fetchData(url) {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + url
        );

        let data = response.data.sucessful;
        if (data === true) {
          return response
        }
      } catch (err) {
        console.log(err)
      }
      return [];
    },

    async sendData(url, data2) {
      try {
        let response = await this.$axios.post(
          this.$store.state.urlBase + url, data2
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
    let t = this
    $("#editProduct").on('shown.bs.modal', function () {
      let y = t.product
      if (y) {
        t.additionalIngredients = y.productactiveCollection
        t.additionalUnits = y.productunitCollection
        t.baseUnit = y.basiunit,
          t.manufacturere = y.manufacturer
        t.productDescription = y.name
        t.ownerr = y.owners
        t.activeIngredient = y.activeIngredient
        t.barcode = y.barcode
        t.classificatione = y.classificatione
        t.activeIngredientstrength = y.activeIngredientstrength
      }
    });

    let s = await this.fetchData("rest/mps/loadall/1")
    this.strengths = s.data.data

    let s2 = await this.fetchData("rest/mps/loadall/2")
    this.units = s2.data.data

    let s3 = await this.fetchData("rest/mps/loadall/3")
    this.activeIngredients = s3.data.data;

    let s4 = await this.fetchData("rest/mps/loadall/4")
    this.classificationFiltered = s4.data.data;
    this.classificatione = s4.data.data;

    let s5 = await this.fetchData("rest/manuf/loadall")
    this.manufacturers = s5.data.data;

    let s6 = await this.fetchData("rest/manuf/loadall")
    this.owners = s6.data.data;
  },
};
</script>

<style scoped>
.add {
  position: relative;
  top: 28px;
  right: 15px;
}

button {
  color: #3700ff;
  background-color: transparent;
  padding: 4px 8px;
  border: none;
  border-radius: 10px;
  margin-left: 10px;
  font-size: normal;
  border: 1px solid #3700ff;
}

button:hover {
  background-color: #3700ff;
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

.preview-image {
  width: 100%;
  /* Adjust the width as needed */
  height: auto;
  /* Maintain aspect ratio */
  max-height: 150px;
  /* Set a maximum height if necessary */
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

input[type="text"],
select,
.form-select,
.input-file {
  border: 1px solid #555;
  /* Change #555 to your desired darker color */
}

.formCon {
  border-radius: 10px;
  background-color: #b8b8b831;
}

.tableColumn {
  width: 20%;
}

.plus {
  position: relative;
  left: 207px;
  bottom: 29px;
}
</style>