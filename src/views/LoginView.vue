<template>
    <v-container>
        <v-sheet width="500px" class="mx-auto">
            <v-form @submit.prevent="authorization.login($event)">
                <v-text-field
                    v-model="authorization.loginUsername"
                    :rules="authorization.loginUsernameRules"
                    label="Login"
                ></v-text-field>
                <v-text-field
                    v-model="authorization.loginPassword"
                    :rules="authorization.loginPasswordRules"
                    label="Hasło"
                ></v-text-field>
                <router-link to="/"><span class="float-right mb-3 text-decoration-underline font-weight-light">Zapomniałeś hasła?</span></router-link>
                <v-btn type="submit" block color="green" class="text-white mt-12 mb-6">Zaloguj się</v-btn>
            </v-form>
            <v-alert color="error" variant="text" v-show="!authorization.loginSuccessful">Nieprawidłowe dane logowania</v-alert>
        </v-sheet>
    </v-container>
</template>

<script lang="ts" setup>
import { useAuthorizationStore } from '@/store/AuthorizationStore'

const authorization = useAuthorizationStore()
</script>