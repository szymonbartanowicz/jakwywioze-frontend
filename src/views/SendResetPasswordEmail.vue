<template>
    <v-container>
        <v-alert
            v-if="authorization.showResetEmailSendMessage"
            closable
            type="info"
            variant="tonal"
            class="mb-6"
        >
            Na podany adres email został wysłany link resetujący hasło.
        </v-alert>
        <v-sheet width="500px" class="mx-auto">
            <v-form @submit.prevent="authorization.sendResetPasswordEmail($event)">
                <v-text-field
                        v-model="authorization.sendResetPasswordEmailEmail"
                        :rules="authorization.sendResetPasswordEmailEmailRules"
                        label="Email"
                ></v-text-field>
                <v-btn type="submit" block color="#B0E8BC" text="#112A46" class="mt-4">Wyślij linka resetującego hasło</v-btn>
            </v-form>
        </v-sheet>
    </v-container>
</template>

<script lang="ts" setup>
import { useAuthorizationStore } from '@/store/AuthorizationStore'

const authorization = useAuthorizationStore()
</script>