<template>
    <v-app>
        <Navbar/>
        <router-view/>
        <Footer/>
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Utils/Navbar.vue';
import Footer from '@/components/Utils/Footer.vue';

export default defineComponent({
    name: 'App',
    components: {
        Navbar, Footer
    },
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.v-application__wrap  > .v-container {
    margin-top: 100px;
}
</style>
