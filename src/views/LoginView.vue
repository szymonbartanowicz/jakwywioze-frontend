<template>
    <v-container>
        <v-alert
            v-if="authorization.loginMessageStatus==='accountCreated'"
            closable
            type="info"
            variant="tonal"
            class="mb-6"
        >
            Dziękujemy za założenie konta. W celu jego aktywacji prosimy o kliknięcie w linka, którego właśnie otrzymałeś na podanego maila.
        </v-alert>
        <v-alert
            v-else-if="authorization.loginMessageStatus==='registrationConfirmed'"
            closable
            type="success"
            variant="tonal"
            class="mb-6"
        >
            Twoje konto zostało aktywowane.
        </v-alert>
        <v-alert
            v-else-if="authorization.loginMessageStatus==='passwordResetSuccessfully'"
            closable
            type="success"
            variant="tonal"
            class="mb-6"
        >
            Twoje hasło zostało zresetowane.
        </v-alert>
        <v-sheet width="500px" class="mx-auto">
            <v-form @submit.prevent="authorization.login($event)">
                <v-text-field
                    v-model="authorization.loginEmail"
                    :rules="authorization.loginEmailRules"
                    label="Email"
                    type="email"
                ></v-text-field>
                <v-text-field
                    v-model="authorization.loginPassword"
                    :rules="authorization.loginPasswordRules"
                    label="Hasło"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append-inner="showPassword = !showPassword"
                    counter
                ></v-text-field>
                <router-link to="/send-reset-password-email"><span class="float-right mb-3 text-decoration-underline font-weight-light">Zapomniałeś hasła?</span></router-link>
                <v-btn type="submit" block color="#B0E8BC" text="#112A46" class="mt-12 mb-6">Zaloguj się</v-btn>
            </v-form>
            <v-alert color="error" variant="text" v-show="!authorization.loginSuccessful">Nieprawidłowe dane logowania</v-alert>
        </v-sheet>
    </v-container>
</template>

<script lang="ts" setup>
import { useAuthorizationStore } from '@/store/AuthorizationStore'
import {ref} from "vue";

const authorization = useAuthorizationStore()

const showPassword = ref(false)
</script>