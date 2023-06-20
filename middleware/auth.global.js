

export default defineNuxtRouteMiddleware(async (to, from) => {
    //if (!process.server) {
        if (!to.path.startsWith("/app")){
           // return;
        }
        const user = useState("me", ()=> (null))
        const token = useCookie('apollo:default.token')
        if (!token.value){
            user.value = null;
            return;
        }
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
            user.value = null;
        }
        else {
            user.value = value.user;
        }
   // }

})