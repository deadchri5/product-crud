<template>
    <section class="m-auto flex justify-center items-center my-8">
        <button 
                @click="openModal" 
                class="
                border-solid border-[#5fcebc] p-2 border-2 
                flex gap-2 items-center font-bold
                rounded-lg hover:bg-[#282d2c] hover:text-gray-300
                "
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