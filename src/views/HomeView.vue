<template>
      <v-container>
          <Filters/>
          <v-progress-circular v-if="points.isLoading" indeterminate color="blue"></v-progress-circular>
          <Point v-else v-for="point in points.points" :key="point.id" :point="point"></Point>
          <span v-if="!points.isLoading && !points.points.length && !filters.filtersAreEmpty()">Brak punktów spełniających podane kryteria.</span>
      </v-container>
  <div>
  </div>
</template>

<script lang="ts" setup>
import Filters from '@/components/Home/Filters.vue';
import Point from "@/components/Points/Point.vue";
import { usePointsStore } from '@/store/PointsStore'
import { useFiltersStore } from '@/store/FiltersStore'

const points = usePointsStore()
const filters = useFiltersStore()

</script>
