import { defineStore } from "pinia";
import { ref } from 'vue'
import axios from "@/axios/axios";
import { useFiltersStore } from '@/store/FiltersStore'
import moment from "moment";
import Point from "@/components/Points/Point.vue";
import config from "@/config/config";

export interface wasteType {
    id: number,
    name: string
}
export interface Point {
    id: number,
    name: string
    city: string,
    street: string,
    lat: string,
    lon: string,
    openingHours: string,
    type: string,
    imageLink: string,
    wasteTypes: wasteType[]
}

interface currentAvailabilityData {
    status: string,
    info: string
}

export const usePointsStore = defineStore('points', () => {
    const points = ref<Point[]>([])
    const filters = useFiltersStore()
    const isLoading = ref(true)

    async function getPoints() {
        isLoading.value = true
        const response = await axios.get('/points')
        points.value = response.data
        isLoading.value = false
    }

    async function getFilteredPoints() {
        isLoading.value = true
        const response = await axios.post('/points/filtered', filters.filters)
        points.value = response.data
        isLoading.value = false
    }

    function getAvailability(openingHours: string): currentAvailabilityData {
        let data: currentAvailabilityData = {
            status: '',
            info: ''
        }
        if (openingHours.includes('null')) return data;
        const openingHoursArray = openingHours.split(';')
        if (openingHoursArray.length != 7) return data;
        const currentTime = moment().format('HH:mm')
        const currentDay = moment().weekday()
        const todayFromAndTo = openingHoursArray[currentDay - 1]
        const [todayFrom, todayTo] = openingHoursArray[currentDay - 1].split('–')
        if (todayFromAndTo == '0' || (currentTime < todayFrom && currentTime > todayTo)) {
            data.status = 'closed'
            if (currentTime < todayFrom) {
                data.info = `Otwarcie ${config.weekDays[currentDay - 1]} ${openingHoursArray[currentDay - 1].split('–')[0]}`
            }
            else {
                let nextFrom = openingHoursArray[currentDay]
                let i = currentDay
                while (nextFrom == '0') {
                    i++
                    nextFrom = openingHoursArray[i % 7]
                }
                data.info = `Otwarcie ${config.weekDays[i]} ${openingHoursArray[i].split('–')[0]}`
            }
        }
        else {
            data.status = 'opened'
            data.info = `Zamknięcie ${todayTo}`
        }
        return data
    }

    function getWasteTypesMatchingFilters(wasteTypes: wasteType[]) {
        let matchingWasteTypes: wasteType[] = [];
        wasteTypes.forEach((wt) => {
            if (filters.filters.wasteTypesNames.includes(wt.name)) {
                matchingWasteTypes.push(wt)
            }
        })
        return matchingWasteTypes
    }

    return {
        points,
        getPoints,
        getFilteredPoints,
        isLoading,
        getAvailability,
        getWasteTypesMatchingFilters
    }
})