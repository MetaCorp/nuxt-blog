<template>
  <div class="my-4 rounded overflow-hidden shadow bg-white">
    <div class="px-6 py-4 flex flex-row">
      <img src="http://via.placeholder.com/150x150" height="36" alt="" class="rounded-full mr-4">
      <input v-model="message" placeholder="Add a comment" class="text-lg w-full border-0" />
    </div>
    <transition name="collapse">
      <div v-if="showAction" class="flex justify-end">
        <div class="px-6 pb-4">
          <button class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
            Send
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      focused: false,
      message: ''
    }
  },
  computed: {
    showAction () {
      return this.focused || this.message.length > 0
    }
  }
}
</script>

<style scoped>
.collapse-enter-active, .collapse-leave-active {
  transition: height .5s;
  height: 52px;
}
.collapse-enter, .collapse-leave-to {
  height: 0;
}
</style>
