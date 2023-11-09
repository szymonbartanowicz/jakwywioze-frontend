<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="filters-info">
          <v-card-title class="headline">
            <v-icon>mdi-map</v-icon>
            Witaj w jakwywioze.pl
          </v-card-title>
          <v-card-text>
            <p>Wybierz filtry i znajdź swoje punkty!</p>
            <v-btn class="resetBtn" color="#B0E8BC" @click="resetFilters">Resetuj filtry</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="css">
.filters-info {
  margin-top: 10px;
}

.resetBtn {
  margin-top: 10px;
}
</style>

<script lang="ts" setup>
import { useFiltersStore } from '@/store/FiltersStore';

const filters = useFiltersStore();
const resetFilters = () => {
  filters.reset();
};
</script>
