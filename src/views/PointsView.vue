<template>
    <v-container>
        <v-progress-circular v-if="points.isLoading" indeterminate color="blue"></v-progress-circular>
        <Point v-else v-for="point in points.points" :key="point.id" :point="point"></Point>
        <span v-if="!points.isLoading && !points.points.length">Brak punktów spełniających podane kryteria.</span>
    </v-container>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePointsStore } from '@/store/PointsStore'
import { useFiltersStore } from '@/store/FiltersStore'
import Point from '@/components/Points/Point.vue';

const points = usePointsStore()
const filters = useFiltersStore()

onMounted(() => {
    // if ((filters.filters.range == 0 || typeof filters.filters.range == "undefined") && filters.filters.city == "" && filters.filters.wasteTypesNames.length == 0) {
    //     points.points = []
    //     points.getPoints()
    // }
    // else {
    //     points.points = []
        points.getFilteredPoints()
    // }
})

</script>

