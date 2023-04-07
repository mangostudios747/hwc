<template>
  <div>omg you made it
    <button @click="logout">logout</button>
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