<template>
    <div class="px-4">
        <v-form v-if="authorization.isUserLoggedIn()" @submit.prevent="points.addComment($event, pointId)" class="d-flex">
            <v-text-field :rules="commentRules" label="Dodaj komentarz" variant="underlined" v-model="points.comment">
            </v-text-field>
            <v-btn type="submit" :ripple="false" class="ma-0 pa-0 ml-2" variant="plain" size="xs" :disabled="!points.comment" @click="points.addComment($event, pointId)" icon="mdi-send"></v-btn>
        </v-form>
        <v-progress-circular v-if="points.addingComment" indeterminate color="blue"></v-progress-circular>
        <div v-if="points.comments && !points.addingComment" v-for="comment in points.comments" class="text-left mb-3 border-s-md px-2">
            <div class="text-caption text-grey-darken-2">
                <span>{{ comment.user }}</span>
                <span> &bull; </span>
                <span>{{ moment.utc(comment.createdAt).fromNow() }}</span>
                <a v-if="authorization.currentUser?.id === comment.userId" class="ml-1 text-caption text-red" href="" @click.prevent="points.deleteComment(comment.id, <number>props.pointId)"> usuń</a>
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
});

const commentRules = [
    (v: string) => v.length <= 255 || 'Komentarz może posiadać maksymalnie 255 znaków',
]

onMounted(() => {
    points.getComments(<number>props.pointId)
})
</script>
<style scoped>
a {
    text-decoration: none;
}
</style>