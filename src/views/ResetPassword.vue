<template>
    <v-container>
        <v-sheet width="500px" class="mx-auto">
            <v-form @submit.prevent="authorization.resetPassword($event)">
                <v-text-field
                        v-model="authorization.resetPasswordPassword"
                        :rules="authorization.resetPasswordPasswordRules"
                        label="Hasło"
                        type="password"
                ></v-text-field>
                <v-btn type="submit" block color="#B0E8BC" text="#112A46" class="mt-4">Zresetuj hasło</v-btn>
            </v-form>
        </v-sheet>
    </v-container>
</template>

<script lang="ts" setup>
import { useAuthorizationStore } from '@/store/AuthorizationStore'

const authorization = useAuthorizationStore()
</script>