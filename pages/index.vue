<template>
  <div>
    <post-big-card :post="allPosts[0]"></post-big-card>
    <div class="mt-6">
      <!-- <post-filter :filters="filters" v-model="filter"></post-filter> -->
      <post-sort :sortFields="sortFields" v-model="sort" ></post-sort>
      <post-list :posts="allPosts"></post-list>
      <post-load-more :fetchData="loadMore" :loading="loading" :hasMore="hasMore"></post-load-more>
    </div>
  </div>
</template>

<script>
import allPosts from '@/apollo/queries/allPosts'
import PostBigCard from '@/components/PostBigCard'
import PostList from '@/components/PostList'
import PostFilter from '@/components/PostFilter'
import PostSort from '@/components/PostSort'
import PostLoadMore from '@/components/PostLoadMore'

const sortFieldBinding = {
  Date: 'publishedAt',
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
          sortField: 'publishedAt',
          sortOrder: 'desc'
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
    sort (val, oldval) {
      this.page = 0// TODO Fix page (is not 0 each time)
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
    PostFilter,
    PostList,
    PostLoadMore,
    PostBigCard,
    PostSort
  }
}
</script>
