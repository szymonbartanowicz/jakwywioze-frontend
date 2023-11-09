<template>
  <v-app-bar app :elevation="2" color="#1976D2" class="custom-navbar">
    <v-container>
      <v-row align="center">
        <v-col cols="2">
          <router-link to="/">
            <v-btn text class="text-white">
              <v-icon left color="B0E8BC">mdi-map</v-icon>
              jakwywioze.pl
            </v-btn>
          </router-link>
        </v-col>
        <v-col v-if="!authorization.isUserLoggedIn()" cols="auto" class="ml-auto">
          <router-link to="/register">
            <v-btn text class="text-white">Zarejestruj się</v-btn>
          </router-link>
          <router-link to="/login">
            <v-btn color="green" class="text-white">Zaloguj się</v-btn>
          </router-link>
        </v-col>
        <v-col v-else cols="auto" class="ml-auto">
          <v-btn text class="text-white" @click="authorization.logout">Wyloguj się</v-btn>
          <router-link to="/profile">
            <v-btn text class="text-white">{{ authorization.getCurrentUser }}</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useAuthorizationStore } from "@/store/AuthorizationStore";
import { useFiltersStore } from "@/store/FiltersStore";

const authorization = useAuthorizationStore();
const filters = useFiltersStore();
</script>

<style scoped>
.custom-navbar {
  background-color: #1976D2;
}

.text-white {
  color: #fff !important;
}
</style>
