<template>
  <div class="flex flex-col w-full h-screen text-white bg-black">
    <nav class="flex border-b-2 border-white/10 flex-row">
      <h1 class="mr-auto m-4 font-extrabold text-lg">
        <a href="/"
          >homework central<span class="text-amber-500 text-2xl">.</span></a
        >
      </h1>
      <Menu as="div" class="relative inline-block text-left" v-if="user">
        <MenuButton
          class="w-52 border-l-2 border-white/10 inline-flex justify-center bg-white bg-opacity-0 h-full font-medium text-white hover:bg-opacity-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
          <span class="my-auto mx-auto px-4">{{ user.username }} <Icon class="ml-2" name="heroicons:chevron-down-solid"/></span>
          </MenuButton
        >
        <MenuItems
          class="absolute border-2 border-white/10 right-0 w-52 origin-top-right divide-y-2 divide-white/10 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
        <MenuItem
            as="a"
            href="/app/"
            class="menu-item"
            >
            Spaces
          </MenuItem>
          <MenuItem
            as="a"
            href="/app/settings"
            class="menu-item"
            >
            Settings
          </MenuItem>
        </MenuItems>
      </Menu>
      <div class="inline-flex gap-4 px-4" v-else>
        <a class="btn-link my-auto" href="/login">login</a>
        <a class="btn-link my-auto" href="/register">register</a>
      </div>
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup>
const user = useState("me");
</script>

<style>

.menu-item {
  @apply hover:bg-opacity-10 bg-white bg-opacity-0 flex w-full items-center px-4 py-2;
}
</style>