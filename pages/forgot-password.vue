<template>
  <div>oh no! you forgot your password! enter your email for a reset link:
    <form @submit.prevent="sendReset" style="flex-direction: column; display: flex; max-width: 15rem; gap: 1em; margin-top: 1em">
      <input v-model="email" >
      <button type="submit">send password reset email</button>
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