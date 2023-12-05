<template>
    <v-container>
        <v-list class="text-left">
            <v-list-item><span>Nazwa użytkownika: </span><span class="font-weight-bold">{{ authorization.currentUser.username }}</span></v-list-item>
            <v-list-item><span>Email: </span><span class="font-weight-bold">{{ authorization.currentUser.email }}</span></v-list-item>
        </v-list>
        <v-list v-if="points.dynamicPoints.length" class="text-left">
                <v-list-item>Punkty dynamiczne:</v-list-item>
                <router-link v-for="dynamicPoint in points.dynamicPoints" :to="{
                                name: 'point',
                                params: {
                                  id: dynamicPoint.id
                                }
                              }">
                    <v-list-item class="text-h5 text-black">{{ dynamicPoint.name }}</v-list-item>
                </router-link>
        </v-list>
    </v-container>
</template>

<script lang="ts" setup>
import {useAuthorizationStore} from "@/store/AuthorizationStore";
import {onMounted} from "vue";
import {usePointsStore} from "@/store/PointsStore";

const authorization = useAuthorizationStore()
const points = usePointsStore()

onMounted(() => {
    points.getDynamicPoints(authorization.currentUser.id)
})
</script>