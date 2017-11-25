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

export default {
  data () {
    return {
      filters: ['Music', 'Physic', 'Development'],
      filter: 'Development',
      sortFields: ['created_at', 'views'],
      sort: {
        field: 'created_at',
        order: 'desc'
      },
      postPagination: {
        items: [],
        pageInfo: {}
      },
      loading: false,
      page: 1
    }
  },
  apollo: {
    postPagination: {
      // prefetch: true,
      query: POST_PAGINATION,
      variables () {
        return {
          page: 1,
          perPage: 5,
          sort: this.sortQuery || 'CREATED_AT_DESC'
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
          sort: this.sortQuery || 'CREATED_AT_DESC'
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          this.loading = false
          return {
            postPagination: {
              ...fetchMoreResult.postPagination,
              items: [
                ...previousResult.postPagination.items,
                ...fetchMoreResult.postPagination.items
              ]
            }
          }
        }
      })
    }
  },
  computed: {
    sortQuery () {
      return this.sort.field.toUpperCase() + '_' + this.sort.order.toUpperCase()
    }
  },
  created () {
    this.sort = {
      field: this.$route.query.sort || 'created_at',
      order: this.$route.query.order || 'desc'
    }
  },
  watch: {
    sort (newVal, oldVal) { // TODO
      this.$router.push({
        path: this.$route.path,
        query: {
          sort: newVal.field,
          order: newVal.order,
          filter: {}
        }
      })
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
