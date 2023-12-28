<template>
  <div class="container">
    <h4>{{ pointName }}</h4>
    <router-link
        :to="{
        name: 'point',
        params: {
          id: pointId,
        },
      }"
    >
      <v-btn text="Otwórz punkt" class="button"/>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    pointName: String,
    pointId: Number,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  padding: 5px;
  margin: 10px auto;
  color: black;
  background-color: #b0e8bc;
  font-weight: normal;
  font-size: 12px;
}
</style>

