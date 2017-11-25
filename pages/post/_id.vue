<template>
  <div v-if="post">
    <div class="header overflow-hidden" style="background-image:url(http://via.placeholder.com/350x150)">
      
    </div>

    <div class="bg-white">
      <div class="max-w-lg mx-auto p-8">
        <h1>{{ post.title }}</h1>
        <div class="mt-8">
          <p>{{ post.body }}</p>
        </div>
      </div>
    </div>

    <div class="footer p-8">
      <div class="max-w-md mx-auto">
        <new-comment-card></new-comment-card>
        <comment-card v-for="comment in post.Comments" :key="comment.id" :comment="comment"></comment-card>
      </div>
    </div>
  </div>
</template>

<script>
import POSTS_GET from '@/apollo/queries/PostsGet'
import CommentCard from '@/components/CommentCard'
import NewCommentCard from '@/components/NewCommentCard'

export default {
  head () {
    return {
      title: this.post ? this.post.title : 'Loading'
    }
  },
  apollo: {
    post: {
      query: POSTS_GET,
      prefetch: ({ route }) => ({ id: route.params.id }),
      variables () {
        return { id: this.$route.params.id }
      },
      update: (data) => data.Post
    }
  },
  layout: 'full',
  validate: ({ params }) => /^\d+$/.test(params.id),
  components: {
    CommentCard,
    NewCommentCard
  }
}
</script>

<style scoped>
.header {
  height: 540px;
  background-size: cover;
  background-position: center; 
}
</style>

