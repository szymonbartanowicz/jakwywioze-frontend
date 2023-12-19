<template>
    <div class="ml-4 mb-2 d-flex flex-wrap">
        <v-chip size="x-small" class="mr-1 mb-1" v-for="wasteType in wasteTypes">
            {{ wasteType.name ? wasteType.name : wasteType }}
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
    mode: {
        type: String,
        required: true,
    },
    isDynamic: {
        type: Boolean,
        required: false,
    }
});

let wasteTypes = ref()

onMounted(() => {
    if (props.mode === 'list') {
        wasteTypes.value = points.getWasteTypesMatchingFilters(props.wasteTypes)
    }
    else if (props.mode === 'detail' && !props.isDynamic) {
        wasteTypes.value = props.wasteTypes
    }
    else {
        wasteTypes.value = props.wasteTypes
    }
})
</script>
<style scoped>
.wasteTypes {
    padding: 0 20px;
}
</style>