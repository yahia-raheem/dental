export default function ({ $auth }) {
    $auth.onRedirect((to, from) => {
        if (from == '/auth/register') {
            return '/auth/register'
        }
    })
}