<template>
    <v-container>
        <v-sheet max-width="500px" class="mx-auto">
            <v-form @submit.prevent="authorization.register($event)">
                <v-text-field
                    v-model="authorization.registerUsername"
                    :rules="authorization.registerUsernameRules"
                    label="Login"
                ></v-text-field>
                <v-text-field
                    v-model="authorization.registerEmail"
                    :rules="authorization.registerEmailRules"
                    label="Email"
                    type="email"
                ></v-text-field>
                <v-text-field
                    v-model="authorization.registerPassword"
                    :rules="authorization.registerPasswordRules"
                    label="Hasło"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append-inner="showPassword = !showPassword"
                    counter
                ></v-text-field>
                <v-text-field
                    v-model="authorization.registerConfirmPassword"
                    :rules="authorization.registerConfirmPasswordRules"
                    label="Powtórz hasło"
                    :append-inner-icon="showRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showRepeatPassword ? 'text' : 'password'"
                    @click:append-inner="showRepeatPassword = !showRepeatPassword"
                    counter
                ></v-text-field>
                <router-link to="/login"><span class="float-right mb-3 text-decoration-underline font-weight-light">Posiadasz już konto?</span></router-link>
                <v-btn type="submit" block color="#B0E8BC" text="112A46">Zarejestruj się</v-btn>
            </v-form>
            <v-alert color="error" variant="text" v-show="authorization.registerError">{{ authorization.registerError }}</v-alert>
        </v-sheet>
    </v-container>
</template>

<script lang="ts" setup>
import { useAuthorizationStore } from '@/store/AuthorizationStore'
import {ref} from "vue";

const authorization = useAuthorizationStore()

const showPassword = ref(false)
const showRepeatPassword = ref(false)
</script>
