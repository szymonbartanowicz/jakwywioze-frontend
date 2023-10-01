import { defineStore } from "pinia";
import { ref, Ref, watch } from 'vue'
import axios from "@/axios/axios";
import config from "@/config/config";
import {usePointsStore} from "@/store/PointsStore";

interface Filters {
    range: number,
    city: string,
    wasteTypesNames: String[],
    page: number,
    itemsPerPage: number,
}
export const useFiltersStore = defineStore('filters', () => {
    const points = usePointsStore()
    const currentPage = ref(1)
    const filters = ref<Filters>({
        range: 0,
        city: '',
        wasteTypesNames: [],
        page: 0,
        itemsPerPage: config.defaultItemsPerPage,
    })
    const cities:Ref<String[]> = ref([])
    const wasteTypesNames:Ref<String[]> = ref([])
    const paginationLength = ref(0)

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
    watch(currentPage, async () => {
        filters.value.page = currentPage.value - 1
        await points.getPoints()
    })

    return {
        filters,
        cities,
        wasteTypesNames,
        paginationLength,
        currentPage,
        getCities,
        getWasteTypesNames,
        reset,
        filtersAreEmpty
    }
})