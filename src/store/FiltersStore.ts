import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useFiltersStore = defineStore('filters', () => {
    const range = ref(5)
    const city = ref('')
    const wasteTypes = ref([])

    return {
        range,
        city,
        wasteTypes,
    }
})