<template>
  <div class="flex justify-end m-2">
    <button
      v-for="filter in filters"
      :key="filter"
      :class="{'font-bold': filter === currentFilter}"
      @click="currentFilter = filter === currentFilter ? null : filter"
      class="bg-grey-light hover:bg-grey text-grey-darker py-3 px-4 rounded ml-3">
      {{ filter }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    filters: Array
  },
  computed: {
    currentFilter: {
      get: function () {
        return this.value
      },
      set: function (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>
