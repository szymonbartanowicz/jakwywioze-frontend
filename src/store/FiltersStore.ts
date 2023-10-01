import { defineStore } from "pinia";
import { ref, Ref } from 'vue'
import axios from "@/axios/axios";

interface Filters {
    range: number,
    city: string,
    wasteTypesNames: String[],
    page: number,
    itemsPerPage: number,
}
export const useFiltersStore = defineStore('filters', () => {
    const filters = ref<Filters>({
        range: 0,
        city: '',
        wasteTypesNames: [],
        page: 0,
        itemsPerPage: 10,
    })
    const cities:Ref<String[]> = ref([])
    const wasteTypesNames:Ref<String[]> = ref([])

    async function getCities() {
        const response = await axios.get('/cities')
        cities.value = response.data
    }
    async function getWasteTypesNames() {
        const response = await axios.get('/waste-types')
        wasteTypesNames.value = response.data
    }
    function reset() {
        filters.value.range = 0
        filters.value.city = ''
        filters.value.wasteTypesNames = []
    }

    function filtersAreEmpty() {
        return (typeof filters.value.range == "undefined" || filters.value.range == 0 || filters.value.range == null)
                && (typeof filters.value.city == "undefined" || filters.value.city == '' || filters.value.city == null)
                && (typeof filters.value.wasteTypesNames == "undefined" || !filters.value.wasteTypesNames.length)
    }
    return {
        filters,
        cities,
        wasteTypesNames,
        getCities,
        getWasteTypesNames,
        reset,
        filtersAreEmpty
    }
})