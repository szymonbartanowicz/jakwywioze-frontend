<template>
    <v-container>
        <v-card width="600px" class="mx-auto mt-4" v-for="point in points" v-if="points.length">
            <v-img
                class="align-end text-white"
                height="200"
                src="https://normanprof.com/wp-content/uploads/2016/06/thumbnail-default.jpg"
                cover
            >
            </v-img>
            <v-card-title class="text-left mt-2">{{ point.name }}</v-card-title>
            <v-card-text class="text-left">
                <div>Opis punktu...</div>
            </v-card-text>
            <v-list class="text-left" density="compact">
                <v-list-item><v-icon icon="mdi-map-marker" class="mr-2"></v-icon>{{ point.city }}</v-list-item>
                <v-list-item><v-icon icon="mdi-clock" class="mr-2"></v-icon>Godziny otwarcia</v-list-item>
                <v-list-item><v-icon icon="mdi-web" class="mr-2"></v-icon>Strona internetowa</v-list-item>
                <v-list-item><v-icon icon="mdi-phone" class="mr-2"></v-icon>Telefon</v-list-item>
            </v-list>
            <v-card-actions class="float-right pa-4">
                <v-btn variant="outlined" color="#00C500">Info</v-btn>
                <v-btn variant="flat" color="#00C500" class="text-white">Trasa</v-btn>
            </v-card-actions>
        </v-card>
        <div v-else>Brak punktów spełniających podane kryteria</div>
    </v-container>
</template>
<script>
import axios from "../axios/axios"
export default {
    data() {
        return {
            points: [],
        };
    },
    name: "App",
    methods: {
        getPoints() {
            axios
                .get("/points")
                .then((response) => {
                    console.log(response.data);
                    this.points = response.data;
                })
                .catch((errors) => {
                    console.log(errors);
                });
        },
    },
    mounted() {
        this.getPoints();
    }
};
// import { reactive, onMounted } from "vue";
// import axios from "axios";
//
// export default {
//     name: "App",
//     setup() {
//         const state = reactive({
//             points: [],
//         });
//
//         const getPoints = () => {
//             axios
//                 .get("http://localhost:8081/points")
//                 .then((response) => {
//                     console.log(response.data);
//                     state.points = response.data;
//                 })
//                 .catch((errors) => {
//                     console.log(errors);
//                 });
//         };
//
//         onMounted(() => {
//             getPoints();
//         });
//
//         return {
//             state,
//             getPoints,
//         };
//     },
// };
</script>

