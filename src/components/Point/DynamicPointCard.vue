<template>
    <v-card class="mx-auto">
        <v-card-title class="text-left mt-2 ml-1">{{ points.currentPoint?.name }}</v-card-title>
        <v-card-text class="text-left mt-2 ml-1">{{ points.currentPoint.dynamicPointInfo?.description }}</v-card-text>
        <v-list class="text-left d-block" density="compact">
            <v-list-item v-if="points.currentPoint?.city"><v-icon icon="mdi-map-marker" class="mr-2"></v-icon>{{ address }}</v-list-item>
            <v-list-item v-if="points.currentPoint?.phoneNumber"><v-icon icon="mdi-phone" class="mr-2"></v-icon>{{ points.currentPoint?.phoneNumber }}</v-list-item>
            <v-list-item><v-icon icon="mdi-calendar-range" class="mr-2"></v-icon>{{ dates }}</v-list-item>
        </v-list>
        <WasteTypesChips mode="detail" :is-dynamic="true" :waste-types="points.currentPoint.dynamicPointInfo?.additionalWasteTypes"></WasteTypesChips>
        <Comments :pointId="points.currentPoint.id"></Comments>
    </v-card>
</template>
<script lang="ts" setup>
import WasteTypesChips from "@/components/Point/WasteTypesChips.vue";
import Comments from "@/components/Point/Comments.vue";
import {usePointsStore} from "@/store/PointsStore";
const points = usePointsStore()
import { computed } from 'vue'
import moment from "moment";
import config from "@/config/config";

const address = computed(() => {
    return `${points.currentPoint.city}, ${points.currentPoint.street} ${points.currentPoint.zipcode}`
})
const dates = computed(() => {
    return `${formatDateFromDbToUser(points.currentPoint.dynamicPointInfo.startDate)} - ${formatDateFromDbToUser(points.currentPoint.dynamicPointInfo.endDate)}`
})

function formatDateFromDbToUser(date: string) {
    return moment(points.currentPoint.dynamicPointInfo.startDate, config.dbDateFormat).format(config.userDateFormat)
}
</script>