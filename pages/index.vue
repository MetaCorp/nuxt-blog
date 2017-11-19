<template>
  <div>
    <nuxt-link to="/test">To Test</nuxt-link>
    <video-filter :filters="filters" v-model="currentFilter"></video-filter>
    <video-list :videos="videos.items"></video-list>
    <video-load-more :fetchData="loadMore" :loading="loading" :hasMore="videos.nextPageToken"></video-load-more>
  </div>
</template>

<script>
import allVideos from '@/apollo/queries/videos'
import VideoList from '@/components/VideoList'
import VideoFilter from '@/components/VideoFilter'
import VideoLoadMore from '@/components/VideoLoadMore'

export default {
  data () {
    return {
      currentFilter: 'Development',
      filters: ['Music', 'Physic', 'Development'],
      videos: {},
      loading: false
    }
  },
  apollo: {
    videos: {
      prefetch: true,
      query: allVideos
    }
  },
  methods: {
    loadMore () {
      this.loading = true
      this.$apollo.queries.videos.fetchMore({
        variables: {
          pageToken: this.videos.nextPageToken
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          console.log('fetchMoreResult :', fetchMoreResult)
          this.loading = false
          return {
            videos: {
              ...fetchMoreResult.videos,
              items: [...previousResult.videos.items, ...fetchMoreResult.videos.items]
            }
          }
        }
      })
    }
  },
  components: {
    VideoFilter,
    VideoList,
    VideoLoadMore
  }
}
</script>
