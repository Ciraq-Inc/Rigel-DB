<template>
  <div>
    <h3>Generated Serial: <strong>{{ generatedSerial }}</strong></h3>
    <div class="modal-footer">
      <button @click="generateSerial" type="button" class="btn btn-primary">View Serial No.</button>
      <button @click="reset" type="button" data-bs-dismiss="modal" class="btn btn-secondary">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    company: null,
  },
  data() {
    return {
      generatedSerial: null
    };
  },
  methods: {
    async generateSerial() {
      try {
        const response = await this.$axios.get(this.$store.state.urlBase + `rest/adcomp/getserial/${this.company.id}`);
        console.log('API Response:', response.data);

        if (response.data.sucessful) {
          this.generatedSerial = response.data.data;
          console.log('Serial number generated successfully');
          console.log('Generated serial:', this.generatedSerial);

        } else {
          console.log('Failed to generate serial number', response.data.message);
        }
      } catch (error) {
        console.error("Error generating serial number:", error);
      }
    },

    reset() {
      this.generatedSerial = null;
      this.errorMessage = null;
    }
  }
}
</script>
