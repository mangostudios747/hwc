<template>
  <div class="flex h-full w-full">
    <form class="border-box box-container mx-auto my-auto"  @submit.prevent="sendReset" >
      <h2 class="text-xl font-bold">reset your password<span class="text-amber-500 text-2xl">.</span></h2>
      <input placeholder="email" class="inpt" v-model="email" >
      <button class="btn-link ml-auto" type="submit">send reset email</button>
    </form>
    <p v-if="err=='UserNotFound'">doesn't look like you have an account. <a href='/register'>make one?</a></p>
    <p v-else-if='s!==""'>an email was sent to {{s}}.</p>
  </div>
</template>

<script setup>
const { onLogin } = useApollo()
const router = useRouter();
const email = ref("")
const err = ref("")
const s = ref("")
const resetQuery = gql`
  mutation sendReset($email: EmailAddress!) {
  sendResetPasswordEmail(email: $email) {
    error
    success
  }
}
`
async function sendReset(){
  const {mutate} =  useMutation(resetQuery, {variables: {email: email.value}})
  const {data:{sendResetPasswordEmail: {success, error}}} = await mutate()
   if (error){
    err.value = error
    return
   }
   err.value = ""
   s.value = email.value
}



</script>


<style>

</style>