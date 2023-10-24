<template>
    <v-container>
        <span>
            Trwa aktywacja Twojego konta...
        </span>
    </v-container>
</template>

<script lang="ts" setup>
import { useAuthorizationStore } from '@/store/AuthorizationStore'
import { onMounted, ref} from 'vue'

const authorization = useAuthorizationStore()

onMounted(async() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    if (token) {
        await authorization.confirmRegistration(token)
    }
})
</script>