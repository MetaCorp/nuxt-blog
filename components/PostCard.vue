<template>
  <div class="m-2 rounded overflow-hidden shadow-md">
    <a :href="postUrl" target="_blank">
      <div class="relative">
        <img class="w-full" src="http://via.placeholder.com/350x150">
        <span class="absolute pin-b pin-r inline-block bg-grey-lighter px-2 py-1 m-2 text-sm font-semibold text-grey-darker">-</span>
      </div>
    </a>
    <div class="px-6 py-4">
      <a :href="postUrl">
        <div class="font-bold text-xl mb-2">{{ post.title }}</div>
      </a>
      <a :href="userUrl">
        <p class="text-grey-darker text-base">
          {{ post.User.name }}
        </p>
      </a>
      <p class="text-grey-darker text-base">
        {{ post.views | vues }} • {{ post.publishedAt | fromNow }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  },
  computed: {
    postUrl () {
      return '/posts/' + this.post.id
    },
    userUrl () {
      return '/users/' + this.post.User.id
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
