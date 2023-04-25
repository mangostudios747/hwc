import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/apollo'],
  apollo: {
    clients: {
      default: {
        httpEndpoint: // 'https://frozenmango747.uc.r.appspot.com',
        'http://localhost:4000',
        httpLinkOptions: {
          credentials: 'include'
        }
      }
    }
  },
})
