<template>
  <div>
    <form
      @submit.prevent="register"
      style="
        flex-direction: column;
        display: flex;
        max-width: 15rem;
        gap: 1em;
        margin-top: 1em;
      "
    >
      <input placeholder="email" v-model="email" />
      <input placeholder="username" v-model="username" />
      <input placeholder="password" type="password" v-model="password" />
      <button type="submit">register</button>
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
    register(email: $email, password: $password, username: $username)
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
    data: { register: token },
  } = await mutate();
  if (!token) {
    console.log("hi??")
    return;
  }
  onLogin(token);
  router.push("/app");
}
</script>

