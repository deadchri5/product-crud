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
    <UModal v-model="showModal">
      <div class="p-6 flex flex-col gap-2">
        <p>Name</p>
        <UInput v-model="name" />
        <p>Description</p>
        <UTextarea v-model="description" />
        <p>Price</p>
        <UInput :type="'number'" placeholder="Price" v-model="price">
            <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">MXN</span>
            </template>
        </UInput>
        <div class="flex justify-end">
            <UButton 
                class="mt-6 w-[90px] justify-center"
                color="primary"
                variant="solid"
                @click="addItem"
            >
                Add
            </UButton>
        </div>
        </div>
    </UModal>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

type defaultMessage = {
    message: string
}

export default defineComponent({
    data() {
        return {
            name: '',
            description: '',
            price: 0,
            showModal: false
        }
    },
    methods: {
        openModal(): void {
            this.showModal = !this.showModal
        },
        async addItem() {
            const { data, error } = await useFetch<defaultMessage>('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    name: this.name,
                    description: this.description,
                    price: this.price
                }
            })
            if (error.value) {
                const message = error.value.data?.message
                if (message) {
                    alert('Endpoint says: ' + message)
                } else {
                    alert('Error on add item')
                }
                return
            }
            this.openModal()
            this.name = ''
            this.description = ''
            this.price = 0
            this.$emit('updateProducts')
        }
    }
})
</script>