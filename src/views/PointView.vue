<template>
    <v-container>
        <v-row class="elevation-12 main-wrapper" no-gutters>
            <v-col cols="6" class="points-wrapper">
                <v-card class="mx-auto" height="100%">
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
                        <CurrentAvailability v-if="points.currentPoint.openingHours" :opening-hours="points.currentPoint.openingHours"></CurrentAvailability>
                        <v-list-item link v-if="points.currentPoint.website"><v-icon icon="mdi-web" class="mr-2"></v-icon><a :href="points.currentPoint.website" target="_blank">{{ points.getShortenedWebsite(points.currentPoint.website) }}</a></v-list-item>
                        <v-list-item v-if="points.currentPoint.phoneNumber"><v-icon icon="mdi-phone" class="mr-2"></v-icon>
                            {{ points.currentPoint.phoneNumber }}</v-list-item>
                    </v-list>
                    <div>Tu beda komentarze</div>
                    <div>i inne chuje muje</div>
                </v-card>
            </v-col>
            <v-col cols="6">
                <Map mode="detail"></Map>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts" setup>
import { onMounted, ref} from 'vue'
import { usePointsStore, Point } from '@/store/PointsStore'
import { useRoute } from 'vue-router'
import WasteTypesChips from "@/components/Point/WasteTypesChips.vue";
import CurrentAvailability from "@/components/Point/CurrentAvailability.vue";
import Map from "@/components/Utils/Map.vue";

const points = usePointsStore()
</script>

