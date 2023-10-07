<template>
    <v-row no-gutters class="mb-10">
        <v-col
          cols="4"
        >
            <v-combobox
                v-model="filters.currentCityName"
                @update:search="filters.getCities($event)"
                @update:model-value="filters.setCity($event)"
                label="Miasto"
                :items="filters.cities"
                item-title="name"
                item-value="id"
                class="mr-3"
                no-data-text="Brak danych"
            ></v-combobox>
        </v-col>
        <v-col
          cols="2"
        >
            <v-select
                    v-model="filters.filters.range"
                    clearable
                    label="Zasięg"
                    :items="config.ranges"
                    suffix="km"
                    class="mr-3"
            ></v-select>
        </v-col>
        <v-col
            cols="4"
        >
            <v-select
                v-model="filters.filters.wasteTypesNames"
                multiple
                chips
                clearable
                label="Rodzaj odpadów"
                :items="filters.wasteTypesNames"
                class="mr-3"
            ></v-select>
        </v-col>
        <v-col
          cols="2"
        >
            <v-btn
                @click.prevent="points.getPoints"
                color="green"
                block
                class="text-white float-left"
                height="56px"
            >
                Szukaj
            </v-btn>
        </v-col>
    </v-row>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useFiltersStore } from '@/store/FiltersStore'
import { usePointsStore } from '@/store/PointsStore'
import config from "@/config/config";

const filters = useFiltersStore()
const points = usePointsStore()

onMounted(() => {
    filters.reset()
    filters.getCities()
    filters.getWasteTypesNames()
})
</script>