<template>
    <section class="m-auto flex justify-center items-center mt-28 mb-8">
        <button 
                @click="openModal" 
                class=" p-2 bg-[#2eafa8] flex gap-2 items-center font-bold text-gray-100
                rounded-lg hover:bg-[#282d2c] hover:text-gray-300"
                >
            <Icon name="ant-design:thunderbolt-filled" color="#FDE767" size="25"/>
            Add Product
        </button>
    </section>
</template>
<script lang="ts">
export default {
    data() {
        return {
            showModal: false
        }
    },
    methods: {
        openModal(): void {
            this.showModal = !this.showModal
        }
    }
}
</script>
<style lang="ts">
    
</style>