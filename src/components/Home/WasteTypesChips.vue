<template>
    <div class="ml-5 d-flex flex-wrap">
        <v-chip :color="config.wasteTypesColors[wasteType.id]" size="x-small" class="mr-1 mb-1" v-for="wasteType in wasteTypes">
            {{ wasteType.name }}
        </v-chip>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, PropType, ref } from 'vue'
import { usePointsStore, wasteType } from '@/store/PointsStore'
import config from "@/config/config";

const points = usePointsStore()

const props = defineProps({
    wasteTypes: {
        type: Object as PropType<wasteType[]>,
        required: true,
    },
});

let wasteTypes = ref()

onMounted(() => {
    wasteTypes.value = points.getWasteTypesMatchingFilters(props.wasteTypes)
})
</script>