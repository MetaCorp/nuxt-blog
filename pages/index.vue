<template>
  <div>
    <!-- <post-filter :filters="filters" v-model="currentFilter"></post-filter> -->
    <post-big-card :post="allPosts[0]"></post-big-card>
    <post-list :posts="allPosts"></post-list>
    <post-load-more :fetchData="loadMore" :loading="loading" :hasMore="hasMore"></post-load-more>
  </div>
</template>

<script>
import allPosts from '@/apollo/queries/allPosts'
import PostBigCard from '@/components/PostBigCard'
import PostList from '@/components/PostList'
import PostFilter from '@/components/PostFilter'
import PostLoadMore from '@/components/PostLoadMore'

export default {
  data () {
    return {
      currentFilter: 'Development',
      filters: ['Music', 'Physic', 'Development'],
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
          perPage: 5
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
    PostFilter,
    PostList,
    PostLoadMore,
    PostBigCard
  }
}
</script>
