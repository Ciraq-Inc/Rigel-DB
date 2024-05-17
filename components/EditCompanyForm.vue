<template>
    <form class="form-horizontal" style="width: 90%; margin: 0 auto;" @submit.prevent="submitAdded">
      <fieldset>
        <!-- UUID-->
        <div class="row justify-content-between text-left my-4">
          <div class="form-group col-sm-6 flex-column d-flex">
            <label class="control-label px-3">Company<span class="text-danger"> *</span></label>
            <input autofocus="autofocus" type="text" id="company" name="company" placeholder="Company name..."
              v-model="formData.company" required>
          </div>

          <!-- BRANCH -->
          <div class="form-group col-sm-6 flex-column d-flex">
            <label class="control-label px-3">Branch<span class="text-danger"> *</span></label>
            <input autofocus="autofocus" type="text" id="branch" name="branch" placeholder="branch.."
              v-model="formData.branch" required>
          </div>
        </div>

        <!-- PARENT COMPANY-->
        <div class="row justify-content-between text-left my-4">
          <div class="form-group col-sm-6 flex-column d-flex">
            <label class="form-control-label">Parent Company<span class="text-danger"> *</span></label>
            <input type="text" id="parentCompany" name="parentCompany" placeholder="Rigelis"
              v-model="formData.parentCompany" required>
          </div>

          <!-- COUNTRY -->
          <div class="form-group col-sm-6 flex-column d-flex">
            <label class="form-control-label">Country<span class="text-danger"> *</span></label>
            <input id="country" name="country" v-model="formData.country" required>
          </div>
        </div>

        <!-- TELEPHONE -->
        <div class="row justify-content-between text-left my-4">
          <div class="form-group col-sm-6 flex-column d-flex">
            <label class="col-md-4 control-label">Telephone <span class="text-danger"> *</span></label>
            <input type="tel" id="telephone" name="telephone" placeholder="123-4567-8790" v-model="formData.phone"
              required>
          </div>

          <!-- TELEPHONE 2-->
          <div class="form-group col-sm-6 flex-column d-flex">
            <label class="col-md-4 control-label">Telephone 2<span class="text-danger"> *</span></label>
            <input type="tel" id="telephone2" name="telephone2" placeholder="123-4567-8790" v-model="formData.phone2"
              required>
          </div>
        </div>

        <!-- WHATSAPP -->
        <div class="row justify-content-between text-left my-4">
          <div class="form-group col-sm-6 flex-column d-flex">
            <label class="col-md-4 control-label">WhatsApp<span class="text-danger"> *</span></label>
            <input id="whatsApp" name="whatsApp" placeholder="" v-model="formData.whatsApp" required>
          </div>

          <!-- WHATSAPP 2 -->
          <div class="form-group col-sm-6 flex-column d-flex">
            <label class="col-md-4 control-label">WhatsApp-2<span class="text-danger"> *</span></label>
            <input type="text" id="whatsApp2" name="whatsApp2" placeholder="" v-model="formData.whatsApp2" required>
          </div>
        </div>

        <!-- EMAIL -->
        <div class="row justify-content-between text-left my-4">
          <div class="form-group col-sm-6 flex-column d-flex">
            <label class="col-md-4 control-label">Email<span class="text-danger"> *</span></label>
            <input id="email" name="email" v-model="formData.email" required>
          </div>
        </div>

        <div class="d-flex mt-6 justify-content-center">
          <input type="submit" class="col-5 text-white btn btn-primary" value="Update"
            :disabled="isSubmitButtonDisabled" />
        </div>
      </fieldset>
    </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        company: '',
        branch: '',
        parentCompany: '',
        country: '',
        phone: null,
        phone2: null,
        whatsApp: '',
        email: '',
        whatsApp2: '',
      },
    };
  },

  computed: {
    isSubmitButtonDisabled() {
      // return (
      // this.companyStructure.trim() === ''
      // );
    },
  },

  methods: {
    submitAdded() {

    },
  },
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
}</style>