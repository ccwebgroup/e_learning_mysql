<template>
  <q-page padding>
    <div v-if="lesson">
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div flat v-show="!loading" class="q-pa-sm">
          <q-card flat>
            <q-card-actions align="right" class="q-py-none">
              <q-btn @click="$router.go(-1)" icon="las la-arrow-alt-circle-left" dense flat label="Back" />
            </q-card-actions>
            <q-card-section class="q-py-none">
              <q-item-label class="text-h6 text-primary text-bold"><span class="q-mr-sm">Lesson: {{
                lesson.no
              }} -</span>{{ lesson.title }}</q-item-label>
              <div class="q-pa-sm">
                <q-btn @click="handleExerciseDialog" label="Add Exercise" flat dense icon="las la-plus-circle"
                  color="primary" />
              </div>
            </q-card-section>
          </q-card>

          <q-card v-for="exercise in exercises" :key="exercise.id">
            <q-card-section>
              <q-item-label class="text-subtitle1">{{ `Exercise No. ${exercise.no}` }}</q-item-label>
              <q-item-label class="q-pt-sm text-subtitle2 text-primary">Instructions</q-item-label>
              {{ exercise.instruction }}
              <q-item-label class="q-pt-sm text-subtitle2 text-positive">Query Statement Answer</q-item-label>
              <pre class="query-statement">
                {{ exercise.answer }}
              </pre>
            </q-card-section>
          </q-card>
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

function handleExerciseDialog() {
  $q.dialog({
    component: ExerciseDialog,
    componentProps: {
      lesson: lesson.value
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
