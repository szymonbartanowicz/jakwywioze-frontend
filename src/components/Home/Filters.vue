<template>
    <v-row no-gutters>
        <v-col
          cols="4"
        >
            <v-select
                    label="Rodzaj odpadów"
                    :items="['Drewno', 'Gruz', 'Biologiczne', 'Elektryka', 'Opony']"
                    class="mr-3"
            ></v-select>
        </v-col>
        <v-col
          cols="4"
        >
            <v-select
                    label="Miasto"
                    :items="['Poznań', 'Szczecin', 'Warszawa']"
                    class="mr-3"
            ></v-select>
        </v-col>
        <v-col
          cols="2"
        >
            <v-select
                    label="Zasięg"
                    :items="['1', '2', '5', '10', '20', '50']"
                    suffix="km"
                    class="mr-3"
            ></v-select>
        </v-col>
        <v-col
          cols="2"
        >
            <router-link to="/points">
                <v-btn
                    color="#00C500"
                    block
                    class="text-white float-left"
                    height="56px"
                >
                    Szukaj
                </v-btn>
            </router-link>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
</script>