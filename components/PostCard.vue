<template>
  <div class="m-2 rounded overflow-hidden shadow-md bg-white">
    <nuxt-link :to="'/post/' + post.id">
      <div class="relative">
        <img class="w-full" src="http://via.placeholder.com/350x150">
      </div>
    </nuxt-link>
    <div class="px-6 py-4 flex flex-col items-center">
      <nuxt-link v-if="post.Tag" :to="'/tag/' + post.Tag.id">
        <div class="text-grey mb-2 capitalize">{{ post.Tag.name }}</div>
      </nuxt-link>
      <nuxt-link :to="'/post/' + post.id">
        <div class="font-bold text-xl mb-2">{{ post.title }}</div>
      </nuxt-link>
      <span>
        <p class="text-grey-darker text-base">
          <nuxt-link :to="'/user/' + post.User.id">
            {{ post.User.name }}
          </nuxt-link> • {{ post.views | vues }}
        </p>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style scoped>
</style>
