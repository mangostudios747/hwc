<template>
  <div>
    <h2>Settings</h2>
    <button @click="logout">logout</button>
    <button @click="deleteAccount" style="color:red;" >delete account</button>
  </div>
</template>

<script setup>
const { onLogout } = useApollo();
const router = useRouter()
function logout() {
  onLogout();
  router.push("/");
}

async function deleteAccount(){
  if (!confirm("are you sure you want to delete your account?")) return;
  const pwd = prompt("please enter your password to delete your account.");
  const deleteMutation = gql`
    mutation deleteAccount($password: String!) {
      deleteAccount(password: $password) {
        success
        error
      }
    }
  `
  const { mutate } = useMutation(deleteMutation, { variables: { password: pwd } });
  const {
    data: {
      deleteAccount: { success, error },
    },
  } = await mutate();
  if (success){
    return logout()
  }
  alert("account deletion not successful. your password was incorrect.")
}

</script>

<style>

</style>