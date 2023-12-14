import { defineStore } from "pinia";
import {Comment, computed, ref} from 'vue'
import axios from "@/axios/axios";
import { useFiltersStore } from '@/store/FiltersStore'
import moment from "moment";
import Point from "@/components/Home/Point.vue";
import config from "@/config/config";
import {useAuthorizationStore} from "@/store/AuthorizationStore";
import router from "@/router";
import {tr} from "vuetify/locale";
import {SubmitEventPromise} from "vuetify";

export interface wasteType {
    id: number,
    name: string
}
export interface Point {
    id: number,
    name: string
    city: string,
    street: string,
    lat: number,
    lon: number,
    openingHours: string,
    type: string,
    imageLink: string,
    wasteTypes: wasteType[],
    isDynamic: boolean
}

interface currentAvailabilityData {
    status: string,
    info: string
}
interface Marker {
    lat: number,
    lon: number,
    name: string,
    isDynamic: boolean,
    id: number
}

interface Comment {
    user: number,
    text: string,
    createdAt: string
}

export const usePointsStore = defineStore('points', () => {
    const points = ref<Point[]>([])
    const filters = useFiltersStore()
    const isLoading = ref(false)
    const isSearchBtnClicked = ref(false)
    const currentPoint = ref<Point>()
    const initLoad = ref(true)
    const comments = ref<Comment[]>([])
    const comment = ref('')
    const authorization = useAuthorizationStore()
    const dynamicPoints = ref([])
    const showAddedPointAlert = ref(false)
    async function getPoints() {
        isLoading.value = true
        isSearchBtnClicked.value = true;
        const response = await axios.post('/points/filtered', filters.filters)
        points.value = response.data.points
        filters.paginationLength = setPaginationLength(response.data.totalPoints)
        isLoading.value = false
        initLoad.value = false
    }

    async function getPoint(pointId: string | string[]) {
        const response = await axios.get(`/points/${pointId}`)
        currentPoint.value = response.data
        return response.data
    }

    function openingHoursValidated(openingHours: string): boolean {
        if (!openingHours.length) return false;
        const openingHoursArray = openingHours.split(';')
        const regex = /^(?:(\d{1,2}:\d{2}–\d{1,2}:\d{2})|0)(?:;(?:\d{1,2}:\d{2}–\d{1,2}:\d{2}|0)){6}$/
        return regex.test(openingHours);
    }

    function getAvailability(openingHours: string): currentAvailabilityData {
        moment.locale('pl')
        let data: currentAvailabilityData = {
            status: '',
            info: ''
        }
        if (!openingHoursValidated(openingHours)) return data
        const openingHoursArray = openingHours.split(';')
        if (openingHoursArray.length != 7) return data;
        const currentTime = moment().format('HH:mm')
        let currentDay = moment().weekday()
        const todayFromAndTo = openingHoursArray[currentDay]
        const [todayFrom, todayTo] = openingHoursArray[currentDay].split('–')
        if (todayFromAndTo == '0' || currentTime < todayFrom || currentTime > todayTo) {
            data.status = 'closed'
            if (currentTime < todayFrom) {
                data.info = `Otwarcie ${config.weekDays[currentDay]} ${openingHoursArray[currentDay].split('–')[0]}`
            }
            else {
                let nextDay = currentDay += 1
                let nextFrom = openingHoursArray[nextDay]
                let i = currentDay
                while (nextFrom == '0') {
                    i++
                    nextFrom = openingHoursArray[i % 7]
                }
                data.info = `Otwarcie ${config.weekDays[i % 7]} ${openingHoursArray[i % 7].split('–')[0]}`
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
        wasteTypes?.forEach((wt) => {
            if (filters.filters.wasteTypesNames.includes(wt.name)) {
                matchingWasteTypes.push(wt)
            }
        })
        return matchingWasteTypes
    }

    function setPaginationLength(totalPoints: number) {
        return Math.ceil(totalPoints / config.defaultItemsPerPage)
    }

    function getShortenedWebsite(website:string, length: number = 40) {
        return (website.length > length) ? website.slice(0, length) + '...' : website;
    }

    const currentPointsMarkers = computed(() => {
        return points.value.map(point =>
        {
            const marker: Marker = {} as Marker
            marker.lat = point.lat
            marker.lon = point.lon
            marker.name = point.name
            marker.isDynamic = point.isDynamic
            marker.id = point.id
            return marker
        })
    })

    async function getComments(pointId: number) {
        const response = await axios.get(`/comments/${pointId}`)
        comments.value = response.data
        return response.data
    }

    async function addComment(pointId: number) {
        const response = await axios.post('/comments', {
            text: comment.value,
            point: pointId,
            user: authorization.currentUser?.id
        })
        comments.value = response.data
        await getComments(pointId)
        comment.value = ''
        return response.data
    }

    const currentPointMarker = computed(() => {
        const marker: Marker = {} as Marker
        marker.lat = <number>currentPoint.value?.lat
        marker.lon = <number>currentPoint.value?.lon
        marker.name = <string>currentPoint.value?.name
        marker.isDynamic = <boolean>currentPoint.value?.isDynamic
        marker.id = <number>currentPoint.value?.id
        return [marker]
    })

    function getOpeningHoursForDay(day: number) {
        const openingHoursPerDay = currentPoint.value?.openingHours.split(';')[day]
        return openingHoursPerDay !== '0' ? openingHoursPerDay : 'Zamknięte'
    }

    function setRouteToPoint(pointLat: number, pointLon: number) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                openGoogleMapsRoute(position, pointLat, pointLon)
            });
        }
    }

    function openGoogleMapsRoute(position: GeolocationPosition, pointLat: number, pointLon: number) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const origin = encodeURIComponent(`${latitude},${longitude}`);
        const destination = encodeURIComponent(`${pointLat},${pointLon}`);
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`)
    }

    const dynamicPointName = ref('')
    const dynamicPointCity = ref('')
    const dynamicPointStreet = ref('')
    const dynamicPointZipcode = ref('')
    const dynamicPointPhone = ref('')
    const dynamicPointDescription = ref('')
    const dynamicPointStartDate = ref(new Date())
    const dynamicPointEndDate = ref(new Date())
    const dynamicPointAdditionalWasteType = ref('')

    async function addDynamicPoint(event: SubmitEventPromise) {
        const validated = await event
        if (!validated.valid) {
            return
        }
        try {
            const response = await axios.post("/points", {
                name: dynamicPointName.value,
                city: dynamicPointCity.value,
                street: dynamicPointStreet.value,
                zipcode: dynamicPointZipcode.value,
                phoneNumber: dynamicPointPhone.value,
                dynamicPointInfo: {
                    user: authorization?.currentUser?.id,
                    description: dynamicPointDescription.value,
                    startDate: dynamicPointStartDate.value,
                    endDate: dynamicPointEndDate.value,
                    additionalWasteTypes: dynamicPointAdditionalWasteType.value.split(','),
                },
            });
            if (typeof response === 'object') {
                showAddedPointAlert.value = true
                await router.push({name: 'home'})
            }
        } catch (error) {
            //
        }
    }

    async function getDynamicPoints(userId: number) {
        const response = await axios.get(`/points/user/${userId}`)
        dynamicPoints.value = response.data
        return response.data
    }

    return {
        points,
        isLoading,
        isSearchBtnClicked,
        currentPointMarker,
        currentPointsMarkers,
        currentPoint,
        initLoad,
        comments,
        comment,
        dynamicPointName,
        dynamicPointCity,
        dynamicPointStreet,
        dynamicPointZipcode,
        dynamicPointPhone,
        dynamicPointDescription,
        dynamicPointStartDate,
        dynamicPointEndDate,
        dynamicPointAdditionalWasteType,
        dynamicPoints,
        showAddedPointAlert,
        getPoints,
        getAvailability,
        getWasteTypesMatchingFilters,
        getPoint,
        getShortenedWebsite,
        getComments,
        addComment,
        getOpeningHoursForDay,
        setRouteToPoint,
        addDynamicPoint,
        getDynamicPoints
    }
})