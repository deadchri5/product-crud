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
    </div>
</template>

<script lang="ts">
import ProductCard from '../components/product/ProductCard.vue'
import ButtonActions from '~/components/actions/ButtonActions.vue';
import { defineComponent } from 'vue';
import type Item from '~/dtos/Item'

export default defineComponent({
    components: {
        ProductCard,
        ButtonActions
    },
    data() {
        return {
            products: [] as Item[]|null
        }
    },
    async mounted() {
        this.getProducts()
    },
    methods: {
        async handleUpdate () {
            console.log('logg')
            const { data } = await useFetch<Item[]|null>('/api/items', {
                method: 'GET'
            })
            this.products = data.value
            console.log('log')
        },
        async getProducts () {
            const { data, error } = await useFetch<Item[]|null>('/api/items', {
                method: 'GET'
            })
            if (error) {
                if (this.products === null || this.products.length === 0) {
                    this.getProducts()
                }
                console.log(error)
            }
            this.products = data.value
        }
    }
})

</script>

<style>
    
</style>