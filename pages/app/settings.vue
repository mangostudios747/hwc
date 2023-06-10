<template>
  <div class="mt-8 mx-16">
    <h2 class="text-4xl !font-semibold btn-link">Settings</h2>
    <div class="mt-8 flex gap-8 flex-col">
      <div class="border-box px-12 py-4">
        <h3 class="listheading">Profile</h3>
        <div class="listbox flex flex-row gap-2">
          <span class="font-semibold w-24">Username</span>
          <span v-text="user.username" class=" listboxinput" />
        </div>
        <div class="listbox flex flex-row gap-2">
          <span class="font-semibold w-24">Email</span>
          <span v-text="user.email" class=" listboxinput" />
        </div>
      </div>

      <div class="border-box px-12 py-4">
        <h3 class="listheading">Account</h3>
        <button class="listbox">Change Username</button>
        <button class="listbox">Change Email</button>
        <button class="listbox" @click="logout">Logout</button>
        <button class="listbox" @click="deleteAccount" style="color: red">
          Delete Account
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useState("me");
const { onLogout } = useApollo();
const router = useRouter();
function logout() {
  onLogout();
  router.push("/");
}

async function deleteAccount() {
  if (!confirm("are you sure you want to delete your account?")) return;
  const pwd = prompt("please enter your password to delete your account.");
  const deleteMutation = gql`
    mutation deleteAccount($password: String!) {
      deleteAccount(password: $password) {
        success
        error
      }
    }
  `;
  const { mutate } = useMutation(deleteMutation, {
    variables: { password: pwd },
  });
  const {
    data: {
      deleteAccount: { success, error },
    },
  } = await mutate();
  if (success) {
    return logout();
  }
  alert("account deletion not successful. your password was incorrect.");
}
</script>

<style>
.listbox {
  @apply p-2 w-full h-full bg-opacity-0 bg-white hover:bg-opacity-10 text-left font-medium;
}

.listheading {
  @apply text-3xl font-semibold pt-4 pb-2; /* text-amber-400;/**/
}
</style>