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
            </q-card-section>

            <ExerciseDialog :lesson="lesson" />
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

<script setup>
import { onBeforeMount, computed, ref, watch } from 'vue';
import { lessonStore } from 'src/stores/lessons';
import { useRoute } from 'vue-router';
import ExerciseDialog from 'src/components/ExerciseDialog.vue';

const loading = ref(true);
const route = useRoute()
const lesson = computed(() => lessonStore().lesson)

watch(lesson, (newVal, oldVal) => {
  if (newVal) loading.value = false
})

onBeforeMount(() => lessonStore().getLesson(route.params.id))
</script>
