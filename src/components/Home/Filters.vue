<template>
    <v-row no-gutters>
        <v-col
          cols="12" sm="3"
        >
            <v-combobox
                v-model="filters.currentCityName"
                @update:search="filters.getCities($event)"
                @update:model-value="filters.setCity($event)"
                label="Miasto"
                :items="filters.cities"
                item-title="name"
                item-value="id"
                class="mr-0 mr-sm-3"
                :disabled="filters.disableSetCityBtn"
                @blur="handleCity()"
            >
                <template v-slot:prepend-inner>
                    <v-icon @click="filters.setClosestCity" icon="mdi-crosshairs-gps" size="small" class="mr-2 mt-1"></v-icon>
                </template>
            </v-combobox>
        </v-col>
        <v-col cols="6" sm="2">
            <v-select
                    :disabled="!filters.filters.cityId"
                    v-model="filters.filters.range"
                    label="Zasięg"
                    :items="config.ranges"
                    class="mr-0 mr-sm-3"
                    suffix="km"
            ></v-select>
        </v-col>
        <v-col
            cols="12"
            sm="7"
        >
            <v-autocomplete
                v-model="filters.filters.wasteTypesNames"
                multiple
                chips
                clearable
                label="Rodzaj odpadów"
                :items="filters.wasteTypesNames"
                class="wasteTypesNames"

            ></v-autocomplete>
        </v-col>
    </v-row>
    <v-row class="mb-10" justify="space-between" no-gutters>
        <v-col cols="12" sm="4" class="d-inline-flex">
            <v-checkbox class="showDynamicPoints d-inline-flex mr-4 pr-4" v-model="filters.filters.addDynamicPoints" label="Pokazuj punkty dynamiczne" color="green">
                <template v-slot:append>
                    <v-tooltip
                        location="bottom"
                        :open-on-hover="true"
                        open-on-click
                        max-width="300px"
                        close-on-content-click
                        text="Dynamiczny punkt pozwala znaleźć inne osoby chętne podzielić koszty utylizacji konkretnego rodzaju odpadów. Dynamiczny punkt będzie widoczny dla innych użytkowników, jeśli znajdzie się on w ich zasięgu.">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props">mdi-help-circle-outline</v-icon>
                        </template>
                    </v-tooltip>
                </template>
            </v-checkbox>
        </v-col>
        <v-col
            cols="12"
            sm="2"
        >
            <v-btn
                @click.prevent="points.getPoints"
                color="green"
                text="#112A46"
                block
                height="56px"
                :disabled="filters.disableSearchBtn"
                :loading="filters.disableSearchBtn"
                id="searchBtn"
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

async function handleCity() {
    await filters.getCities(filters.currentCityName)
    if (filters.cities.length > 0) {
        filters.currentCityName  = filters.cities[0].name
        filters.setCity(filters.cities[0])
    }
    else {
        filters.currentCityName = ''
        filters.filters.cityId = 0
    }
}

onMounted(() => {
    filters.getCities()
})
</script>

<style>
.v-overlay-container > .v-menu {
    width:300px!important;
    max-width: 300px!important;
}

.showDynamicPoints .v-label {
    opacity: 1;
}
</style>