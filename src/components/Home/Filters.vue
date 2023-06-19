<template>
    <v-row no-gutters>
        <v-col
          cols="4"
        >
            <v-autocomplete
                v-model="city"
                @update:model-value="setFilters"
                label="Miasto"
                :items="filters.cities"
                class="mr-3"
            ></v-autocomplete>
        </v-col>
        <v-col
          cols="2"
        >
            <v-select
                    v-model="range"
                    @update:model-value="setFilters"
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
                v-model="wasteTypesNames"
                @update:model-value="setFilters"
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
            <router-link to="/points">
                <v-btn
                    color="green"
                    block
                    class="text-white float-left"
                    height="56px"
                >
                    Szukaj
                </v-btn>
            </router-link>
        </v-col>
    </v-row>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useFiltersStore } from '@/store/FiltersStore'
import config from "@/config/config";

const filters = useFiltersStore()
const range = ref()
const city = ref('')
const wasteTypesNames = ref([])

function setFilters() {
    filters.$patch({
        filters: {
            range: range.value,
            city: city.value,
            wasteTypesNames: wasteTypesNames.value
        }
    })
}

onMounted(() => {
    filters.reset()
    filters.getCities()
    filters.getWasteTypesNames()
})
</script>