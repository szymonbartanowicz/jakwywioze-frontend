<template>
    <v-row no-gutters>
        <v-col
          cols="4"
        >
            <v-select
                    v-model="wasteTypes"
                    @update:model-value="setFilters"
                    multiple
                    chips
                    label="Rodzaj odpadów"
                    :items="filters.wasteTypes"
                    class="mr-3"
            ></v-select>
        </v-col>
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
                    :items="[1, 2, 3, 4, 5]"
                    suffix="km"
                    class="mr-3"
            ></v-select>
        </v-col>
        <v-col
          cols="2"
        >
            <router-link to="/points">
                <v-btn
                    color="#00C500"
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

const filters = useFiltersStore()
const range = ref(0)
const city = ref('')
const wasteTypes = ref([])

function setFilters() {
    filters.$patch({
        filters: {
            range: range.value,
            city: city.value,
            wasteTypes: wasteTypes.value
        }
    })
}

onMounted(() => {
    filters.getCities()
    filters.getWasteTypes()
})
</script>