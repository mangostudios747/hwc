<template>
  <DialogPanel
              class="w-full text-white border-box max-w-md transform overflow-hidden  bg-black p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6"
              >
                Change Email Address
              </DialogTitle>
              <form>
              <div class="mt-6 w-full flex flex-col gap-6">
                <input v-model="newEmail" @input="({target})=>{target.classList.remove('invalid')}" @invalid="({target})=>{target.classList.add('invalid')}" required type="email" class="inpt invalid !w-full" placeholder="New Email"/>
                <input v-model="password" @input="({target})=>{target.classList.remove('invalid')}" @invalid="({target})=>{target.classList.add('invalid')}" required type="password" class="inpt !w-full" placeholder="Password"/>
              </div>

              <div class="mt-4 text-right">
                <button
                type="submit"
                  class="btn-link "
                  @submit.prevent="changeEmail"
                >
                  Change
                </button>
              </div>
              </form>
            </DialogPanel>
</template>

<script setup>
const newEmail = ref("")
const password = ref("")

const CHANGE_EMAIL = gql`
mutation ($newEmail: String!, $password: String!) {
  changeEmail(newEmail: $newEmail, password: $password) {
    token
  }
}
`

async function changeEmail(){
    const { mutate } = useMutation(CHANGE_EMAIL, { variables: { newEmail: newEmail.value, password: password.value }});
    const { data } = await mutate();
    navigateTo(`/app/settings`)
}

</script>

<style>

</style>