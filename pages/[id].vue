<template>
    <div class="mt-16">
        <template v-if="!item">
            <section class="h-[92vh] flex text-lg text-gray-300 font-bold text-center bg-[#282d2c] p-5 flex-col">
                <div class="m-auto">
                    <p>{{ errorMessage  }}</p>
                    <NuxtLink as = "button" to="/">
                        <UButton class="mt-3">Go back</UButton>
                    </NuxtLink>
                </div>
            </section>
        </template>
        <template v-else>
            <section class="h-[92vh] flex flex-row gap-5 bg-[#282d2c] justify-center items-center p-4">
                <img class="w-[300px] h-[300px] object-cover" src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" alt="product">
                <div class="text-gray-300 flex flex-col gap-5 max-w-[50%]">
                    <h3 class="text-4xl font-bold">{{ item.name }}</h3>
                    <p>{{ item.description }}</p>
                    <p>{{ formatter.format(item.price) }}</p>
                    <p>{{ timeAgo(item.created_at) }}</p>
                </div>
            </section>
        </template>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'timeago.js'
import { useUserStore } from '~/stores/userStore'
import type Item from '~/dtos/Item'
const route = useRoute()

const errorMessage = ref('')

const { data, error } = await useFetch<Item|null>(`/api/items?id=${route.params.id}`)

if (error.value) {
    errorMessage.value = error.value.data?.message
}

const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
})

const timeAgo = (date: string) => {
  return format(date)
}


const item = data.value
</script>