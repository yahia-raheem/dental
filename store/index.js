export const state = () => ({

})

export const actions = {
    async nuxtServerInit({dispatch}) {
        await dispatch('general/getHeaderOptions')
        await dispatch('general/getSocialMedia')
    }
}