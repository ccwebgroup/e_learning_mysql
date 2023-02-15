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

          <!-- Choices Display -->
          <div class="q-px-md">
            <div v-for="item in exercises[current - 1].choices" :key="item.index">
              <q-radio v-model="answer" :val="item.index" :disable="checkIfTaken(exercises[current - 1])"
                :label="item.text" checked-icon="task_alt" />
              <q-chip v-if="checkIfTaken(exercises[current - 1]) && exercises[current - 1].answer == item.index"
                color="positive" size="sm" text-color="white">Answer</q-chip>
            </div>
          </div>

          <!-- <ExerciseForm :exercise="exercises[current - 1]" /> -->
          <q-card-actions align="right">
            <q-btn @click="submitAnswer(exercises[current - 1])" :disable="checkIfTaken(exercises[current - 1])"
              :loading="isLoading" unelevated padding="2px 20px"
              :label="checkIfTaken(exercises[current - 1]) ? 'Done!' : 'Submit'"
              :color="checkIfTaken(exercises[current - 1]) ? 'dark' : 'primary'" no-caps />
            <q-btn v-if="exercises.length > 1" @click="current + 1" label="Next" />
          </q-card-actions>
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
import { answerStore } from 'stores/answers'
import { authStore } from 'stores/auth'
import { useRoute } from 'vue-router';
import ExerciseForm from 'src/components/ExerciseForm.vue';
import { useQuasar } from 'quasar';

const route = useRoute()
const current = ref(1)
const answer = ref('')
const $q = useQuasar()

const authUser = computed(() => authStore().authUser)
const exercises = computed(() => exerciseStore().exercises)
onBeforeMount(() => exerciseStore().getExercises(route.params.id))

function checkIfTaken(data) {
  let status = false
  if (authUser.value.exercises) {
    if (authUser.value.exercises.includes(data.id)) status = true
    answer.value = data.answer
  }
  return status;
}

const isLoading = ref(false)
async function submitAnswer(data) {
  isLoading.value = true
  let points = 0
  let color, message;

  if (data.answer == answer.value) {
    points = data.points
    message = `<div class="text-h6">Answer is correct! <span class="text-subtitle2 text-positive">+${points}</span> pts.</div>`
    color = "positive"
  } else {
    message = '<div class="text-h6">Sorry, wrong answer!</div>'
    color = "negative"
  }

  $q.notify({
    message: message,
    color: color,
    html: true,
    position: 'center'
  })

  const res = await answerStore().submitAnswer(data.id, points)
  if (res) {
    isLoading.value = false
  }
}
</script>
