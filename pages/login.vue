<template>
  <div>

    <form @submit.prevent="login" style="flex-direction: column; display: flex; max-width: 15rem; gap: 1em; margin-top: 1em">
      <input v-model="email" >
      <input type="password" v-model="password" >
      <button type="submit">login</button>
    </form>
    
    <div v-if="err=='invalidCredentials'" >invalid credentials</div>
    <div v-if="err=='emailUnverified'" >please verify your email to log in</div>
  </div>
</template>
<script setup>
const { onLogin } = useApollo()
const router = useRouter();
const email = ref("")
const password = ref("")
const err = ref(null)

const loginQuery = gql`
  mutation login($email: EmailAddress!, $password: String!) {
  login(email: $email, password: $password)
}
`
async function login(){
  const {mutate} =  useMutation(loginQuery, {variables: {email: email.value, password: password.value}})
  const {data:{login}} = await mutate()
   if (!login.token){

    err.value = login.error
    return
   }
   error.value = null
   onLogin(login.token)
   router.push('/app')
}



</script>

