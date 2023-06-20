import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
 const useAuthStore = defineStore('auth', async () => {
    const { getToken } = useApollo()
    const token = computed(async ()=>{await getToken()})
    const ME_QUERY = gql`
        query getMe($token: JWT!) {
            user(token: $token) {
                username
                email
            }
        }`;
    const me = computed(async ()=>{
        const {data: {value}} = await useAsyncQuery(ME_QUERY, { token: token });
        console.log(value)
        return value
    })
    return {
        me,
        token
    }
})