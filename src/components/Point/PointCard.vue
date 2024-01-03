<template>
    <v-card class="mx-auto">
        <v-img
                class="align-end text-white"
                height="200"
                :src="points.currentPoint.imageLink ? points.currentPoint.imageLink : require('../../assets/images/default.png')"
                cover
        >
        </v-img>
        <v-card-title class="text-left mt-2 ml-1">{{ points.currentPoint.name }}</v-card-title>
        <v-list class="text-left d-block" density="compact">
            <v-list-item v-if="points.currentPoint.city"><v-icon icon="mdi-map-marker" class="mr-2"></v-icon>{{ points.currentPoint.city }}</v-list-item>
            <v-menu location="bottom">
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
            <v-list-item v-if="points.currentPoint.phoneNumber"><v-icon icon="mdi-phone" class="mr-2"></v-icon>{{ points.currentPoint.phoneNumber }}</v-list-item>
            <v-list-item
                v-if="points.currentPoint?.lat && points.currentPoint?.lon">
                <v-btn
                    @click="points.setRouteToPoint(points.currentPoint.lat, points.currentPoint.lon)"
                    :loading="points.disableSetRouteBtnDetail"
                    :disabled="points.disableSetRouteBtnDetail"
                    variant="flat" color="green" class="my-2">Trasa
                </v-btn>
            </v-list-item>
        </v-list>
        <WasteTypesChips mode="detail" :is-dynamic="false" :waste-types="points.currentPoint.wasteTypes"></WasteTypesChips>
        <Comments :pointId="points.currentPoint.id"></Comments>
    </v-card>
</template>
<script lang="ts" setup>
import config from "@/config/config";
import WasteTypesChips from "@/components/Point/WasteTypesChips.vue";
import CurrentAvailability from "@/components/Point/CurrentAvailability.vue";
import Comments from "@/components/Point/Comments.vue";
import {usePointsStore} from "@/store/PointsStore";
const points = usePointsStore()
</script>