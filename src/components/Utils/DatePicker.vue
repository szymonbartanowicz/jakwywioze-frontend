<template>
  <v-row>
    <v-col>
      <v-menu
          v-model="showDatePicker"
          :close-on-content-click="false"
          :nudge-right="40"
          offset-y
          attach
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="formattedDate"
              :label="label"
              readonly
              v-bind="attrs"
              v-on="on"
              @click.stop="toggleDatePicker"
              append-icon="mdi-calendar"
          ></v-text-field>
        </template>
        <v-date-picker v-model="selectedDate" @input="closeDatePicker" title="Wybierz datę" hide-header color="#AADEB5"
                       flat :locale="pl" position="relative" ></v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
import {pl} from "vuetify/locale";

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedDate: this.isValidDate(this.value) ? new Date(this.value) : new Date(),
      showDatePicker: false,
    };
  },
  computed: {
    pl() {
      return pl
    },
    formattedDate() {
      const offset = this.selectedDate.getTimezoneOffset();
      const adjustedDate = new Date(this.selectedDate.getTime() - (offset * 60 * 1000));
      return adjustedDate.toISOString().split('T')[0];
    }
  },
  methods: {
    isValidDate(dateString) {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(dateString);
    },
    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker;
    },
    closeDatePicker() {
      this.showDatePicker = false;
      this.$emit('input', this.formattedDate);
    }
  }
};
</script>

<style scoped>
</style>
