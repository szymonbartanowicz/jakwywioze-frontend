<template>
    <div class="px-4">
        <v-text-field v-if="authorization.isUserLoggedIn()" label="Dodaj komentarz" variant="underlined" v-model="points.comment">
            <template v-slot:append-inner>
                <v-btn :ripple="false" class="ma-0 pa-0" variant="plain" size="xs" :disabled="!points.comment" @click="points.addComment(pointId)" icon="mdi-send">
                </v-btn>
            </template>
        </v-text-field>
        <div v-if="points.comments" v-for="comment in points.comments" class="text-left mb-3 border-s-md px-2">
            <div class="text-caption text-grey-darken-2">
                <span>{{ comment.user }}</span>
                <span> &bull; </span>
                <span>{{ moment(comment.createdAt).fromNow() }}</span>
                <a v-if="authorization.currentUser?.id === comment.userId" class="ml-1 text-caption text-grey-darken-2" href="" @click.prevent="points.deleteComment(2, <number>props.pointId)"> usuń</a>
            </div>
            <p class="text-body-2">{{ comment.text }}</p>
        </div>
    </div>


</template>
<script lang="ts" setup>
import moment from "moment";
import { usePointsStore } from '@/store/PointsStore'
import { useAuthorizationStore } from "@/store/AuthorizationStore";
import { defineProps, onMounted} from 'vue'

moment.locale('pl')

const points = usePointsStore()
const authorization = useAuthorizationStore()
const props = defineProps({
    pointId: {
        type: Number,
        required: true,
    },
})

onMounted(() => {
    points.getComments(<number>props.pointId)
})
</script>

<style scoped>
a {
    text-decoration: none;
}
</style>