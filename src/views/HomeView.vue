<template>
      <v-container>
          <Filters/>
          <v-progress-circular v-if="points.isLoading" indeterminate color="blue"></v-progress-circular>
          <Point v-else v-for="point in points.points" :key="point.id" :point="point"></Point>
          <Pagination></Pagination>
          <span v-if="!points.isLoading && !points.points.length && !filters.filtersAreEmpty()">Brak punktów spełniających podane kryteria.</span>
      </v-container>
  <div>
  </div>
</template>

<script lang="ts" setup>
import Filters from '@/components/Home/Filters.vue';
import Point from "@/components/Points/Point.vue";
import Pagination from "@/components/Points/Pagination.vue";
import { usePointsStore } from '@/store/PointsStore'
import { useFiltersStore } from '@/store/FiltersStore'
import { onMounted } from 'vue'

const points = usePointsStore()
const filters = useFiltersStore()


onMounted(() => {
    points.getPoints()
})
</script>
