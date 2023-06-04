
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/apollo', '@nuxtjs/tailwindcss', 'nuxt-icon', 'nuxt-headlessui'],
  apollo: {
    clients: {
      default: {
        httpEndpoint:  'https://frozenmango747.uc.r.appspot.com' ||
          (process.env.NODE_ENV == 'production' ? 'https://frozenmango747.uc.r.appspot.com' : 'http://localhost:4000'),
        httpLinkOptions: {
          credentials: 'include'
        },
        defaultOptions: {
          fetchPolicy: "no-cache",
        }
      }
    }
  },
  tailwind: {
    
  },
  headlessui: {
    prefix: ''
}
})
