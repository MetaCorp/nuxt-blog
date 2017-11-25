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
      <button @click="postCreate" class="bg-white hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
        Send
      </button>
    </div>
  </div>
</template>

<script>
import POST_PAGINATION from '@/apollo/queries/PostPagination'
import POST_CREATE from '@/apollo/queries/PostCreate'

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
    postCreate () {
      const newPost = {
        title: 'Test',
        body: this.body,
        userId: '5a1990998ea82dc069ec030b',
        tagIds: ['202']
      }
      const queryVariables = {
        page: 0,
        perPage: 5
        // sort: 'CREATEDAT_DESC'
      }

      this.$apollo.mutate({
        mutation: POST_CREATE,
        variables: {
          record: newPost
        },
        // Update the cache with the result
        // The query will be updated with the optimistic response
        // and then with the real result of the mutation
        update: (store, { data: { postCreate } }) => {
          console.log('store :', store)
          console.log('postCreate :', postCreate)
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: POST_PAGINATION,
            variables: queryVariables
          })
          // Add our tag from the mutation to the end
          console.log('data :', data)
          data.postPagination.items.push(postCreate.record)
          // Write our data back to the cache.
          store.writeQuery({
            query: POST_PAGINATION,
            data,
            variables: queryVariables
          })
        },
        // Optimistic UI
        // Will be treated as a 'fake' result as soon as the request is made
        // so that the UI can react quickly and the user be happy
        optimisticResponse: {
          __typename: 'Mutation',
          postCreate: {
            __typename: 'CreateOnePostModelPayload',
            recordId: -1,
            record: {
              __typename: 'Post',
              _id: -1,
              ...newPost,
              views: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
              user: {
                __typename: 'User',
                _id: -1,
                firstname: 'First',
                lastname: 'Last'
              },
              tags: [{
                __typename: 'Tag',
                _id: -1,
                name: 'Tag'
              }]
            }
          }
        }
      }).then((data) => {
        // Result
        console.log('postCreate success: ', data)
      }).catch((error) => {
        // Error
        console.error('postCreate failure: ', error)
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

