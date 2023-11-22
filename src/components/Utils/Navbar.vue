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
            <v-menu location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn
                            text color="#112A46"
                            v-bind="props"
                            append-icon="mdi-menu-down"
                    >
                        {{ authorization.getCurrentUser.username }}
                    </v-btn>
                </template>
                <v-list class="">
                    <v-list-item>
                        <v-list-item-title>
                            <router-link to="/profile">
                                <v-btn prepend-icon="mdi-account" variant="text" color="#112A46">Profil</v-btn>
                            </router-link>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>
                            <router-link to="/add-dynamic-point">
                              <v-btn prepend-icon="mdi-plus" variant="text" color="#112A46">Dodaj punkt</v-btn>
                            </router-link>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>
                            <v-btn prepend-icon="mdi-logout" variant="text" color="#112A46" @click="authorization.logout">Wyloguj się</v-btn>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
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
