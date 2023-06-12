<template>
    <v-container>
        <v-progress-circular v-if="points.isLoading" indeterminate color="blue"></v-progress-circular>
        <v-card v-else width="600px" class="mx-auto mt-4" v-for="point in points.points" :key="point.id">
            <v-img
                class="align-end text-white"
                height="200"
                src="https://normanprof.com/wp-content/uploads/2016/06/thumbnail-default.jpg"
                cover
            >
            </v-img>
            <v-card-title class="text-left mt-2">{{ point.name }}</v-card-title>
            <v-list class="text-left" density="compact">
                <v-list-item v-if="point.city"><v-icon icon="mdi-map-marker" class="mr-2"></v-icon>{{ point.city }}</v-list-item>
                <v-list-item v-if="point.openingHours"><v-icon icon="mdi-clock" class="mr-2"></v-icon>Godziny otwarcia</v-list-item>
                <v-list-item v-if="point.website"><v-icon icon="mdi-web" class="mr-2"></v-icon>Strona internetowa</v-list-item>
                <v-list-item v-if="point.phone"><v-icon icon="mdi-phone" class="mr-2"></v-icon>Telefon</v-list-item>
            </v-list>
            <v-card-actions class="float-right pa-4">
                <v-btn variant="outlined" color="green">Info</v-btn>
                <v-btn variant="flat" color="green" class="text-white">Trasa</v-btn>
            </v-card-actions>
        </v-card>
        <span v-if="!points.isLoading && !points.points.length">Brak punktów spełniających podane kryteria.</span>
    </v-container>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePointsStore } from '@/store/PointsStore'

const points = usePointsStore()

onMounted(() => {
    points.getPoints()
})

</script>

