<template>
  <div>
    <div class="header overflow-hidden" style="background-image:url(http://via.placeholder.com/350x150)">
      
    </div>

    <div class="bg-white">
      <div class="quill-editor max-w-lg mx-auto p-4 border-none"
        v-model="body"
        v-quill:myQuillEditor="editorOption">
      </div>
    </div>
    <div class="flex justify-end max-w-lg p-4 mx-auto">
      <button @click="createPost" class="bg-white hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
        Send
      </button>
    </div>
  </div>
</template>

<script>
import POSTS_ALL from '@/apollo/queries/PostsAll'
import POSTS_CREATE from '@/apollo/queries/PostsCreate'

export default {
  data () {
    return {
      body: '<p>I am Example</p>',
      editorOption: {
        // some quill options
      }
    }
  },
  methods: {
    createPost () {
      const newPost = {
        id: '7',
        title: 'Test',
        body: this.body,
        user_id: '456',
        tag_id: '202',
        published_at: new Date()
      }
      const queryVariables = {
        page: 0,
        perPage: 5,
        sortField: 'published_at',
        sortOrder: 'desc'
      }

      this.$apollo.mutate({
        mutation: POSTS_CREATE,
        variables: newPost,
        // Update the cache with the result
        // The query will be updated with the optimistic response
        // and then with the real result of the mutation
        update: (store, { data: { createPost } }) => {
          console.log('store :', store)
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: POSTS_ALL,
            variables: queryVariables
          })
          // Add our tag from the mutation to the end
          console.log('data :', data.allPosts)
          data.allPosts.push(createPost)
          // Write our data back to the cache.
          store.writeQuery({
            query: POSTS_ALL,
            data,
            variables: queryVariables
          })
        },
        // Optimistic UI
        // Will be treated as a 'fake' result as soon as the request is made
        // so that the UI can react quickly and the user be happy
        optimisticResponse: {
          __typename: 'Mutation',
          createPost: {
            __typename: 'Post',
            ...newPost,
            views: 0,
            User: {
              __typename: 'User',
              id: 0,
              name: 'Me'
            }
          }
        }
      }).then((data) => {
        // Result
        console.log('createPost success: ', data)
      }).catch((error) => {
        // Error
        console.error('createPost failure: ', error)
        // We restore the initial user input
      })
    }
  },
  layout: 'full'
}
</script>

<style scoped>
.quill-editor {
  margin: 0 auto;
  border: none;
}

.header {
  height: 540px;
  background-size: cover;
  background-position: center; 
}
</style>

