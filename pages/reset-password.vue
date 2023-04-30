<template>
  <div>
    <form @submit.prevent="reset" style="flex-direction: column; display: flex; max-width: 15rem; gap: 1em; margin-top: 1em">
      <input type="password" placeholder="new password" v-model="password" >
      <input type="password" placeholder="confirm new password" v-model="password2" >
      <button type="submit" :disabled="password && password!=password2">set password</button>
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