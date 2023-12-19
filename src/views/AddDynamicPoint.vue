<template>
  <v-container>
    <v-sheet max-width="500" class="mx-auto mb-6">
      <v-form @submit.prevent="points.addDynamicPoint($event)">
        <v-row>
          <v-col cols="12">
            <v-text-field :rules="nameRules" v-model="points.dynamicPointName" label="Nazwa"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field :rules="cityRules" v-model="points.dynamicPointCity" label="Miasto"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field :rules="streetRules" v-model="points.dynamicPointStreet" label="Ulica i numer"></v-text-field>
          </v-col>
<!--          <v-col cols="12" sm="6">-->
<!--            <v-text-field :rules="zipcodeRules" v-model="points.dynamicPointZipcode" label="Kod pocztowy"></v-text-field>-->
<!--          </v-col>-->
          <v-col cols="12" sm="6">
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
              ></v-autocomplete>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="points.dynamicPointAdditionalWasteTypes" label="Inne rodzaje po przecinku, np. typ1, typ2, typ3"></v-text-field>
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
                    ></v-text-field>
                </template>
            </VDatePicker>
          </v-col>
        </v-row>
        <v-btn :disabled="points.disableAddDynamicPointBtn" :loading="points.disableAddDynamicPointBtn" type="submit" color="green" block text="#112A46" class="mt-2">Dodaj punkt</v-btn>
      </v-form>
        <v-alert v-show="points.addDynamicPointError" color="error" variant="text">{{ points.addDynamicPointError }}</v-alert>
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import {usePointsStore} from '@/store/PointsStore'
import {useFiltersStore} from "@/store/FiltersStore";
import moment from "moment/moment";
const points = usePointsStore()

const nameRules = [
    (v: string) => !!v || 'Pole nazwa jest wymagane',
]
const cityRules = [
    (v: string) => !!v || 'Pole miasto jest wymagane',
]
const streetRules = [
    (v: string) => !!v || 'Pole ulica i numer jest wymagane',
]
// const zipcodeRegex = /^[0-9]{2}-[0-9]{3}$/
// const zipcodeRules = [
//     (v: string) => !!v || 'Pole kod pocztowy jest wymagane',
//     (v: string) => zipcodeRegex.test(v) || 'Nieprawidłowy format kodu pocztowego',
// ]
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

const filters = useFiltersStore()

</script>