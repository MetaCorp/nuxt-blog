<template>
  <div class="flex justify-end mx-2">
      <select v-model="sortField" class="block appearance-none bg-grey-light text-grey-darker py-3 px-4 pr-2 rounded-l">
        <option v-for="(sortField, i) in sortFields" :key="i">{{ sortField }}</option>
      </select>
      <button
        @click="changeOrder"
        :class="{ rotated: value.order === 'desc' }"
        class="bg-grey-light flex items-center px-3 text-grey-darker rounded-r">
        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z" />
        </svg>
      </button>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    sortFields: Array
  },
  computed: {
    sortField: {
      get: function () {
        return this.value.field
      },
      set: function (newValue) {
        this.$emit('input', {
          ...this.value,
          field: newValue
        })
      }
    }
  },
  methods: {
    changeOrder () {
      this.$emit('input', {
        ...this.value,
        order: this.value.order === 'asc' ? 'desc' : 'asc'
      })
    }
  }
}
</script>

<style scoped>
select {
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
}

button.rotated {
  transform: rotate(180deg);
}
</style>
