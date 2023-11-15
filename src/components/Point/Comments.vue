<template>
    <div class="px-4">
        <v-text-field label="Dodaj komentarz" variant="underlined" v-model="points.comment">
            <template v-slot:append-inner>
                <v-btn :ripple="false" class="ma-0 pa-0" variant="plain" size="xs" :disabled="!points.comment" @click="points.addComment(pointId)" icon="mdi-send">
                </v-btn>
            </template>
        </v-text-field>
        <div v-if="points.comments" v-for="comment in points.comments" class="text-left mb-3 border-s-md px-2">
            <div class="text-caption text-grey-darken-2">
                <span>{{ comment.user }}</span>
                <span> &bull; </span>
                <span>2 weeks ago</span>
            </div>
            <p class="text-body-2">{{ comment.text }}</p>
        </div>
    </div>


</template>
<script lang="ts" setup>
import { usePointsStore } from '@/store/PointsStore'
import { defineProps, onMounted } from 'vue'

const points = usePointsStore()
const props = defineProps({
    pointId: {
        type: Number,
        required: true,
    },
});

onMounted(() => {
    points.getComments(props.pointId)
})
</script>