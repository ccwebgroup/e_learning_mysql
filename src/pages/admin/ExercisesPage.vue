<template>
  <q-page padding>
    <div v-if="lesson">
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div flat v-show="!loading" class="q-pa-sm q-mx-auto" style="max-width: 800px">
          <q-card flat>
            <q-card-actions align="right" class="q-py-none">
              <q-btn @click="$router.go(-1)" icon="las la-arrow-alt-circle-left" dense flat label="Back" />
            </q-card-actions>
            <q-card-section class="q-py-none">
              <q-item-label class="text-h6 text-primary text-bold"><span class="q-mr-sm">Lesson: {{
                lesson.no
              }} -</span>{{ lesson.title }}</q-item-label>
              <div class="q-pa-sm">
                <q-btn @click="handleExerciseDialog(null)" label="Add Exercise" flat dense icon="las la-plus-circle"
                  color="primary" />
              </div>
            </q-card-section>
          </q-card>

          <div class="q-px-md q-gutter-y-sm">

            <q-card v-for="exercise in exercises" :key="exercise.id" class="exercise-card">
              <q-card-section class="q-pb-none">
                <q-item-label class="text-subtitle2 text-primary">{{ `Exercise No. ${exercise.no}` }}</q-item-label>

                <div class="q-py-sm text-subtitle1">
                  {{ exercise.instruction }}
                </div>
                <q-item-label class="text-subtitle2 text-positive">
                  <span>Answer: </span>
                  <span v-if="exercise.type == 'quiz'">{{ exercise.choices[exercise.answer - 1].text }}</span>
                  <span v-else>{{ exercise.answer }}</span>
                </q-item-label>
              </q-card-section>
              <q-card-actions>
                <q-btn @click="handleExerciseDialog(exercise)" unelevated flat text-color="dark" dense icon="las la-edit"
                  label="Edit" no-caps />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </transition>
    </div>

    <!-- Loading design -->
    <q-inner-loading :showing="loading">
      <q-spinner-cube size="50px" color="primary" />
    </q-inner-loading>

</q-page>
</template>

<style lang="scss">
.query-statement {
  background: rgb(34, 34, 34);
  color: white;
  border-radius: 5px;
  padding: 5px;
  border-left: 10px solid $amber-9;
}

.exercise-card {
  border-radius: 5px;
  border-left: 10px solid $amber-9;
}
</style>


<script setup>
import { onBeforeMount, computed, ref, watch } from 'vue';
import { lessonStore } from 'src/stores/lessons';
import { exerciseStore } from 'src/stores/exercises';
import { useRoute } from 'vue-router';
import ExerciseDialog from 'src/components/ExerciseDialog.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar()
const loading = ref(true);
const route = useRoute()
const lesson = computed(() => lessonStore().lesson)

function handleExerciseDialog(exercise) {
  $q.dialog({
    component: ExerciseDialog,
    componentProps: {
      lesson: lesson.value,
      exercise: exercise
    }
  })
}

watch(lesson, (newVal, oldVal) => {
  if (newVal) loading.value = false
})

onBeforeMount(() => lessonStore().getLesson(route.params.id))

const exercises = computed(() => exerciseStore().exercises)
onBeforeMount(() => exerciseStore().getExercises(route.params.id))
</script>
