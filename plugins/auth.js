export default function ({ $auth }) {
    $auth.onRedirect((to, from) => {
        console.log(from);
        if (from == '/auth/register') {
            return '/auth/register'
        }
        console.log(to)
    })
}