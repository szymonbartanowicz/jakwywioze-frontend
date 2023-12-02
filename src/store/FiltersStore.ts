import { defineStore } from "pinia";
import { ref, Ref, watch } from 'vue'
import axios from "@/axios/axios";
import config from "@/config/config";
import {usePointsStore} from "@/store/PointsStore";
import router from "@/router";

interface Filters {
    range?: number | string,
    cityId?: number,
    wasteTypesNames: String[],
    page: number,
    itemsPerPage: number,
    addDynamicPoints: boolean,
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
        range: config.defaultRange,
        cityId: 0,
        wasteTypesNames: [],
        page: 0,
        itemsPerPage: config.defaultItemsPerPage,
        addDynamicPoints: true,
    })
    const cities:Ref<String[]> = ref([])
    const wasteTypesNames:Ref<String[]> = ref([])
    const paginationLength = ref(0)
    const currentCityName = ref()
    const userLat = ref(0)
    const userLon = ref(0)

    // let debounceApiCallTimer: number | null = null;

    async function getCities(city: string = '') {
        if (city?.length < 3) {
            cities.value = []
            return
        }
        // if (debounceApiCallTimer !== null) {
        //     clearTimeout(debounceApiCallTimer);
        // }
        // debounceApiCallTimer = setTimeout(async () => {
        const response = await axios.get(`/cities/find?name=${city}`);
        cities.value = response.data;
        // }, 500);
    }

    function setCity(city: City | string) {
        if (city && typeof city === "object") {
            filters.value.cityId = city.id
        }
    }
    async function getWasteTypesNames() {
        const response = await axios.get('/waste-types')
        wasteTypesNames.value = response.data
    }
    function reset() {
        filters.value.range = config.defaultRange
        filters.value.cityId = 0
        filters.value.wasteTypesNames = []
        filters.value.page = 0
        filters.value.itemsPerPage = config.defaultItemsPerPage
        currentPage.value = 1
        currentCityName.value = ''
    }

    function filtersAreEmpty() {
        return (typeof filters.value.range == "undefined" || filters.value.range == 0 || filters.value.range == null)
                && (typeof filters.value.cityId == "undefined" || filters.value.cityId == 0 || filters.value.cityId == null)
                && (typeof filters.value.wasteTypesNames == "undefined" || !filters.value.wasteTypesNames.length)
    }

    async function reload() {
        await router.push({ name: 'home' })
        location.reload()
    }

    async function setCityOnFilters(position: GeolocationPosition) {
        userLat.value = position.coords.latitude
        userLon.value = position.coords.longitude
        const response = await axios.post('/cities/closest', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }).then((response) => {
            filters.value.cityId = response.data.id
            currentCityName.value = response.data.name
        })
    }

    function setClosestCity() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                await setCityOnFilters(position)
            });
        }
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
        userLat,
        userLon,
        getCities,
        getWasteTypesNames,
        filtersAreEmpty,
        setCity,
        setClosestCity,
        reload,
    }
})