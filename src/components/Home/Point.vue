<template>
    <v-col cols="12" sm="6" class="points-wrapper">
    <v-card class="elevation-6" min-height="500px">
        <router-link :to="{
                            name: 'point',
                            params: {
                              id: point.id
                            }
                          }">
            <v-img
                class="align-end text-white"
                height="200"
                :src="point.imageLink ? point.imageLink : require('../../assets/images/default.png')"
                cover
            >
            </v-img>
        </router-link>
        <v-card-title class="text-left mt-2 ml-1 router-link-custom">
            <router-link :to="{
                            name: 'point',
                            params: {
                              id: point.id
                            }
                          }">
                    {{ point.name }}
            </router-link>
        </v-card-title>
        <WasteTypesChips mode="list" :waste-types="point.wasteTypes"></WasteTypesChips>
        <v-list class="text-left d-block" density="compact">
            <v-list-item v-if="point.city"><v-icon icon="mdi-map-marker" class="mr-2" :color="point.isDynamic ? '#0000FF' : 'black'"></v-icon>{{ point.city }}</v-list-item>
            <CurrentAvailability v-if="point.openingHours" :opening-hours="point.openingHours" class="ml-4"></CurrentAvailability>
            <v-list-item link v-if="point.website"><v-icon icon="mdi-web" class="mr-2"></v-icon><a :href="point.website" target="_blank">{{ points.getShortenedWebsite(point.website) }}</a></v-list-item>
            <v-list-item v-if="point.phoneNumber"><v-icon icon="mdi-phone" class="mr-2"></v-icon>
                {{ point.phoneNumber }}</v-list-item>
            <v-list-item class="pl-2 my-2">
                <v-btn
                    :loading="points.disableSetRouteBtnList"
                    :disabled="points.disableSetRouteBtnList"
                    @click="points.setRouteToPoint(point.lat, point.lon)"
                    variant="flat"
                    color="green"
                    class="ml-2 showRoute">
                    Trasa
                </v-btn>
                <router-link :to="{
                            name: 'edit-dynamic-point',
                            params: {
                              id: point.id
                            }
                          }">
                    <v-btn
                        v-if="point.isDynamic && point.dynamicPointInfo.user === authorization.currentUser?.id"
                        variant="flat" color="blue2" class="my-2 ml-2">Edytuj
                    </v-btn>
                </router-link>
                <v-btn
                    v-if="point.isDynamic && point.dynamicPointInfo.user === authorization.currentUser?.id"
                    @click="points.deleteDynamicPoint(point.id)"
                    variant="flat" color="red" class="ml-2 delete">Usuń
                </v-btn>
            </v-list-item>
        </v-list>
    </v-card>
    </v-col>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
import { usePointsStore, Point } from '@/store/PointsStore'
import CurrentAvailability from "@/components/Point/CurrentAvailability.vue";
import WasteTypesChips from "@/components/Point/WasteTypesChips.vue";
import {useAuthorizationStore} from "@/store/AuthorizationStore";
const authorization = useAuthorizationStore()

const points = usePointsStore()
const props = defineProps({
    point: {
        type: Object as PropType<Point>,
        required: true,
    },
});

</script>
<style scoped>
.router-link-custom a {
    text-decoration: none;
    color: inherit;
}

/*.showRoute {*/
/*    position: absolute;*/
/*    bottom: 24px;*/
/*    right: 24px;*/
/*}*/

/*.edit {*/
/*    position: absolute;*/
/*    bottom: 24px;*/
/*    right: 24px;*/
/*}*/

/*.delete {*/
/*    position: absolute;*/
/*    bottom: 24px;*/
/*    !*right: 24px;*!*/
/*}*/
</style>
