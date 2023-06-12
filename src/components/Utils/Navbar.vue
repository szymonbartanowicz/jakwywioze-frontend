<template>
    <v-app-bar :elevation="2" color="blue" class="custom-navbar">
        <div>
            <router-link to="/">
                <v-btn
                    class="mr-2 ml-2 text-white"
                >
                    <v-icon icon="mdi-recycle" color="green" class="mr-1" size="x-large"></v-icon>
                    Jakwywioze.pl
                </v-btn>
            </router-link>
        </div>
        <div class="ml-auto mr-2">
            <router-link to="/register">
                <v-btn
                    rounded
                    class="text-white mr-1"
                >
                    Zarejestruj się
                </v-btn>
            </router-link>
            <router-link to="login">
                <v-btn
                    variant="elevated"
                    color="green"
                    rounded
                    class="text-white"
                >
                    Zaloguj się
                </v-btn>
            </router-link>
        </div>
    </v-app-bar>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'Navbar',
});
</script>

<style scoped>
.v-btn__prepend {
    color: #fff !important;
}
</style>