<template>
  <div class="flex h-full w-full">
    <form
      class="border-box box-container mx-auto my-auto"
      @submit.prevent="register"
    >
      <h2 class="text-xl font-bold">register<span class="text-amber-500 text-2xl">.</span></h2>
      <input class="inpt" placeholder="email" v-model="email" />
      <input class="inpt" placeholder="username" v-model="username" />
      <input class="inpt" placeholder="password" type="password" v-model="password" />
      <button class="btn-link text-right" type="submit">register</button>
    </form>
  </div>
</template>
<script setup>
const { onLogin } = useApollo();
const router = useRouter();
const email = ref("");
const username = ref("");
const password = ref("");

const registerQuery = gql`
  mutation register($email: EmailAddress!, $password: String!, $username: String!) {
    register(email: $email, password: $password, username: $username) {
      token
    }
  }
`;
async function register() {
  const { mutate } = useMutation(registerQuery, {
    variables: {
      email: email.value,
      password: password.value,
      username: username.value,
    },
  });
  const {
    data: { register: {token} },
  } = await mutate();
  if (!token) {
    console.log("hi??")
    return;
  }
  onLogin(token);
  router.push("/app");
}
</script>

