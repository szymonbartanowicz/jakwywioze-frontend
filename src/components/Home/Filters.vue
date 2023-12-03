<template>
    <v-row no-gutters class="mb-10">
        <v-col
          cols="3"
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
                :disabled="filters.disableSetCityBtn"
            >
                <template v-slot:prepend-inner>
                    <v-icon @click="filters.setClosestCity" icon="mdi-crosshairs-gps" size="small" class="mr-2 mt-1"></v-icon>
                </template>
            </v-combobox>
        </v-col>
        <v-col
          cols="1"
        >
            <v-select
                    :disabled="!filters.filters.cityId"
                    v-model="filters.filters.range"
                    label="Zasięg"
                    :items="config.ranges"
                    suffix="km"
                    class="mr-3"
            ></v-select>
        </v-col>
        <v-col
            cols="3"
        >
            <v-autocomplete
                v-model="filters.filters.wasteTypesNames"
                multiple
                chips
                clearable
                label="Rodzaj odpadów"
                :items="filters.wasteTypesNames"
                class="mr-3"
            ></v-autocomplete>
        </v-col>
        <v-col cols="3">
            <v-tooltip max-width="300px" text="Dynamiczny punkt pozwala znaleźć inne osoby chętne podzielić koszty utylizacji konkretnego rodzaju odpadów. Dynamiczny punkt będzie widoczny dla innych użytkowników, jeśli znajdzie się on w ich zasięgu.">
                <template v-slot:activator="{ props }">
                    <v-checkbox v-model="filters.filters.addDynamicPoints" v-bind="props" label="Pokazuj punkty dynamiczne ?" class=""></v-checkbox>
                </template>
            </v-tooltip>
        </v-col>
        <v-col
          cols="2"
        >
            <v-btn
                @click.prevent="points.getPoints"
                color="#B0E8BC"
                text="#112A46"
                block
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
    // filters.reset()
    filters.getCities()
    filters.getWasteTypesNames()
})
</script>