<template>
    <div v-if="availability?.status.length">
        <v-icon icon="mdi-clock" class="mr-2"></v-icon>
        <span v-if="availability?.status == 'opened'" class="text-green-darken-1 font-weight-bold">Otwarte <span class="text-grey-darken-1 font-weight-thin">{{ availability?.info }}</span></span>
        <span v-else class="text-red">Zamknięte <span class="text-grey-darken-1 font-weight-thin">{{ availability?.info }}</span></span>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue';
import { usePointsStore } from '@/store/PointsStore'

const points = usePointsStore()
let availability = ref()

const props = defineProps({
    openingHours: {
        type: String,
        required: true,
    },
});

onMounted(() => {
    availability.value = points.getAvailability(props.openingHours)
})
</script>