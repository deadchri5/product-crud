<template>
    <div class="container mx-auto px-4">
        <!-- Action buttons section -->
        <Actions />
        <!-- Cards section -->
        <div class="flex flex-wrap gap-3 justify-center">
            <div v-for="i in [1,2,3,4,5,6]" :key="i">
                <ProductCard />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ProductCard from '../components/product/ProductCard.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            h: 1,
        }
    }
})

</script>

<style lang="">
    
</style>