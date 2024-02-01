<template>
    <div class="rounded-lg bg-gray-50 p-6 text-black text-xl w-[40%] m-auto">
        <h2>{{ form.title }}</h2>
        <form @submit.prevent="registerUser">
            <span class="mb-6 text-sm">Email</span>
            <UInput
                color="white"
                aria-label="user"
                variant="outline"
                placeholder="user@example.com"
                v-model="email"
            />
            <span class="mb-6 mt-4 text-sm">Password</span>
            <UInput
                color="white"
                aria-label="user"
                variant="outline"
                placeholder="password"
                type="password"
                v-model="password"
            />
            <span v-if="showLoginMessage" class="text-sm mt-3">
                Do you have an account? 
                <span @click="changeFunction" class="text-blue-500 hover:cursor-pointer">
                    Login
                </span>
            </span>
            <div class="mt-4 flex justify-end">
                <UButton type="submit" color="white" variant="solid">
                    Submit
                </UButton>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'
import { useUserStore } from '~/stores/userStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const router = useRouter()
const userStore = useUserStore()

interface IResgiterError {
    data: {
        message: string
    }
}
interface IResgiter {
    message: string
}

interface ILogin {
    email: string
    token: string
}

const email = ref('')
const password = ref('')
const form = ref({
    title: 'Register'
})
const showLoginMessage = ref(true)

async function registerUser() {
    if (!showLoginMessage.value) {
        loginUser()
        return
    }
    const { data, error } = await useFetch<IResgiter, IResgiterError>('/api/user/register', {
        method: 'POST',
        body: {
            email: email,
            password: password
        }
    })
    if (error.value) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: error.value?.data?.message,
            showConfirmButton: false,
            timer: 2500
        })
        return
    }
    Swal.fire({
        position: "center",
        icon: "success",
        title: data.value?.message,
        showConfirmButton: false,
        timer: 2500
    })
    router.push('/login')
}

async function loginUser() {
    const { data, error } = await useFetch<ILogin>('/api/user/login', {
        method: 'POST',
        body: {
            email: email,
            password: password
        }
    })
    if (error.value) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: 'Error',
            showConfirmButton: false,
            timer: 2500
        })
        return
    }
    // save token
    const token = data.value?.token
    if (token) {
        localStorage.setItem('token', token)
        userStore.setToken(token)
        userStore.updateEmail(email.value)
        Swal.fire({
            position: "center",
            icon: "success",
            title: data.value?.email,
            showConfirmButton: false,
            timer: 2500
        })
        router.push('/')
    }
}

async function changeFunction() {
    form.value.title = 'Login'
    showLoginMessage.value = false
}

</script>