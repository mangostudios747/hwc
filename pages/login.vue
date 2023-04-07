<template>
  <div>

    <form @submit.prevent="login" style="flex-direction: column; display: flex; max-width: 15rem; gap: 1em; margin-top: 1em">
      <input v-model="email" >
      <input type="password" v-model="password" >
      <button type="submit">login</button>
    </form>
    
    <div v-if="invalidCredentials" >invalid credentials</div>
  </div>
</template>
<script setup>
const { onLogin } = useApollo()
const router = useRouter();
const email = ref("")
const password = ref("")
const invalidCredentials = ref(false)

const loginQuery = gql`
  mutation login($email: EmailAddress!, $password: String!) {
  login(email: $email, password: $password)
}
`
async function login(){
  const {mutate} =  useMutation(loginQuery, {variables: {email: email.value, password: password.value}})
  const {data:{login:token}} = await mutate()
   if (!token){
    invalidCredentials.value = true
    return
   }
   invalidCredentials.value = false
   onLogin(token)
   router.push('/app')
}



</script>

