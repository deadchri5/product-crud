<template>
    <div class="mt-16">
        <template v-if="!item">
            <section class="h-[85vh] flex text-lg text-gray-300 font-bold text-center bg-[#282d2c] p-5">
                <p class="m-auto">Item not found</p>
            </section>
        </template>
        <template v-else>
            <section class="h-[85vh] flex flex-row gap-5 bg-[#282d2c] justify-center items-center p-4">
                <img class="w-[300px] h-[300px] object-cover" src="https://coyote.ca/wp/wp-content/uploads/2013/09/generic_brands_web_700x650.jpg" alt="product">
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
import { format } from 'timeago.js'
import type Item from '~/dtos/Item'
const route = useRoute()
const { data } = await useFetch<Item|null>(`/api/items?id=${route.params.id}`)

const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
})

const timeAgo = (date: string) => {
  return format(date)
}


const item = data.value
</script>