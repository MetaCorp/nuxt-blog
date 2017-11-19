<template>
  <div>
    <post-list :posts="allPosts"></post-list>
    <post-load-more :fetchData="loadMore" :loading="loading" :hasMore="hasMore"></post-load-more>
  </div>
</template>

<script>
import allPosts from '@/apollo/queries/allPosts'
import PostList from '@/components/PostList'
import PostLoadMore from '@/components/PostLoadMore'

export default {
  data () {
    return {
      allPosts: [],
      loading: false,
      hasMore: true,
      page: 0
    }
  },
  apollo: {
    allPosts: {
      prefetch: true,
      query: allPosts,
      variables () {
        return {
          page: 0,
          perPage: 5,
          tag_id: this.$router ? this.$router.history.current.params.id : null
        }
      }
    }
  },
  methods: {
    loadMore () {
      this.loading = true
      this.page++
      this.$apollo.queries.allPosts.fetchMore({
        variables: {
          page: this.page,
          perPage: 5
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (fetchMoreResult.allPosts.length === 0) this.hasMore = false
          this.loading = false
          return {
            allPosts: [
              ...previousResult.allPosts,
              ...fetchMoreResult.allPosts
            ]
          }
        }
      })
    }
  },
  components: {
    PostList,
    PostLoadMore
  },
  validate: ({ params }) => /^\d+$/.test(params.id)
}
</script>
