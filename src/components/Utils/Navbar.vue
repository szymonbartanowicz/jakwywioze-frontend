<template>
  <v-app-bar app :elevation="2" color="blue1" class="custom-navbar" id="header">
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
                <v-list>
                    <v-list-item>
                        <v-list-item-title>
                            <router-link to="/profile" class="text-decoration-none">
                                <v-btn prepend-icon="mdi-account" variant="text" color="#112A46">Profil</v-btn>
                            </router-link>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>
                            <router-link to="/add-dynamic-point" class="text-decoration-none">
                              <v-btn prepend-icon="mdi-plus" variant="text" color="#112A46">Dodaj punkt</v-btn>
                            </router-link>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>
                            <v-btn prepend-icon="mdi-logout" variant="text" color="#112A46" class="text-decoration-none" @click="authorization.logout">Wyloguj się</v-btn>
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
import {onMounted, ref} from "vue";

const authorization = useAuthorizationStore();
const filters = useFiltersStore();

onMounted(() => {
    let lastScrollTop = 0;
    const header = document.getElementById('header');
    const headerHeight = 64;

    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop && currentScroll > headerHeight) {
            // Scrolling down, hide the header
            header.style.top = `-${headerHeight}px`;
        } else {
            // Scrolling up or at the top, show the header
            header.style.top = '0';
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    });
})

</script>
