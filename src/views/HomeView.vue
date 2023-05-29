<template>
      <v-container>
          <Filters/>
      </v-container>
  <div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Utils/Navbar.vue';
import Footer from '@/components/Utils/Footer.vue';
import Filters from '@/components/Home/Filters.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    Navbar, Footer, Filters
  },
});
</script>
