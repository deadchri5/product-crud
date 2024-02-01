import { useUserStore } from '~/stores/userStore'
import { jwtDecode } from "jwt-decode"

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()

    if (userStore.getToken.length === 0) {
        return navigateTo('/login')
    }
    try {
        jwtDecode(userStore.getToken)
    } catch (error) {
        return navigateTo('/login')
    }

})
