

export default defineNuxtRouteMiddleware(async (to, from) => {
    //if (process.server) {
        console.log(to.fullPath, from.fullPath)
        const token = useCookie('apollo:default.token')
        const query = gql`
            query getMe($token: JWT!) {
                user(token: $token) {
                    username
                    email
                }
            }
            `;
        const {data: {value}} = await useAsyncQuery(query, { token: token.value });
        if (!value) {
            console.log("hi")
            useState("me", ()=> {
                return null
            })
        };
        useState("me", () => {
            return value.user
        })
    //}

})