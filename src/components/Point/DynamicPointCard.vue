<template>
    <v-card class="mx-auto">
        <v-card-title class="text-left mt-2 ml-1">{{ points.currentPoint?.name }}</v-card-title>
        <v-card-text class="text-left mt-2 ml-1">{{ points.currentPoint.dynamicPointInfo?.description }}</v-card-text>
        <v-list class="text-left d-block" density="compact">
            <v-list-item v-if="points.currentPoint?.city"><v-icon icon="mdi-map-marker" class="mr-2" color="#0000FF"></v-icon>{{ address }}</v-list-item>
            <v-list-item v-if="points.currentPoint?.phoneNumber"><v-icon icon="mdi-phone" class="mr-2"></v-icon>{{ points.currentPoint?.phoneNumber }}</v-list-item>
            <v-list-item><v-icon icon="mdi-calendar-range" class="mr-2"></v-icon>{{ dates }}</v-list-item>
            <v-list-item>
                <v-btn
                    v-if="points.currentPoint?.lat && points.currentPoint?.lon"
                    @click="points.setRouteToPoint(points.currentPoint.lat, points.currentPoint.lon)"
                    :loading="points.disableSetRouteBtnDetail"
                    :disabled="points.disableSetRouteBtnDetail"
                    variant="flat" color="green" class="my-2">Trasa
                </v-btn>
                <router-link :to="{
                            name: 'edit-dynamic-point',
                            params: {
                              id: points.currentPoint.id
                            }
                          }">
                    <v-btn
                        v-if="points.currentPoint.isDynamic && points.currentPoint.dynamicPointInfo.user === authorization.currentUser?.id"
                        variant="flat" color="blue2" class="my-2 ml-2">Edytuj
                    </v-btn>
                </router-link>
                <v-btn
                    v-if="points.currentPoint.isDynamic && points.currentPoint.dynamicPointInfo.user === authorization.currentUser?.id"
                    @click="points.deleteDynamicPoint(points.currentPoint.id)"
                    variant="flat" color="red" class="my-2 ml-2">Usuń
                </v-btn>
            </v-list-item>
        </v-list>
        <WasteTypesChips mode="detail" :is-dynamic="true" :waste-types="points.currentPoint.dynamicPointInfo.additionalWasteTypes"></WasteTypesChips>
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
import {useAuthorizationStore} from "@/store/AuthorizationStore";
const authorization = useAuthorizationStore()

const address = computed(() => {
    return `${points.currentPoint.city}, ${points.currentPoint.street}`
})
const dates = computed(() => {
    return `${formatDateFromDbToUser(points.currentPoint.dynamicPointInfo.startDate)} - ${formatDateFromDbToUser(points.currentPoint.dynamicPointInfo.endDate)}`
})

function formatDateFromDbToUser(date: string) {
    return moment(date, config.dbDateFormat).format(config.userDateFormat)
}
</script>