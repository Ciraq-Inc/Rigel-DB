<template>
    <form class="form-horizontal" @submit.prevent="submitManufacturer" style="width: 90%; margin: 0 auto;">
      <fieldset>

        <!-- MANUFACTURER-->
        <div class="row justify-content-between text-left my-4">
          <div class="form-group col-12 flex-column d-flex">
            <label for="manufacturer" class="control-label px-3">Manufacturer<span class="text-danger"> *</span></label>
            <input type="text" id="manufacturer" name="manufacturer" v-model="manufacturer"
              placeholder="Manufacturer" class="form-control">
          </div>
        </div>

        <!-- COUNTRY -->
        <div class="row justify-content-between text-left my-4">
          <div for="country" class="form-group col-12 flex-column d-flex">
            <label class="form-control-label px-3">Country<span class="text-danger"> *</span></label> 
            <select type="text" id="country" name="country" v-model="selectedCountry" placeholder="Country" class="form-select">
              <option v-for="country in countries" :key="country.id" :value="country.name">
                {{ country.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- PARENT COMPANY -->
        <div class="row justify-content-between text-left my-4">
          <div class="form-group col-12 flex-column d-flex">
            <label for="parentCompany" class="col-md-4 control-label">Parent Company<span class="text-danger">
                *</span></label>
            <input type="text" id="parentCompany" name="parentCompany" placeholder="Parent Company"
              v-model="parentCompany" class="form-control">
          </div>
        </div>

        <!--COMPANY TYPE -->
        <div class="row justify-content-between text-left my-4">
          <div class="form-group col-12 flex-column d-flex">
            <label for="companyType" class="col-md-4 control-label">Company Type<span class="text-danger">*</span></label>
            <select id="companyType" name="companyType" v-model="companyTypes" class="form-select">
              <option value="1">Research</option>
              <option value="2">Innovator Brand</option>
              <option value="3">Contract Manufacturer</option>
              <option value="5">Generics</option>
              <option value="6">Biotech</option>
              <option value="7">Biosimilar</option>
              <option value="8">Herbal</option>
              <option value="9">Food</option>
              <option value="10">Government</option>
              <option value="11">OTC-Man</option>
              <option value="12">Compounding</option>
              <option value="13">Consumer Prods</option>
              <option value="14">Contract Development and Manufacturing</option>
              <option value="15">Virtual manufacturers</option>
              <option value="16">Other</option>
            </select>
          </div>
        </div>

        <div class="d-flex mt-2 justify-content-center">
          <input type="submit" class="custom-btn btn-2" value="Submit" :disabled="isSubmitButtonDisabled"/>
        </div>

      </fieldset>
    </form>
</template>
  
<script>
export default {
  data() {
    return {
        manufacturer: "",
        selectedCountry: "",
        parentCompany: "",
        companyTypes: "",
        countries: []
    };
  },

  computed: {
    isSubmitButtonDisabled() {
      // return (
      //   this.formData.productDescription.trim() === "" ||
      //   this.formData.barcode.trim() === "" ||
      //   this.formData.supplier === ""
      // );
    },
  },

  methods: {
    submitManufacturer() {
      let payload = {};
      // console.log(this.activeIngredientstrength)
      payload.info = "Are you sure you want to add " + this.manufacturer + "?";
      payload.addfun = async function (state, page, axios) {
        
      };

      this.$store.commit("showSimpleYesOrNo2", payload);
    },

    truncateText(text) {
      if (text.length > 16) {
        return `${text.slice(0, 16)}...`;
      } else {
        return text;
      }
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },

  async mounted() {

    try {
          let response = await this.$axios.get('https://restcountries.com/v2/all');
        let resList = response.data;
        this.countries = resList;
      }
      catch (error) {
  console.error('Error fetching countries:', error);
}

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

input[type="text"],
select,
.form-select,
.input-file {
  border: 1px solid #555;
  /* Change #555 to your desired darker color */
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

.plus {
  position: relative;
  left: 207px;
  bottom: 29px;
}</style>