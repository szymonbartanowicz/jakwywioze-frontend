<template>
    <v-container>
        <router-link to="/">
            <v-btn prepend-icon="mdi-arrow-left" variant="text" color="#112A46" class="mb-3 d-flex">Powrót do listy</v-btn>
        </router-link>
        <v-row class="elevation-12 main-wrapper" no-gutters>
            <v-col colse="12" sm="6" class="points-wrapper">
                <point-card v-if="!points.currentPoint.isDynamic"></point-card>
                <dynamic-point-card v-else></dynamic-point-card>
            </v-col>
            <v-col cols="6" class="d-none d-sm-block">
                <Map mode="detail"></Map>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts" setup>
import { usePointsStore } from '@/store/PointsStore'
import Map from "@/components/Utils/Map.vue";
import PointCard from "@/components/Point/PointCard.vue";
import DynamicPointCard from "@/components/Point/DynamicPointCard.vue";

const points = usePointsStore()
</script>

<style scoped>
.main-wrapper {
    overflow-y: scroll;
    overflow-x: hidden;
    min-height: calc(100vh - 250px);
    height: calc(100vh - 250px);
}

a {
    text-decoration: none;
}

.v-card--variant-elevated {
    box-shadow: none!important;
}
</style>