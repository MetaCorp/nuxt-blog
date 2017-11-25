<template>
  <div>
    <post-sort :sortFields="sortFields" v-model="sort"></post-sort>
    <post-list :posts="allPosts"></post-list>
    <post-load-more :fetchData="loadMore" :loading="loading" :hasMore="hasMore"></post-load-more>
  </div>
</template>

<script>
import POSTS_ALL from '@/apollo/queries/PostsAll'
import PostList from '@/components/PostList'
import PostLoadMore from '@/components/PostLoadMore'
import PostSort from '@/components/PostSort'

const sortFieldBinding = {
  Date: 'published_at',
  Views: 'views'
}

export default {
  data () {
    return {
      allPosts: [],
      loading: false,
      hasMore: true,
      page: 0,
      sortFields: ['Date', 'Views'],
      sort: {
        field: 'Date',
        order: 'desc'
      }
    }
  },
  apollo: {
    allPosts: {
      prefetch: true,
      query: POSTS_ALL,
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
          perPage: 5,
          sortField: sortFieldBinding[this.sort.field],
          sortOrder: this.sort.order
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
  watch: {
    sort (val, oldVal) {
      this.page = 0
      this.hasMore = true
      this.$apollo.queries.allPosts.executeApollo({
        page: this.page,
        perPage: 5,
        sortField: sortFieldBinding[this.sort.field],
        sortOrder: this.sort.order
      })
    }
  },
  components: {
    PostList,
    PostLoadMore,
    PostSort
  },
  validate: ({ params }) => /^\d+$/.test(params.id)
}
</script>
