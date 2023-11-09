<template>
  <v-container>
    <Filters />
    <Landing v-if="(points.points.length <= 0)" />
    <v-progress-circular v-if="points.isLoading && !(points.points.length <= 0)" indeterminate color="blue" />
    <v-row v-if="!points.isLoading && !(points.points.length <= 0)" class="elevation-12 main-wrapper" no-gutters>
      <v-col cols="4" class="points-wrapper">
        <Point v-for="point in points.points" :key="point.id" :point="point" />
      </v-col>
      <v-col cols="8">
        <Map mode="list" />
      </v-col>
    </v-row>
    <span v-if="!points.isLoading && !points.points.length && !filters.filtersAreEmpty() && !(points.points.length <= 0)">Brak punktów spełniających podane kryteria.</span>
  </v-container>
</template>

<script lang="ts" setup>
import Filters from '@/components/Home/Filters.vue';
import Landing from '@/components/Home/Landing.vue';
import Point from "@/components/Home/Point.vue";
import Map from "@/components/Utils/Map.vue";
import { usePointsStore } from '@/store/PointsStore'
import { useFiltersStore } from '@/store/FiltersStore'

const points = usePointsStore()
const filters = useFiltersStore()

</script>

<style>
.main-wrapper {
  height: 70vh;
  overflow-y: hidden;
}

.points-wrapper {
  max-height: calc(100vh - 64px);
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
