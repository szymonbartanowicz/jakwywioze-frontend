<template>
    <v-menu v-model="isMenuOpen" >
            <template v-slot:activator="{ props }">
                <v-text-field
                    :label="label"
                    v-model="formattedDate"
                    readonly
                    v-bind="props"
                    append-inner-icon="mdi-calendar"
                ></v-text-field>
            </template>
        <v-date-picker v-model="selectedDate" hide-actions title="" :color="color">
        </v-date-picker>
    </v-menu>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits } from "vue";

const { label, color, modelValue } = defineProps([
    "label",
    "color",
    "modelValue",
]);
const emit = defineEmits(["update:modelValue"]);

const isMenuOpen = ref(false);
const selectedDate = ref(modelValue);

const formattedDate = computed(() => {
    return selectedDate.value ? selectedDate.value.toLocaleDateString("pl") : "";
});

watch(modelValue, (newDate) => {
    selectedDate.value = newDate;
});

watch(selectedDate, (newDate) => {
    emit("update:modelValue", newDate);
});
</script>