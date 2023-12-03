<template>
  <v-container>
    <v-sheet width="500" class="mx-auto">
      <v-form @submit.prevent="points.addDynamicPoint($event)">
        <v-row>
          <v-col cols="12">
            <v-text-field :rules="nameRules" v-model="points.dynamicPointName" label="Nazwa"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field :rules="cityRules" v-model="points.dynamicPointCity" label="Miasto"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field :rules="streetRules" v-model="points.dynamicPointStreet" label="Ulica i numer"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field :rules="zipcodeRules" v-model="points.dynamicPointZipcode" label="Kod pocztowy"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field :rules="phoneRules" v-model="points.dynamicPointPhone" label="Numer telefonu"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="points.dynamicPointAdditionalWasteType" label="Inne typy śmieci, nazwy po przecinku, np. typ1, typ2, typ3"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea :rules="descriptionRules" v-model="points.dynamicPointDescription" label="Opis"></v-textarea>
          </v-col>
          <v-col cols="12" md="6">
            <date-picker
                label="Data od"
                value=""
                v-model="points.dynamicPointStartDate"
            ></date-picker>

          </v-col>
          <v-col cols="12" md="6">
            <date-picker
                label="Data do"
                value=""
                v-model="points.dynamicPointEndDate"
            ></date-picker>
          </v-col>
        </v-row>
        <v-btn type="submit" color="#B0E8BC" block text="#112A46" class="mt-2">Dodaj punkt</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import DatePicker from "@/components/Utils/DatePicker.vue";
import {usePointsStore} from '@/store/PointsStore'
import {ref} from "vue";

const nameRules = [
    (v: string) => !!v || 'Pole nazwa jest wymagane',
]
const cityRules = [
    (v: string) => !!v || 'Pole miasto jest wymagane',
]
const streetRules = [
    (v: string) => !!v || 'Pole ulica i numer jest wymagane',
]
const zipcodeRegex = /^[0-9]{2}-[0-9]{3}$/;
const zipcodeRules = [
    (v: string) => !!v || 'Pole kod pocztowy jest wymagane',
    (v: string) => zipcodeRegex.test(v) || 'Nieprawidłowy format kodu pocztowego',
]
const phoneRules = [
    (v: string) => !!v || 'Pole numer telefonu jest wymagane',
]
const descriptionRules = [
    (v: string) => !!v || 'Pole opis jest wymagane',
]

const points = usePointsStore()
</script>