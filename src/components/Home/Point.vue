<template>
    <v-card width="600px" class="mx-auto mt-4">
        <v-img
                class="align-end text-white"
                height="200"
                :src="point.imageLink ? point.imageLink : require('../../assets/images/default.png')"
                cover
        >
        </v-img>
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
        <WasteTypesChips :waste-types="point.wasteTypes"></WasteTypesChips>
        <v-list class="text-left d-block" density="compact">
            <v-list-item v-if="point.city"><v-icon icon="mdi-map-marker" class="mr-2"></v-icon>{{ point.city }}</v-list-item>
            <CurrentAvailability v-if="point.openingHours" :opening-hours="point.openingHours"></CurrentAvailability>
            <v-list-item link v-if="point.website"><v-icon icon="mdi-web" class="mr-2"></v-icon><a :href="point.website" target="_blank">{{ point.website }}</a></v-list-item>
            <v-list-item v-if="point.phoneNumber"><v-icon icon="mdi-phone" class="mr-2"></v-icon>
                {{ point.phoneNumber }}</v-list-item>
        </v-list>
        <v-card-actions class="float-right pa-4">
            <router-link :to="{
                            name: 'point',
                            params: {
                              id: point.id
                            }
                          }">
                <v-btn variant="outlined" color="green">Info</v-btn>
            </router-link>
            <v-btn variant="flat" color="green" class="text-white ml-2">Trasa</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
import { usePointsStore, Point } from '@/store/PointsStore'
import CurrentAvailability from "@/components/Home/CurrentAvailability.vue";
import WasteTypesChips from "@/components/Home/WasteTypesChips.vue";

const points = usePointsStore()
const props = defineProps({
    point: {
        type: Object as PropType<Point>,
        required: true,
    },
});

</script>
<style>
.router-link-custom a {
    text-decoration: none;
    color: inherit;
}
</style>
