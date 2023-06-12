<template>
  <div class="flex h-full w-full">
    <form @submit.prevent="reset" class="border-box box-container mx-auto my-auto">
      <h2 class="text-xl font-bold">reset your password<span class="text-amber-500 text-2xl">.</span></h2>
      <input type="password" autocomplete="new-password" class="inpt" placeholder="new password" v-model="password" >
      <input type="password" autocomplete="new-password" class="inpt" placeholder="confirm new password" v-model="password2" >
      <button type="submit" class="btn-link ml-auto" :disabled="password && password!=password2">set password</button>
    </form>
    <p>{{err}}</p>
  </div>
</template>

<script setup>
const password = ref("")
const password2 = ref("")
const { onLogin } = useApollo();
const router = useRouter();
const route = useRoute()
const err = ref("")

const resetQuery = gql`
  mutation resetPassword($token: JWT!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword) {
      token
      error
    }
  }
`;
async function reset() {
    
  const { mutate } = useMutation(resetQuery, { variables: { token: route.query.id, newPassword: password.value } });
  const {
    data: {
      resetPassword: { token, error },
    },
  } = await mutate();
  if (error) {
    err.value = error;
    return;
  }
  err.value = "Success";
  onLogin(token);
  router.push("/app");
}
</script>

<style>

</style>