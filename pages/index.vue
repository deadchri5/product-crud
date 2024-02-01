<template>
    <div class="container mx-auto px-4">
        <!-- Action buttons section -->
        <ButtonActions @update-products="handleUpdate"/>
        <!-- Cards section -->
        <div class="flex flex-wrap gap-3 justify-center">
            <div v-for="(val, i) in products" :key="i">
                <ProductCard @update-products="handleUpdate" :item="val" />
            </div>
        </div>
        <p class="text-black">
            {{ userStore.getEmail }}
        </p>
    </div>
</template>

<script setup lang="ts">
import ProductCard from '../components/product/ProductCard.vue'
import ButtonActions from '~/components/actions/ButtonActions.vue'
import { useUserStore } from '~/stores/userStore'
import { ref } from 'vue'
import type Item from '~/dtos/Item'

const userStore = useUserStore()

const products = ref<Item[]|null>([])

definePageMeta({
    middleware: ['auth']
})


async function handleUpdate () {
    const { data } = await useFetch<Item[]|null>('/api/items', {
        method: 'GET'
    })
    products.value = data.value
}

async function getProducts () {
    const { data, error } = await useFetch<Item[]|null>('/api/items', {
        method: 'GET'
    })
    if (error.value) {
        if (products.value === null || products.value.length === 0) {
            getProducts()
        }
    }
    products.value = data.value
}

getProducts()

</script>
