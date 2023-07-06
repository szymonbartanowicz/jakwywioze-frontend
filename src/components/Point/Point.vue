<template>
    <v-container>
        <Point></Point>
    </v-container>
</template>
<script lang="ts" setup>
import {defineProps, onMounted} from 'vue'
import { usePointsStore } from '@/store/PointsStore'

const points = usePointsStore()

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});
onMounted(() => {
    points.getPoint(props.id)
})
</script>

