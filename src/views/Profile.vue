<template>
    <v-container>
        <v-list class="text-left">
            <v-list-item><span>Nazwa użytkownika: </span><span class="font-weight-bold">{{ authorization.currentUser.username }}</span></v-list-item>
            <v-list-item><span>Email: </span><span class="font-weight-bold">{{ authorization.currentUser.email }}</span></v-list-item>
            <v-list-item>Punkty dynamiczne:</v-list-item>
        </v-list>
    </v-container>
</template>

<script lang="ts" setup>
import {useAuthorizationStore} from "@/store/AuthorizationStore";

const authorization = useAuthorizationStore()
</script>