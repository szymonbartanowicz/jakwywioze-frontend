<template>
    <v-pagination
        :length="filters.paginationLength"
        total-visible="5"
        v-model="filters.currentPage"
        class="mt-4 mb-16">
    </v-pagination>
</template>
<script lang="ts" setup>
import {useFiltersStore} from "@/store/FiltersStore";
import {usePointsStore} from "@/store/PointsStore";

const filters = useFiltersStore()
const points = usePointsStore()
</script>
