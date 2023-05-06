
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/apollo', '@nuxtjs/tailwindcss'],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://frozenmango747.uc.r.appspot.com', // process.env.NODE_ENV == 'production' ? 'https://frozenmango747.uc.r.appspot.com' : 'http://localhost:4000',
        httpLinkOptions: {
          credentials: 'include'
        }
      }
    }
  },
})
