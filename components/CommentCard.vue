<template>
  <div class="my-4 rounded overflow-hidden shadow bg-white">
    <div class="px-6 py-4">
      <div class="text-lg mb-2">{{ comment.body }}</div>
      <p class="text-grey-darker text-base">
        <nuxt-link :to="'/user/' + comment.User.id">{{ comment.User.name }}</nuxt-link> • {{ comment.publishedAt | fromNow }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
