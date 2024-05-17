<template>
    <form class="form-horizontal" style="width: 90%; margin: 0 auto;" @submit.prevent="submitAdded">
      <fieldset>

                  <!-- COMPANY NAME-->
        <div class="row justify-content-between text-left my-4">
          <div class="form-group col-12 flex-column d-flex"> <label class="form-control-label">Company Name<span
                class="text-danger"> *</span></label> <input type="text" id="companyName" v-model="companyName"
              name="companyName" placeholder="Rigelis">
          </div>
        </div>

        <!-- TELEPHONE -->
        <div class="row justify-content-between text-left my-4">
          <div class="form-group col-sm-6 flex-column d-flex">
            <label class="col-md-4 control-label">Telephone <span class="text-danger"> *</span></label>
            <input type="tel" id="telephone" name="telephone" placeholder="123-4567-8790" v-model="phone" />
          </div>

          <!-- TELEPHONE 2-->
          <div class="form-group col-sm-6 flex-column d-flex">
            <label class="col-md-4 control-label">Telephone <span class="text-danger"> *</span></label>
            <input type="tel" id="telephone" name="telephone" placeholder="123-4567-8790" v-model="phone" />
          </div>
        </div>

        <!-- ADDRESS -->
        <div class="row justify-content-between text-left my-4">
          <div class="form-group col-sm-6 flex-column d-flex">
            <label class="col-md-4 control-label">Address<span class="text-danger"> *</span></label>
            <input id="address" name="address" placeholder="123 street" v-model="address" />
          </div>

          <!-- EMAIL -->
          <div class="form-group col-sm-6 flex-column d-flex">
            <label class="col-md-4 control-label">Email<span class="text-danger"> *</span></label>
            <input type="text" id="email" name="email" placeholder="rigelis@co.uk" v-model="email" />
          </div>
        </div>

        <!-- LOCATION -->
        <div class="row justify-content-between text-left my-4">
          <div class="form-group col-sm-6 flex-column d-flex">
            <label class="col-md-4 control-label">Location<span class="text-danger"> *</span></label>
            <input id="location" name="location" v-model="location" />
          </div>
          <!-- COMPANY TYPE -->
          <div class="form-group col-sm-6 flex-column d-flex">
            <label class="form-control-label">Company Type<span class="text-danger"> *</span></label>
            <input id="companyType" name="companyType" v-model="companyType" />
          </div>
        </div>

        <div class="d-flex mt-6 justify-content-center">
          <input type="submit" class="col-5 text-white btn btn-primary"
            :value="((subCompany == undefined) ? 'Add Company' : 'Edit Company')" :disabled="isSubmitButtonDisabled" />
        </div>
      </fieldset>
    </form>
</template>

<script>
export default {
  props: {
    subCompany: undefined,
  },
  data() {
    return {
      companyName: '',
      phone: null,
      phone2: null,
      address: '',
      email: '',
      location: '',
      companyType: '',
    };
  },

  computed: {
    isSubmitButtonDisabled() {
      return (
        this.companyName.trim() === "",
        this.phone === "",
        this.address.trim() === "",
        this.email.trim() === "",
        this.location.trim() === "",
        this.companyType.trim() === ""
      );
    },
  },

  methods: {
    submitAdded() {
      let dat = this;
      let payload = {};
      // console.log(this.activeIngredientstrength)
      payload.info = "Are you sure you want to add " + this.companyName + "?";
      payload.addfun = async function (state, page, axios) {
        dat.resetForm();
      }
      this.$store.commit("showSimpleYesOrNo2", payload);
    },

    resetForm() {
      this.uuid = 0;
      this.companyName = '';
      this.phone = 0;
      this.phone2 = 0;
      this.address = '';
      this.email = '';
      this.location = '';
      this.companyType = '';
    },
  }
}
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

/* input[type="text"],
select,
.form-select,
.input-file {
  border: 1px solid #555;
  /* Change #555 to your desired darker color */
/* }  */

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