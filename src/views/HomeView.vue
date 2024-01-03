<template>
  <v-container>
    <Filters/>
    <Landing v-if="!points.isLoading && points.points.length === 0 && !points.isSearchBtnClicked"/>
    <span v-if="!points.isLoading && points.points.length === 0 && !filters.filtersAreEmpty() && points.isSearchBtnClicked">Brak punktów spełniających podane kryteria.</span>
    <v-progress-circular v-if="points.isLoading" indeterminate color="blue"></v-progress-circular>
    <div v-else-if="!points.isLoading && points.points.length">
        <v-row class="elevation-12" no-gutters justify="center">
            <v-col cols="12" class="d-none d-sm-block">
                <Map mode="list" class="map-cstm"></Map>
            </v-col>
        </v-row>
        <v-row>
            <Point v-for="point in points.points" :key="point.id" :point="point"></Point>
        </v-row>
    </div>
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
/*.points-wrapper {*/
/*  max-height: calc(100vh - 256px);*/
/*  overflow-y: scroll;*/
/*  overflow-x: hidden;*/
/*}*/

.map-cstm {
    height: 350px;
    max-height: 350px;
}
</style>
