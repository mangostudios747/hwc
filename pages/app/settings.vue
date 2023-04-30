<template>
  <div>
    <h2>Settings</h2>
    <button @click="logout">logout</button>
    <button style="color:red;" >delete account</button>
  </div>
</template>

<script setup>
const { onLogout } = useApollo();
const router = useRouter()
function logout() {
  onLogout();
  router.push("/");
}

</script>

<style>

</style>