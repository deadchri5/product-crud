<template>
    <div class="bg-[#282d2c] rounded-lg text-gray-200 hover:cursor-pointer flex flex-col
            w-[200px] md:w-[400px] overflow-hidden transition duration-100 ease-in border-2
            hover:border-solid hover:border-2 hover:border-cyan-700">
        <NuxtLink :to="`/${item.id}`">
            <div class="overflow-hidden">
                <img
                class="w-full h-[200px] object-cover rounded-tl-lg rounded-tr-lg transition duration-100 ease-in hover:scale-110"
                src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" alt="product"
                >
            </div>
            <div class="p-4 overflow-hidden">
                <p>{{ item.name  }}</p>
                <p class="text-sm font-thin h-10 mb-2">{{ item.description.slice(0, 100) }}</p>
                <p>{{ formattedPrice }}</p>
                <p>{{ timeUpdated }}</p>
            </div>
        </NuxtLink>
        <div class="w-full">
            <button
            type="button"
            @click="handleDelete()"
            class="bg-[#d9534f] p-2 rounded-lg rounded-t-none rounded-br-none w-[50%] transition duration-100 ease-in hover:bg-red-900"
            >
                Delete
            </button>
            <button
                type="button"
                @click="openModal"
                class="bg-[#5bc0de] p-2 rounded-lg rounded-t-none rounded-bl-none w-[50%] transition duration-100 ease-in hover:bg-blue-900"
            >
                Edit
            </button>
        </div>
    </div>
    <UModal v-model="showModal">
      <div class="p-6 flex flex-col gap-2">
        <p>Name</p>
        <UInput v-model="formCustom.name" />
        <p>Description</p>
        <UTextarea v-model="formCustom.description" />
        <p>Price</p>
        <UInput :type="'number'" placeholder="Price" v-model="formCustom.price">
            <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">MXN</span>
            </template>
        </UInput>
        <div class="flex justify-end">
            <UButton 
                class="mt-6 w-[90px] justify-center"
                color="primary"
                variant="solid"
                @click="updateProduct"
            >
                Edit
            </UButton>
        </div>
        </div>
    </UModal>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Swal from 'sweetalert2'
import { format } from 'timeago.js'
import type Item from '~/dtos/Item';

type defaultResponse = {
    message: string
}

export default defineComponent({
    emits: ['updateProducts'],
    data() {
        return {
            showModal: false,
            formattedPrice: '',
            timeUpdated: '',
            formCustom: {} as Item
        }
    },
    props: {
        item: {
            required: true,
            type: Object as () => Item
        }
    },
    watch: {
        item(newVal: Item) {
            const formatter = new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
            })
            this.formattedPrice = formatter.format(newVal.price)
        }
    },
    mounted() {
        this.formCustom = {...this.$props.item}
        const formatter = new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
        })
        this.formattedPrice = formatter.format(this.$props.item.price)
        this.timeUpdated = this.timeAgo(this.$props.item.updated_at)
    },
    methods: {
        async deleteProduct(id: string) {

            const { data, error } = await useFetch<defaultResponse>('/api/items', {
                method: 'DELETE',
                params: {
                    id
                }
            })
            if (error.value) {
                Swal.fire({
                    icon: "error",
                    title: "Error Deleting Product",
                    text: error.value.message,
                })
                return
            }
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: data.value?.message,
                showConfirmButton: false,
                timer: 2500
            })
            this.$emit('updateProducts')
        },
        handleDelete() {
            Swal.fire({
                title: "This Item will be deleted permanently, are you sure?",
                showDenyButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Go back`,
                denyButtonColor: '#5bc0de',
                confirmButtonColor: '#d9534f'
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        this.deleteProduct(this.item.id)
                    } else if (result.isDenied) {
                        return
                    }
                })
        },
        async editProduct() {
            this.openModal()
        },
        openModal(): void {
            this.showModal = !this.showModal
        },
        async updateProduct() {
            const { data, error } = await useFetch<defaultResponse>('/api/items', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    id: this.item.id
                },
                body: {
                    name: this.formCustom.name,
                    description: this.formCustom.description,
                    price: this.formCustom.price
                }
            })
            if (error.value) {
                console.log('se produjo un error')
                return
            }
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: data.value?.message,
                showConfirmButton: false,
                timer: 1500
            })
            this.openModal()
            this.$emit('updateProducts')
        },
        timeAgo(date: string) {
            return format(date, 'es-MX')
        }
    }
})
</script>