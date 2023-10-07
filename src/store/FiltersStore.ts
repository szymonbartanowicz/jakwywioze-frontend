import { defineStore } from "pinia";
import { ref, Ref, watch } from 'vue'
import axios from "@/axios/axios";
import config from "@/config/config";
import {usePointsStore} from "@/store/PointsStore";

interface Filters {
    range: number,
    cityId?: number,
    wasteTypesNames: String[],
    page: number,
    itemsPerPage: number,
}
interface City {
    id: number,
    name: string,
    voivodeship: string,
    county: string,
    longitude: number,
    latitude: number,
}
export const useFiltersStore = defineStore('filters', () => {
    const points = usePointsStore()
    const currentPage = ref(1)
    const filters = ref<Filters>({
        range: 0,
        cityId: 0,
        wasteTypesNames: [],
        page: 0,
        itemsPerPage: config.defaultItemsPerPage,
    })
    const cities:Ref<String[]> = ref([])
    const wasteTypesNames:Ref<String[]> = ref([])
    const paginationLength = ref(0)
    const currentCityName = ref('')

    let debounceApiCallTimer: number | null = null;

    async function getCities(city: string = '') {
        if (city?.length < 3) {
            cities.value = []
            return
        }
        if (debounceApiCallTimer !== null) {
            clearTimeout(debounceApiCallTimer);
        }
        debounceApiCallTimer = setTimeout(async () => {
            const response = await axios.get(`/cities/find?name=${city}`);
            cities.value = response.data;
        }, 500);
    }

    function setCity(city: City | string) {
        if (typeof city === "object") {
            filters.value.cityId = city.id
        }
    }
    async function getWasteTypesNames() {
        const response = await axios.get('/waste-types')
        wasteTypesNames.value = response.data
    }
    function reset() {
        filters.value.range = 0
        filters.value.cityId = 0
        filters.value.wasteTypesNames = []
    }

    function filtersAreEmpty() {
        return (typeof filters.value.range == "undefined" || filters.value.range == 0 || filters.value.range == null)
                && (typeof filters.value.cityId == "undefined" || filters.value.cityId == 0 || filters.value.cityId == null)
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
        currentCityName,
        getCities,
        getWasteTypesNames,
        reset,
        filtersAreEmpty,
        setCity
    }
})