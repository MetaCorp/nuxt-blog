<template>
  <div class="flex flex-wrap">
    <div v-for="post in posts" :key="post.id" class="w-full md:w-1/2 lg:w-1/3">
      <post-card :post="post"></post-card>
    </div>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard'

export default {
  props: {
    posts: Array
  },
  components: {
    PostCard
  }
}
</script>
