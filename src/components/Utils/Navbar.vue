<template>
  <v-app-bar app :elevation="2" color="#B0E8BC" class="custom-navbar">
    <v-container>
      <v-row align="center">
        <v-col cols="2">
          <router-link to="/">
            <v-btn text color="#112A46" @click="filters.reload()"
            >
                <v-icon left color="#112A46">mdi-recycle</v-icon>
                jakwywioze.pl
            </v-btn>
          </router-link>
        </v-col>
        <v-col v-if="!authorization.isUserLoggedIn()" cols="auto" class="ml-auto">
          <router-link to="/register">
            <v-btn text color="#112A46">Zarejestruj się</v-btn>
          </router-link>
          <router-link to="/login">
            <v-btn text color="#112A46">Zaloguj się</v-btn>
          </router-link>
        </v-col>
        <v-col v-else cols="auto" class="ml-auto">
          <v-btn text color="#112A46" @click="authorization.logout">Wyloguj się</v-btn>
          <router-link to="/profile">
            <v-btn text color="#112A46">{{ authorization.getCurrentUser.username }}</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts" setup>
import {useAuthorizationStore} from "@/store/AuthorizationStore";
import {useFiltersStore} from "@/store/FiltersStore";

const authorization = useAuthorizationStore();
const filters = useFiltersStore();
</script>
