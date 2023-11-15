<template>
    <v-container>
        <v-sheet width="500px" class="mx-auto">
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
                ></v-text-field>
                <v-text-field
                    v-model="authorization.registerPassword"
                    :rules="authorization.registerPasswordRules"
                    label="Hasło"
                    type="password"
                ></v-text-field>
                <v-text-field
                    v-model="authorization.registerConfirmPassword"
                    :rules="authorization.registerConfirmPasswordRules"
                    label="Powtórz hasło"
                    type="password"
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

const authorization = useAuthorizationStore()
</script>
