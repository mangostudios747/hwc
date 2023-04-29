<template>
  <div>redirecting you...</div>
  <div>{{err}}</div>
</template>

<script setup>
const { onLogin } = useApollo();
const router = useRouter();
const route = useRoute()
const err = ref("")

const verifyQuery = gql`
  mutation verifyEmail($token: JWT!) {
    verifyEmail(token: $token) {
      token
      error
    }
  }
`;
async function verify() {
    
  const { mutate } = useMutation(verifyQuery, { variables: { token: route.query.id } });
  const {
    data: {
      verifyEmail: { token, error },
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

verify();
</script>

<style>
</style>