
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/apollo', '@nuxtjs/tailwindcss', 'nuxt-icon', 'nuxt-headlessui'],
  apollo: {
    clients: {
      default: {
        httpEndpoint:  //'https://frozenmango747.uc.r.appspot.com/graphql' ||
          (process.env.NODE_ENV == 'production' ? 'https://frozenmango747.uc.r.appspot.com/graphql' : 'http://localhost:4000/graphql'),
        httpLinkOptions: {
          credentials: 'include'
        },
        defaultOptions: {
          fetchPolicy: "no-cache",
        },
        wsEndpoint: //'wss://frozenmango747.uc.r.appspot.com/graphql' ||
        (process.env.NODE_ENV == 'production' ? 'wss://frozenmango747.uc.r.appspot.com/graphqlws' : 'ws://localhost:4000/graphqlws'),
      
      }
    }
  },
  tailwind: {
    
  },
  headlessui: {
    prefix: ''
}
})
