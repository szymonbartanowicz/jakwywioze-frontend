<template>
    <div id="map" class="sticky"></div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { usePointsStore } from '@/store/PointsStore';
import { useFiltersStore } from '@/store/FiltersStore';

const props = defineProps<{ mode: string }>();
const points = usePointsStore();
const filters = useFiltersStore();

function init(map: L.Map) {
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_no_buildings/{z}/{x}/{y}.png', {
    attribution: '© MapQuest',
    subdomains: ['a', 'b', 'c', 'd'],
  }).addTo(map);
}

function setMarkers(map: L.Map) {
  const markers = getMarkers(props.mode);
  for (let i = 0; i < markers.length; i++) {
    const marker = L.marker([markers[i].lat, markers[i].lon], {
      icon: markers[i].isDynamic? dynamicPointIcon : pointIcon,
    }).addTo(map);
    const markerPopup = L.popup().setContent(getPopupContent(markers[i].name, markers[i].id));
    marker.bindPopup(markerPopup);
  }
}

function getPopupContent(pointName: string, pointId: number) {
    return `<a href='/points/${pointId}' target="_blank"><span>${pointName}</span></a>`
}

function setUserMarker(map: L.Map) {
  if (filters.userLat && filters.userLon) {
    const marker = L.marker([filters.userLat, filters.userLon], {
      icon: userIcon,
    }).addTo(map);
    const markerPopup = L.popup().setContent('Twoja lokalizacja');
    marker.bindPopup(markerPopup);
  }
}

const pointIcon = L.icon({
  iconUrl: require('@/assets/images/map-marker.svg'),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -16],
});

const dynamicPointIcon = L.icon({
    iconUrl: require('@/assets/images/map-marker-blue.svg'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -16],
});

const userIcon = L.icon({
    iconUrl: require('@/assets/images/map-marker-red.svg'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -16],
});

function getMarkers(mode: string) {
  if (mode === 'list') {
    return points.currentPointsMarkers;
  } else {
    return points.currentPointMarker;
  }
}

function getInitCoords(mode: string): [number, number] {
  if (filters.userLat && filters.userLon) {
    return [filters.userLat, filters.userLon];
  } else if (mode === 'detail' && points.currentPoint?.lon && points.currentPoint?.lat) {
    return [points.currentPoint.lat, points.currentPoint.lon];
  } else {
    return [points.currentPointsMarkers[0].lat, points.currentPointsMarkers[0].lon];
  }
}

onMounted(async () => {
  const coords = getInitCoords(props.mode);
  if (coords[0] && coords[1]) {
    const map = L.map('map').setView(getInitCoords(props.mode), 11);
    init(map);
    setMarkers(map);
    setUserMarker(map);
  }
});
</script>

<style scoped>
#map {
  width: 100%;
  height: calc(100vh - 64px);
}
</style>
