<template>
  <v-container>
    <v-sheet width="500" class="mx-auto">
      <v-form @submit.prevent="points.addDynamicPoint()">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="points.dynamicPointName" label="Nazwa"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="points.dynamicPointCity" label="City"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="points.dynamicPointStreet" label="Street"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="points.dynamicPointZipcode" label="Kod pocztowy"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="points.dynamicPointPhone" label="Numer telefonu"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="points.dynamicPointAdditionalWasteType" label="Inne typy śmieci"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="points.dynamicPointDescription" label="Opis"></v-textarea>
          </v-col>
          <v-col cols="12" md="6">
            <date-picker
                label="Start Date"
                value=""
                v-model="points.dynamicPointStartDate"
            ></date-picker>

          </v-col>
          <v-col cols="12" md="6">
            <date-picker
                label="End Date"
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

const points = usePointsStore()
</script>