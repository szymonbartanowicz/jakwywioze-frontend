<template>
    <v-sheet max-width="500" class="mx-auto mb-6">
        <v-form @submit.prevent="mode === 'edit' ? points.editDynamicPoint($event) : points.addDynamicPoint($event)">
            <v-row>
                <v-col cols="12">
                    <v-text-field :rules="nameRules" v-model="points.dynamicPointName" label="Nazwa"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-combobox
                            v-model="points.dynamicPointCity"
                            @update:search="getCities($event)"
                            label="Miasto"
                            :items="cities"
                            item-title="name"
                            item-value="id"
                            class="mr-0 mr-sm-3"
                            :disabled="disableSetCityBtn"
                            @blur="handleCity()"
                    >
                        <template v-slot:prepend-inner>
                            <v-icon @click="setClosestCity()" icon="mdi-crosshairs-gps" size="small" class="mr-2 mt-1"></v-icon>
                        </template>
                    </v-combobox>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field :rules="streetRules" v-model="points.dynamicPointStreet" label="Ulica i numer"></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field :rules="phoneRules" v-model="points.dynamicPointPhone" label="Numer telefonu"></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-autocomplete
                            v-model="points.dynamicPointWasteTypes"
                            multiple
                            chips
                            clearable
                            label="Rodzaj odpadów"
                            :items="filters.wasteTypesNames"
                            :rules="wasteTypesRules"
                    ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                    <v-text-field :rules="wasteTypesRules" v-model="points.dynamicPointAdditionalWasteTypes" label="Inne rodzaje po przecinku, np. typ1, typ2, typ3"></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea :rules="descriptionRules" v-model="points.dynamicPointDescription" label="Opis"></v-textarea>
                </v-col>
                <v-col cols="12" sm="6">
                    <VDatePicker v-model="points.dynamicPointStartDate" :min-date="moment().format('YYYY-MM-DD')" :popover="false" color="green">
                        <template #default="{ togglePopover, inputValue, inputEvents }">
                            <v-text-field
                                    hint="Data od"
                                    persistent-hint
                                    readonly
                                    :value="inputValue"
                                    v-on="inputEvents"
                                    @click="() => togglePopover()"
                                    append-icon="mdi-calendar"
                            ></v-text-field>
                        </template>
                    </VDatePicker>
                </v-col>
                <v-col cols="12" sm="6">
                    <VDatePicker v-model="points.dynamicPointEndDate" :min-date="moment().format('YYYY-MM-DD')" :popover="false" color="green">
                        <template #default="{ togglePopover, inputValue, inputEvents }">
                            <v-text-field
                                    hint="Data do"
                                    persistent-hint
                                    readonly
                                    :value="inputValue"
                                    v-on="inputEvents"
                                    @click="() => togglePopover()"
                                    append-icon="mdi-calendar"
                                    :rules="endDateRules"
                                    @blur="handleCity()"
                            ></v-text-field>
                        </template>
                    </VDatePicker>
                </v-col>
            </v-row>
            <v-btn :disabled="points.disableAddDynamicPointBtn" :loading="points.disableAddDynamicPointBtn" type="submit" color="green" block text="#112A46" class="mt-2">{{ props.mode === 'edit' ? 'Edytuj punkt' : 'Dodaj punkt' }}</v-btn>
        </v-form>
        <v-alert v-show="points.addDynamicPointError" color="error" variant="text">{{ points.addDynamicPointError }}</v-alert>
    </v-sheet>
</template>

<script lang="ts" setup>
import {usePointsStore, wasteType} from '@/store/PointsStore'
import {useFiltersStore, City} from "@/store/FiltersStore";
import moment from "moment/moment";
import {Ref, ref} from "vue";
import axios from "@/axios/axios";
import {defineProps, PropType} from "vue";
const points = usePointsStore()

const props = defineProps({
    mode: {
        type: String,
        required: false,
    },
});

const nameRules = [
    (v: string) => !!v || 'Pole nazwa jest wymagane',
]
const cityRules = [
    (v: string) => !!v || 'Pole miasto jest wymagane',
]
const streetRules = [
    (v: string) => !!v || 'Pole ulica i numer jest wymagane',
]
const phoneRegex = /^(\+48)?\d{9}$/
const phoneRules = [
    (v: string) => !!v || 'Pole numer telefonu jest wymagane',
    (v: string) => phoneRegex.test(v) || 'Nieprawidłowy format numeru telefonu',
]
const descriptionRules = [
    (v: string) => !!v || 'Pole opis jest wymagane',
    (v: string) => v.length <= 255 || 'Pole opis może posiadać maksymalnie 255 znaków',
]

const endDateRules = [
    () => !moment(points.dynamicPointEndDate).isBefore(points.dynamicPointStartDate) || 'Data do nie może być przed Datą od',
]

const wasteTypesRules = [
    () => !!points.dynamicPointAdditionalWasteTypes || !!points.dynamicPointWasteTypes.length || 'Co najmniej jeden rodzaj odpadów jest wymagany',
]

const filters = useFiltersStore()
const cities:Ref<String[]> = ref([])
const disableSetCityBtn = ref(false)

async function handleCity() {
    await getCities(points.dynamicPointCity)
    if (cities.value.length > 0) {
        points.dynamicPointCity = cities.value[0].name
    }
    else {
        points.dynamicPointCity = ''
    }
}

async function getCities(city: string = '') {
    if (typeof city === 'object') {
        return
    }
    if (city?.length < 3) {
        cities.value = []
        return
    }
    const response = await axios.get(`/cities/find?name=${city}`);
    cities.value = response.data;
}

function setClosestCity() {
    if (navigator.geolocation) {
        disableSetCityBtn.value = true
        navigator.geolocation.getCurrentPosition(async (position) => {
            await setCityOnFilters(position)
        });
    }
}

async function setCityOnFilters(position: GeolocationPosition) {
    const response = await axios.post('/cities/closest', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    }).then((response) => {
        points.dynamicPointCity = response.data.name
        disableSetCityBtn.value = false
    })
}

</script>