<template>
  <q-page padding>
    <div v-if="exercises.length">
      <q-card>
        <q-card-section class="text-h6 q-pb-none">
          Test Yourself!
        </q-card-section>
        <q-card-section>
          <q-item-label class="text-subtitle2 text-primary">Exercise No. {{ exercises[current - 1].no }}</q-item-label>
          <q-item-label class="text-subtitle2">Points: <span class="text-positive">{{
            exercises[current - 1].points
          }}</span></q-item-label>
          <div class="q-py-md text-subtitle1">
            {{ exercises[current - 1].instruction }}
          </div>
          <!-- <ExerciseForm :exercise="exercises[current - 1]" /> -->
        </q-card-section>

      </q-card>
      <div class="flex flex-center q-pa-md">
        <q-pagination v-model="current" :max="exercises.length" :max-pages="6" direction-links outline color="amber-9"
          active-design="unelevated" active-color="brown" active-text-color="white" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onBeforeMount, computed, ref } from 'vue';
import { exerciseStore } from 'src/stores/exercises';
import { useRoute } from 'vue-router';
import ExerciseForm from 'src/components/ExerciseForm.vue';

const route = useRoute()
const current = ref(1)

const exercises = computed(() => exerciseStore().exercises)
onBeforeMount(() => exerciseStore().getExercises(route.params.id))
</script>
