<template>
  <v-container>
    <v-sheet width="500" class="mx-auto">
      <v-form @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="name" :rules="rules" label="Nazwa"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="city" :rules="rules" label="City"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="street" :rules="rules" label="Street"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="zipcode" label="Kod pocztowy"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="phoneNumber" label="Numer telefonu"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="description" label="Opis"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <div>
              <v-menu
                  ref="startDateMenu"
                  v-model="startDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
              >
                <v-text-field
                    v-model="startDate"
                    label="Data rozpoczęcia"
                    readonly
                    v-slot="{ on }"
                    v-on="on"
                ></v-text-field>
                <v-date-picker v-model="startDate" no-title scrollable actions></v-date-picker>
              </v-menu>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div>
              <v-menu
                  ref="endDateMenu"
                  v-model="endDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
              >
                <v-text-field
                    v-model="endDate"
                    label="Data zakończenia"
                    readonly
                    v-slot="{ on }"
                    v-on="on"
                ></v-text-field>
                <v-date-picker v-model="endDate" no-title scrollable actions></v-date-picker>
              </v-menu>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="additionalWasteTypes" label="Dodatkowe typy śmieci"></v-text-field>
          </v-col>
        </v-row>
        <v-btn type="submit" block class="mt-2 green">Submit</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
import axios from "@/axios/axios";
// import {useAuthorizationStore} from "@/store/AuthorizationStore";

// const authorization = useAuthorizationStore();
export default {
  data: () => ({
    name: "",
    city: "",
    street: "",
    zipcode: "",
    phoneNumber: "",
    description: "",
    startDate: "",
    endDate: "",
    startDateMenu: false,
    endDateMenu: false,
    additionalWasteTypes: "",
    rules: [
      (value) => {
        if (value) return true;

        return "To pole nie może być puste.";
      },
    ],
  }),
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("/points", {
          name: this.name,
          city: this.city,
          street: this.street,
          zipcode: this.zipcode,
          phoneNumber: this.phoneNumber,
          dynamicPointInfo: {
            // user: authorization.currentUser.id,
            description: this.description,
            endDate: this.endDate,
            startDate: this.startDate,
            additionalWasteTypes: [this.additionalWasteTypes],
          },
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  },
};
</script>

<style>
.green {
  background-color: #B0E7BB;
}
</style>
