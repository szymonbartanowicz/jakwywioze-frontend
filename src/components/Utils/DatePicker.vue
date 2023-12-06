<template>
  <v-row>
    <v-col>
      <v-menu
          v-model="showDatePicker"
          :close-on-content-click="true"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="formattedDate"
              :label="label"
              readonly
              v-bind="attrs"
              v-on="{on}"
              @click.stop="toggleDatePicker"
              append-icon="mdi-calendar"
              class="textFieldCstm"
          ></v-text-field>
        </template>
        <v-locale-provider locale="pl">
            <v-date-picker v-model="selectedDate"
                           @input="closeDatePicker"
                           title="Wybierz datę"
                           hide-header
                           color="#AADEB5"
                           locale="pl"
                           class="datePickerCstm"
                           elevation="1"
            ></v-date-picker>
        </v-locale-provider>
      </v-menu>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'
import moment from "moment/moment";
import config from "@/config/config";

interface Props {
    value: string;
    label: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:value']);

const selectedDate = ref(
    props.value && isValidDate(props.value) ? new Date(props.value) : new Date()
);
const showDatePicker = ref(false);

const formattedDate = computed(() => {
    return moment(selectedDate.value).format(config.userDateFormat)
})

function isValidDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}

function toggleDatePicker(): void {
    showDatePicker.value = !showDatePicker.value;
}

function closeDatePicker(): void {
    showDatePicker.value = false;
    emit('update:value', formattedDate.value);
}
</script>


