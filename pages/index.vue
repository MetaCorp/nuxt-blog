<template>
  <div>
    <post-big-card :post="postPagination.items[0]"></post-big-card>
    <div class="mt-6">
      <!-- <post-filter :filters="filters" v-model="filter"></post-filter> -->
      <post-sort :sortFields="sortFields" v-model="sort" ></post-sort>
      <post-list :posts="postPagination.items"></post-list>
      <post-load-more :fetchData="loadMore" :loading="loading" :hasMore="postPagination.pageInfo.hasNextPage"></post-load-more>
    </div>
  </div>
</template>

<script>
import POST_PAGINATION from '@/apollo/queries/PostPagination'
import PostBigCard from '@/components/PostBigCard'
import PostList from '@/components/PostList'
import PostFilter from '@/components/PostFilter'
import PostSort from '@/components/PostSort'
import PostLoadMore from '@/components/PostLoadMore'

const sortFieldBinding = {
  Date: 'published_at',
  Views: 'views'
}

export default {
  data () {
    return {
      filters: ['Music', 'Physic', 'Development'],
      filter: 'Development',
      sortFields: ['Date', 'Views'],
      sort: {
        field: 'Date',
        order: 'desc'
      },
      postPagination: {
        items: [],
        pageInfo: {}
      },
      loading: false,
      hasMore: true,
      page: 0
    }
  },
  apollo: {
    postPagination: {
      prefetch: true,
      query: POST_PAGINATION,
      variables () {
        return {
          page: 0,
          perPage: 5,
          sortField: 'published_at',
          sortOrder: 'desc'
        }
      }
    }
  },
  methods: {
    loadMore () {
      this.loading = true
      this.page++
      this.$apollo.queries.postPagination.fetchMore({
        variables: {
          page: this.page,
          perPage: 5,
          sortField: sortFieldBinding[this.sort.field],
          sortOrder: this.sort.order
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (fetchMoreResult.posts.length === 0) this.hasMore = false
          this.loading = false
          return {
            posts: [
              ...previousResult.posts,
              ...fetchMoreResult.posts
            ]
          }
        }
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log('to :', to)
    next()
  },
  watch: {
    sort (val, oldval) {
      this.page = 0// TODO Fix page (is not 0 each time)
      this.hasMore = true
      this.$apollo.queries.posts.executeApollo({
        page: this.page,
        perPage: 5,
        sortField: sortFieldBinding[val.field],
        sortOrder: val.order
      })
      // this.$router.push({ query: {
      //   sortField: sortFieldBinding[val.field],
      //   sortOrder: val.order
      // } })
    }
  },
  components: {
    PostFilter,
    PostList,
    PostLoadMore,
    PostBigCard,
    PostSort
  }
}
</script>
