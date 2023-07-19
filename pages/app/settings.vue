<template>
  <div class="mt-8 mx-16 w-full h-full">
    <h2 class="text-4xl !font-semibold btn-link">Settings</h2>
    <div class="mt-8 flex gap-8 flex-col">
      <div v-if="user" class="border-box px-12 py-4">
        <h3 class="listheading">Profile</h3>
        <div class="listbox flex flex-row gap-2">
          <span class="font-semibold w-28">Username</span>
          <span v-text="user.username" class="listboxinput" />
          <button @click="()=>openModal('username')" disabled class="text-amber-400/50 font-semibold"> Change </button>          
        </div>
        <div class="listbox flex flex-row gap-2">
          <span class="font-semibold w-28">Email</span>
          <span v-text="user.email" class="listboxinput" />
          <button @click="()=>openModal('email')" class="text-amber-400 font-semibold"> Change </button>
        </div>
      </div>

      <div class="border-box px-12 py-4">
        <h3 class="listheading">Account</h3>
        <button class="listbox" @click="logout">Logout</button>
        <button class="listbox" @click="deleteAccount" style="color: red">
          Delete Account
        </button>
      </div>
    </div>
    <TransitionRoot appear :show="isOpen.email" as="template">
    <Dialog as="div" @close="()=>closeModal('email')" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <change-email-dialog />
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <TransitionRoot appear :show="isOpen.username" as="template">
    <Dialog as="div" @close="()=>closeModal('username')" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <change-username-dialog />
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  </div>
</template>

<script setup>
const user = useState("me");
const { onLogout } = useApollo();
const router = useRouter();
async function logout() {
  await onLogout();
  user.value = null
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
    return await logout();
  }
  alert("account deletion not successful. your password was incorrect.");
}

const isOpen = ref({ email: false, username: false})

function closeModal(key) {
  isOpen.value[key] = false
}
function openModal(key) {
  isOpen.value[key] = true
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