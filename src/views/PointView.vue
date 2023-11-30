<template>
    <v-container>
        <router-link to="/">
            <v-btn prepend-icon="mdi-arrow-left" variant="text" color="#112A46" class="mb-3 d-flex">Powrót do listy</v-btn>
        </router-link>
        <v-row class="elevation-12 main-wrapper" no-gutters>
            <v-col cols="6" class="points-wrapper">
                <v-card class="mx-auto">
                    <v-img
                            class="align-end text-white"
                            height="200"
                            :src="points.currentPoint.imageLink ? points.currentPoint.imageLink : require('../assets/images/default.png')"
                            cover
                    >
                    </v-img>
                    <v-card-title class="text-left mt-2 ml-1">{{ points.currentPoint.name }}</v-card-title>
                    <WasteTypesChips :waste-types="points.currentPoint.wasteTypes"></WasteTypesChips>
                    <v-list class="text-left d-block" density="compact">
                        <v-list-item v-if="points.currentPoint.city"><v-icon icon="mdi-map-marker" class="mr-2"></v-icon>{{ points.currentPoint.city }}</v-list-item>
                        <v-menu v-if="!points.currentPoint.isDynamic"  location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn
                                    variant="flat"
                                    v-bind="props"
                                    append-icon="mdi-menu-down"
                                >
                                    <CurrentAvailability v-if="points.currentPoint.openingHours" :opening-hours="points.currentPoint.openingHours"></CurrentAvailability>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(item, index) in config.weekDays" :key="index">
                                    <v-list-item-title>
                                        <span>{{ item }}</span>
                                        <span>: </span>
                                        <span class="font-weight-thin">{{ points.getOpeningHoursForDay(index) }}</span>
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-list-item link v-if="points.currentPoint.website"><v-icon icon="mdi-web" class="mr-2"></v-icon><a :href="points.currentPoint.website" target="_blank">{{ points.getShortenedWebsite(points.currentPoint.website) }}</a></v-list-item>
                        <v-list-item v-if="points.currentPoint.phoneNumber"><v-icon icon="mdi-phone" class="mr-2"></v-icon>
                            {{ points.currentPoint.phoneNumber }}</v-list-item>
                    </v-list>
                    <Comments :pointId="points.currentPoint.id"></Comments>
                </v-card>
            </v-col>
            <v-col cols="6">
                <Map mode="detail"></Map>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts" setup>
import { usePointsStore } from '@/store/PointsStore'
import WasteTypesChips from "@/components/Point/WasteTypesChips.vue";
import CurrentAvailability from "@/components/Point/CurrentAvailability.vue";
import Comments from '@/components/Point/Comments.vue'
import Map from "@/components/Utils/Map.vue";
import config from '@/config/config'

const points = usePointsStore()
</script>

<style scoped>
.points-wrapper {
    overflow-y: scroll;
    overflow-x: hidden;
    min-height: 100%;
    height: 100%;
}

a {
    text-decoration: none;
}
</style>