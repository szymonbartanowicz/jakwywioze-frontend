<template>
    <v-container>
        <v-snackbar
            v-model="points.showAddedPointAlert"
            timeout="2000"
        >
            Dodawanie punktu zakończone sukcesem.
            <template v-slot:actions>
                <v-btn
                    color="pink"
                    variant="text"
                    @click="points.showAddedPointAlert = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
        <v-snackbar
            v-model="points.showEditedPointAlert"
            timeout="2000"
        >
            Edytowanie punktu zakończone sukcesem.
            <template v-slot:actions>
                <v-btn
                    color="pink"
                    variant="text"
                    @click="points.showEditedPointAlert = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
        <v-snackbar
            v-model="points.showDeletedPointAlert"
            timeout="2000"
        >
            Usuwanie punktu zakończone sukcesem.
            <template v-slot:actions>
                <v-btn
                    color="pink"
                    variant="text"
                    @click="points.showDeletedPointAlert = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
        <v-alert
            v-if="points.showDeletedPointAlert"
            closable
            type="success"
            variant="tonal"
            class="mb-6"
        >
            Usuwanie punktu zakończone sukcesem.
        </v-alert>
        <v-card :style="{ maxWidth: '300px', margin: 'auto', marginBottom: '80px', padding: '20px' }">
            <v-card-title class="text-center">
                <span>{{ authorization.currentUser.username }}</span>
            </v-card-title>
            <v-card-subtitle class="text-center grey--text">
                <span>{{ authorization.currentUser.email }}</span>
            </v-card-subtitle>
        </v-card>
        <v-row v-if="points.dynamicPoints.length" class="px-4">
            <Point v-for="point in points.dynamicPoints" :key="point.id" :point="point"></Point>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import {useAuthorizationStore} from "@/store/AuthorizationStore";
import {onMounted} from "vue";
import {usePointsStore} from "@/store/PointsStore";
import Point from "@/components/Home/Point.vue";

const authorization = useAuthorizationStore()
const points = usePointsStore()

onMounted(() => {
  points.getDynamicPoints(authorization.currentUser.id)
})
</script>