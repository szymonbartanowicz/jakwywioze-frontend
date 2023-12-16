<template>
  <v-app-bar app :elevation="2" color="blue1" class="custom-navbar">
    <v-container>
      <v-row align="center">
        <v-col cols="2 ml-10 ml-sm-0">
          <router-link to="/" class="text-decoration-none">
            <v-btn text color="white" @click="filters.reload()"
            >
                <v-icon left color="white">mdi-recycle</v-icon>
                <span class="">jakwywioze.pl</span>
            </v-btn>
          </router-link>
        </v-col>
        <v-col v-if="!authorization.isUserLoggedIn()" cols="auto" class="ml-auto">
          <router-link class="d-none d-sm-inline text-decoration-none" to="/register">
            <v-btn text color="white">Zarejestruj się</v-btn>
          </router-link>
          <router-link to="/login" class="text-decoration-none">
            <v-btn text color="white">Zaloguj się</v-btn>
          </router-link>
        </v-col>
        <v-col v-else cols="auto" class="ml-auto">
            <v-menu location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn
                            text color="white"
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
import {ref} from "vue";

const authorization = useAuthorizationStore();
const filters = useFiltersStore();

const drawer = ref(false)
</script>
