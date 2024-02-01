import { defineStore } from 'pinia'
import type User from '~/dtos/User'

type user = Pick<User, 'email'>

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            email: '',
        },
        token: ''
    }),
    actions: {
        setUser(user: user) {
            this.user = user
        },
        updateEmail(email: string) {
            this.user.email = email
        },
        setToken(token: string) {
            this.token = token
        }
    },
    getters: {
        getEmail: (state) => state.user.email,
        getToken: (state) => state.token
    }
})
