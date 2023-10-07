<template>
    <v-container>
        <v-card width="600px" class="mx-auto mt-4">
            <v-img
                class="align-end text-white"
                height="200"
                :src="point.imageLink ? point.imageLink : require('../assets/images/default.png')"
                cover
            >
            </v-img>
            <v-card-title class="text-left mt-2 ml-1">{{ point.name }}</v-card-title>
<!--            <WasteTypesChips :waste-types="point.wasteTypes"></WasteTypesChips>-->
            <v-list class="text-left d-block" density="compact">
                <v-list-item v-if="point.city"><v-icon icon="mdi-map-marker" class="mr-2"></v-icon>{{ point.city }}</v-list-item>
                <CurrentAvailability v-if="point.openingHours" :opening-hours="point.openingHours"></CurrentAvailability>
                <v-list-item link v-if="point.website"><v-icon icon="mdi-web" class="mr-2"></v-icon><a :href="point.website" target="_blank">{{ point.website }}</a></v-list-item>
                <v-list-item v-if="point.phoneNumber"><v-icon icon="mdi-phone" class="mr-2"></v-icon>
                    {{ point.phoneNumber }}</v-list-item>
            </v-list>
        </v-card>
        <div id="map" style="height:400px; width:600px" class="mx-auto mx-4 mb-12">
        </div>
    </v-container>
</template>
<script lang="ts" setup>
import { onMounted, ref} from 'vue'
import { usePointsStore } from '@/store/PointsStore'
import { useRoute } from 'vue-router'
import WasteTypesChips from "@/components/Points/WasteTypesChips.vue";
import CurrentAvailability from "@/components/Points/CurrentAvailability.vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const points = usePointsStore()
const route = useRoute()
const point = ref('')
const zoom = ref(12)

onMounted(async () => {
    console.log(point)
    point.value = await points.getPoint(route.params.id)
    const defaultIcon = L.icon({
        iconUrl: require('../../node_modules/leaflet/dist/images/marker-icon-2x.png'), // your path may vary ...
        iconSize: [16, 24],
        popupAnchor: [0, 16]
    });
    const map = L.map('map').setView([point.value.lon, point.value.lat], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
    }
    ).addTo(map);
    L.marker([point.value.lon, point.value.lat], {icon: defaultIcon}).addTo(map);
    const markerPopup = L.popup().setContent(point.value.name);
    const zooMarker = L.marker([point.value.lon, point.value.lat], {
        icon: defaultIcon
    }).bindPopup(markerPopup).addTo(map);
})
</script>

