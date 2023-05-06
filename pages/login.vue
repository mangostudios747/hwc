<template>
  <div class="flex h-full w-full">

    <form @submit.prevent="login" class="mx-auto my-auto border-box">
      <h2 class="text-xl font-bold">login<span class="text-amber-500 text-2xl">.</span></h2>
      <input class="inpt" placeholder="email" v-model="email" >
      <input class="inpt" placeholder="password" type="password" v-model="password" >
      <button class="btn-link text-right" type="submit">login</button>
      <a class="mt-12 link" href="/forgot-password">forgot password?</a>
    <div v-if="err=='incorrectCredentials'" >invalid credentials</div>
    <div v-if="err=='emailUnverified'">please verify your email to log in</div>
    </form>
    
  </div>
</template>
<style>

.inpt {
  @apply w-64 caret-amber-400 rounded-none placeholder:text-white/80 bg-transparent border-amber-400 border-b-2 ring-0 outline-none
}

.link {
  @apply text-amber-500 italic hover:underline
}

.border-box {
  @apply gap-8 border-amber-400 border px-12 py-10 flex flex-col
}
</style>
<script setup>
const { onLogin } = useApollo()
const router = useRouter();
const email = ref("")
const password = ref("")
const err = ref("")

const loginQuery = gql`
  mutation login($email: EmailAddress!, $password: String!) {
  login(email: $email, password: $password) {
    token
    error
  }
}
`
async function login(){
  const {mutate} =  useMutation(loginQuery, {variables: {email: email.value, password: password.value}})
  const {data:{login: {token, error}}} = await mutate()
   if (error){

    err.value = error
    return
   }
   err.value = ""
   onLogin(token)
   router.push('/app')
}
</script>

