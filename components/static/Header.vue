<template>
    <nav class="flex justify-between p-4 px-8 bg-[#5fcebc] fixed w-full top-0 z-10">
        <span class="text-2xl font-bold text-neutral-900">
            <NuxtLink to="/">Products</NuxtLink>
        </span>
        <NuxtLink as="button" to="/login">
            <button class="flex items-center gap-2 text-lg rounded-lg py-1 px-2 border border-solid hover:bg-slate-700 hover:text-slate-100">
                <Icon name="ant-design:user-outlined" color="black" />
                {{ logButtonText }}
            </button>
        </NuxtLink>
    </nav>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/stores/userStore'
const userStore = useUserStore()

const logButtonText = computed({
    get() {
       return userStore.getEmail ? userStore.getEmail : 'Login' 
    },
    set() {
        
    }
})

</script>