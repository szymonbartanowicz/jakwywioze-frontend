<template>
      <v-container>
          <Filters/>
          <v-progress-circular v-if="points.isLoading" indeterminate color="blue"></v-progress-circular>
          <v-row v-else class="elevation-12 main-wrapper" no-gutters>
              <v-col cols="4" class="points-wrapper">
                  <Point v-for="point in points.points" :key="point.id" :point="point"></Point>
              </v-col>
              <v-col cols="8">
                  <Map mode="list"></Map>
              </v-col>
          </v-row>
          <span v-if="!points.isLoading && !points.points.length && !filters.filtersAreEmpty()">Brak punktów spełniających podane kryteria.</span>
          <Pagination v-show="!points.isLoading" v-else></Pagination>
      </v-container>
  <div>
  </div>
</template>

<script lang="ts" setup>
import Filters from '@/components/Home/Filters.vue';
import Point from "@/components/Home/Point.vue";
import Pagination from "@/components/Home/Pagination.vue";
import Map from "@/components/Utils/Map.vue";
import { usePointsStore } from '@/store/PointsStore'
import { useFiltersStore } from '@/store/FiltersStore'
import { onMounted } from 'vue'

const points = usePointsStore()
const filters = useFiltersStore()

onMounted(() => {
    points.getPoints()
})
</script>

<style>
.main-wrapper {
    max-height: calc(100vh - 64px);
}

.points-wrapper {
    max-height: calc(100vh - 64px);
    overflow: scroll;
}
</style>
