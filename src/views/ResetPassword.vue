<template>
    <v-container>
        <v-sheet max-width="500px" class="mx-auto">
            <v-form @submit.prevent="authorization.resetPassword($event)">
                <v-text-field
                        v-model="authorization.resetPasswordPassword"
                        :rules="authorization.resetPasswordPasswordRules"
                        label="Hasło"
                        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append-inner="showPassword = !showPassword"
                        counter
                ></v-text-field>
                <v-text-field
                    v-model="authorization.resetPasswordConfirmPassword"
                    :rules="authorization.resetPasswordConfirmPasswordRules"
                    label="Powtórz hasło"
                    :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    @click:append-inner="showConfirmPassword = !showConfirmPassword"
                    counter
                ></v-text-field>
                <v-btn type="submit" block color="#B0E8BC" text="#112A46" class="mt-4">Zresetuj hasło</v-btn>
            </v-form>
        </v-sheet>
    </v-container>
</template>

<script lang="ts" setup>
import { useAuthorizationStore } from '@/store/AuthorizationStore'
import {ref} from "vue";

const authorization = useAuthorizationStore()

const showPassword = ref(false)
const showConfirmPassword = ref(false)
</script>