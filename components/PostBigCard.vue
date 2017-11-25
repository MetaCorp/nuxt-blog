<template>
  <div v-if="post" class="m-2 rounded overflow-hidden shadow-md bg-white relative">
    <img class="w-full" src="http://via.placeholder.com/350x150">
    <div class="absolute pin-b pin-l m-8">
      <nuxt-link v-if="post.tags && post.tags.length" :to="'/tag/' + post.tags[0]._id">
        <div class="text-grey mb-2 capitalize">{{ post.tags[0].name }}</div>
      </nuxt-link>
      <nuxt-link :to="'/post/' + post._id">
        <div class="font-bold text-2xl mb-2 text-white">{{ post.title }}</div>
      </nuxt-link>
      <span>
        <p class="text-grey-lightest text-base">
          <nuxt-link :to="'/user/' + post.user._id">
            {{ post.user.firstname + ' ' + post.user.lastname }}
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
img {
  margin-bottom: -4px;
}
</style>
