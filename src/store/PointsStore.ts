import { defineStore } from "pinia";
import { ref } from 'vue'
import axios from "@/axios/axios";

interface Point {
    id: number,
    name: string
    city: string,
    street: string,
    lat: string,
    lon: string,
    openingHours: string,
    type: string
}
export const usePointsStore = defineStore('points', () => {
    const points = ref<Point[]>([])
    async function getPoints() {
        const response = await axios.get('/points')
        points.value = response.data
    }

    return {
        points,
        getPoints
    }
})