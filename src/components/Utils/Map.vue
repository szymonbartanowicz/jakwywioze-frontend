<template>
    <div id="map"></div>
</template>

<script lang="ts" setup>
import {defineProps, onMounted} from "vue"
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { usePointsStore } from "@/store/PointsStore";
import {useFiltersStore} from "@/store/FiltersStore";
const points = usePointsStore()
const filters = useFiltersStore()

const props = defineProps<{
    mode: string,
}>();

const defaultIcon = L.icon({
    iconUrl: require('../../assets/images/map-marker.svg'),
    popupAnchor: [0, 16]
});
function init(map: any) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '',
        }
    ).addTo(map);
}
function setMarkers(map: any) {
    const markers = getMarkers(props.mode)
    for (let i = 0; i < markers.length; i++) {
        const marker = L.marker([markers[i]?.lon, markers[i]?.lat], { icon: defaultIcon }).addTo(map);
        const markerPopup = L.popup().setContent(markers[i]?.name);
        marker.bindPopup(markerPopup);
    }
}
function setUserMarker(map: any) {
    if (filters.userLat && filters.userLon) {
        const marker = L.marker([filters.userLon, filters.userLat], { icon: defaultIcon }).addTo(map);
    }
}

function getMarkers(mode: string) {
    if (mode === 'list') {
        return points.currentPointsMarkers
    }
    else {
        return points.currentPointMarker
    }
}

function getInitCoords(mode: string): [number, number] {
    if (filters.userLat && filters.userLon) {
        return [filters.userLon, filters.userLat]
    }
    else if (mode === 'detail' && points.currentPoint?.lon && points.currentPoint?.lat) {
        return [points.currentPoint.lon, points.currentPoint.lat]
    }
    else {
        return [points?.currentPointsMarkers[0]?.lon, points?.currentPointsMarkers[0]?.lat]
    }
}
onMounted(async () => {
    const coords = getInitCoords(props.mode)
    if (coords[0] && coords[1]) {
        const map = L.map('map').setView(getInitCoords(props.mode), 10)
        init(map)
        setMarkers(map)
        setUserMarker(map)
    }
})
</script>
<style>
#map {
    width: 100%;
    height: calc(100vh - 64px);
}
</style>
