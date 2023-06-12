import { defineStore } from "pinia";
import { ref, Ref } from 'vue'
import axios from "@/axios/axios";

interface Filters {
    range: number,
    city: string,
    wasteTypes: String[]
}
export const useFiltersStore = defineStore('filters', () => {
    const filters = ref<Filters>({
        range: 0,
        city: '',
        wasteTypes: []
    })
    const cities:Ref<String[]> = ref([])
    const wasteTypes:Ref<String[]> = ref([])

    async function getCities() {
        const response = await axios.get('/points/cities')
        cities.value = response.data
    }
    async function getWasteTypes() {
        // const response = await axios.get('/waste-types')
        // wasteTypes.value = response.data
        wasteTypes.value = ["bio", "gruz", "opony"]
    }
    return {
        filters,
        cities,
        wasteTypes,
        getCities,
        getWasteTypes,
    }
})