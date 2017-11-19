<template>
  <div>
    <nuxt-link to="/test">To Test</nuxt-link>
    <post-filter :filters="filters" v-model="currentFilter"></post-filter>
    <post-list :posts="allPosts"></post-list>
    <!-- <post-load-more :fetchData="loadMore" :loading="loading" :hasMore="posts.nextPageToken"></post-load-more> -->
  </div>
</template>

<script>
import allPosts from '@/apollo/queries/allPosts'
import PostList from '@/components/PostList'
import PostFilter from '@/components/PostFilter'
import PostLoadMore from '@/components/PostLoadMore'

export default {
  data () {
    return {
      currentFilter: 'Development',
      filters: ['Music', 'Physic', 'Development'],
      allPosts: {},
      loading: false
    }
  },
  apollo: {
    allPosts: {
      prefetch: true,
      query: allPosts
    }
  },
  // methods: {
  //   loadMore () {
  //     this.loading = true
  //     this.$apollo.queries.videos.fetchMore({
  //       variables: {
  //         pageToken: this.videos.nextPageToken
  //       },
  //       updateQuery: (previousResult, { fetchMoreResult }) => {
  //         console.log('fetchMoreResult :', fetchMoreResult)
  //         this.loading = false
  //         return {
  //           videos: {
  //             ...fetchMoreResult.videos,
  //             items: [...previousResult.videos.items, ...fetchMoreResult.videos.items]
  //           }
  //         }
  //       }
  //     })
  //   }
  // },
  components: {
    PostFilter,
    PostList,
    PostLoadMore
  }
}
</script>
