<template>
  <div>
    <div class="input-group">
    <input type="text" @input="search" :placeholder="placeholder">
      <div class="input-group-append">
        <button class="btn btn-secondary" type="button">
          <i class="bx bx-search"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: 'Search company...'
      },
  },

  methods: {
    search(e) {
      this.$emit('search', e.target.value);
    }
  }
}
</script>