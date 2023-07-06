<template>
    <v-container>
        <v-progress-circular v-if="points.isLoading" indeterminate color="blue"></v-progress-circular>
        <Point v-else v-for="point in points.points" :key="point.id" :point="point"></Point>
        <span v-if="!points.isLoading && !points.points.length">Brak punktów spełniających podane kryteria.</span>
    </v-container>
</template>
<script lang="ts" setup>
import { usePointsStore } from '@/store/PointsStore'
import Point from '@/components/Points/Point.vue';

const points = usePointsStore()
</script>

