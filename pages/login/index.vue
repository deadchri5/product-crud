<template>
    <section class="container">
        <div class="flex justify-center h-screen">
            <LoginForm />
        </div>
    </section>
</template>

<script scoped lang="ts">
import { defineComponent } from 'vue'
import LoginForm from '../../components/static/LoginForm.vue'

type user = {
    email: string
}

export default defineComponent({
    name: 'Login',
    components: {
        LoginForm
    }
})

</script>