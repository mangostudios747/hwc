<template>
  <div class="w-full h-full flex">
    <div class="mx-auto my-auto flex flex-col gap-8" v-if="err == 'Success'">
      <Icon class="mx-auto text-emerald-400" size="10em" name="heroicons:check-circle-solid"/>
      <p class=" text-2xl">Your email was successfully verified!</p>
    </div>
    <div v-else>
      redirecting you... <br />
      {{ err }}
    </div>
  </div>
</template>

<script setup>
const { onLogin } = useApollo();
const router = useRouter();
const route = useRoute();
const err = ref("");

const verifyQuery = gql`
  mutation verifyEmail($token: JWT!) {
    verifyEmail(token: $token) {
      token
      error
    }
  }
`;
async function verify() {
  const { mutate } = useMutation(verifyQuery, {
    variables: { token: route.query.id },
  });
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
  //router.push("/app");
}

verify();
</script>

<style>
</style>