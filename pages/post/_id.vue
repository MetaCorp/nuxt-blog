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
        <comment-card v-for="comment in post.comments" :key="comment.id" :comment="comment"></comment-card>
      </div>
    </div>
  </div>
</template>

<script>
import POST_BY_ID from '@/apollo/queries/PostById'
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
      query: POST_BY_ID,
      variables () {
        return { _id: this.$route.params.id }
      },
      update: (data) => data.postById
    }
  },
  layout: 'full',
  validate: ({ params }) => params.id && params.id.length === 24,
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

