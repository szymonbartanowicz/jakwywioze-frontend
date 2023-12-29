<template>
    <v-container>
        <v-list class="text-left">
            <v-list-item><span>Nazwa użytkownika: </span><span class="font-weight-bold">{{ authorization.currentUser.username }}</span></v-list-item>
            <v-list-item><span>Email: </span><span class="font-weight-bold">{{ authorization.currentUser.email }}</span></v-list-item>
            <v-list-item><span>Twoje punkty dynamiczne:</span></v-list-item>
        </v-list>
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