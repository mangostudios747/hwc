<template>
  <DialogPanel
              class="w-full text-white border-box max-w-md transform overflow-hidden  bg-black p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6"
              >
                Change Username
              </DialogTitle>
              <div class="mt-6 w-full flex flex-col gap-6">
                <input v-model="title" class="inpt !w-full" placeholder="New Email"/>
                <input v-model="title" type="password" class="inpt !w-full" placeholder="Password"/>
              </div>

              <div class="mt-4 text-right">
                <button
                  class="btn-link "
                  @click="createSpace"
                >
                  Change
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