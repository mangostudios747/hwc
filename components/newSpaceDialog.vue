<template>
  <DialogPanel
              class="w-full text-white border-box max-w-md transform overflow-hidden  bg-black p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6"
              >
                Create Space
              </DialogTitle>
              <div class="mt-4">
                <input v-model="title" class="inpt" placeholder="Title"/>
              </div>

              <div class="mt-4 text-right">
                <button
                  class="btn-link "
                  @click="createSpace"
                >
                  Create
                </button>
              </div>
            </DialogPanel>
</template>

<script setup>
const title = ref("")

const CREATE_SPACE = gql`
mutation ($title: String!) {
  newSpace(title: $title) {
    _id
  }
}
`

async function createSpace(){
    const { mutate } = useMutation(CREATE_SPACE, { variables: { title: title.value }});
    const { data: {
        newSpace: {
            _id
        }
    }} = await mutate();
    navigateTo(`/app/${_id}`)
}

</script>

<style>

</style>