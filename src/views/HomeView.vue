<template>
  <v-container>
      <v-alert
              v-if="points.showAddedPointAlert"
              closable
              type="success"
              variant="tonal"
              class="mb-6"
      >
          Dodawanie punktu zakończone sukcesem.
      </v-alert>
    <Filters/>
    <Landing v-if="!points.isLoading && points.points.length === 0 && !points.isSearchBtnClicked"/>
    <span v-if="!points.isLoading && points.points.length === 0 && !filters.filtersAreEmpty() && points.isSearchBtnClicked">Brak punktów spełniających podane kryteria.</span>
    <v-progress-circular v-if="points.isLoading" indeterminate color="blue"></v-progress-circular>
    <v-row v-else-if="!points.isLoading && points.points.length" class="elevation-12 main-wrapper" no-gutters>
      <v-col cols="12" sm="4" class="points-wrapper">
        <Point v-for="point in points.points" :key="point.id" :point="point"></Point>
      </v-col>
      <v-col cols="8" class="d-none d-sm-block">
        <Map mode="list"></Map>
      </v-col>
    </v-row>
    <Pagination v-if="!points.isLoading && points.points.length"></Pagination>
  </v-container>
</template>

<script lang="ts" setup>
import Filters from '@/components/Home/Filters.vue';
import Landing from '@/components/Home/Landing.vue';
import Point from "@/components/Home/Point.vue";
import Map from "@/components/Utils/Map.vue";
import Pagination from "@/components/Home/Pagination.vue";
import {usePointsStore} from '@/store/PointsStore'
import {useFiltersStore} from '@/store/FiltersStore'

const points = usePointsStore()
const filters = useFiltersStore()

</script>

<style>
.main-wrapper {
  overflow-y: scroll;
  height: 65vh;
}

.points-wrapper {
  max-height: calc(100vh - 64px);
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
