<template>
  <v-container>
    <v-card :style="{ maxWidth: '300px', margin: 'auto', marginBottom: '80px', padding: '20px' }">
      <v-card-title class="text-center">
        <span>{{ authorization.currentUser.username }}</span>
      </v-card-title>
      <v-card-subtitle class="text-center grey--text">
        <span>{{ authorization.currentUser.email }}</span>
      </v-card-subtitle>
      <v-card-text>
        <v-card color="blue1">
          <v-card-title>Punkty Dynamiczne</v-card-title>
          <v-card-text :style="{ fontSize: '20px' }">{{ points.dynamicPoints.length }}</v-card-text>
        </v-card>
      </v-card-text>
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