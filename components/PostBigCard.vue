<template>
  <div class="m-2 rounded overflow-hidden shadow-md bg-white relative">
    <img class="w-full" src="http://via.placeholder.com/350x150">
    <div class="absolute pin-b pin-l m-8">
      <nuxt-link v-if="post.Tag" :to="'/tag/' + post.Tag.id">
        <div class="text-grey mb-2 capitalize">{{ post.Tag.name }}</div>
      </nuxt-link>
      <nuxt-link :to="'/post/' + post.id">
        <div class="font-bold text-2xl mb-2 text-white">{{ post.title }}</div>
      </nuxt-link>
      <span>
        <p class="text-grey-lightest text-base">
          <nuxt-link :to="'/user/' + post.User.id">
            {{ post.User.name }} • {{ post.views | vues }}
          </nuxt-link>
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
img {
  margin-bottom: -4px;
}
</style>
