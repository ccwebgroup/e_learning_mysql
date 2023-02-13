<template>
  <q-page padding>
    <div style="max-width: 1000px;" class="q-mx-auto">
      <q-toolbar>
        <q-toolbar-title>Lessons</q-toolbar-title>

        <q-btn @click="handleLessonsDialog(null)" color="primary" flat label="Add Lesson" class="float-right" />
      </q-toolbar>

      <div class="q-gutter-y-md">
        <template v-if="lessons.length">
          <q-card v-for="lesson in lessons" :key="lesson.id">
            <q-card-actions>
              <q-btn @click="handleLessonsDialog(lesson)" flat label="Edit" padding="2px 15px" no-caps />
              <q-btn @click="removeLesson(lesson)" flat label="Delete" padding="2px 15px" color="negative" no-caps />
            </q-card-actions>
            <q-card-section>
              <q-item-label class="text-subtitle1 text-primary text-bold">{{ lesson.title }}</q-item-label>
              <div class="q-px-sm">
                <p class="q-mt-sm">{{ lesson.caption }}</p>
              </div>
            </q-card-section>
          </q-card>
        </template>
        <div v-else class="q-pa-md text-subtitle1 text-center">
          <div><q-icon name="las la-inbox" size="85px" class="text-grey-7" /></div>
          <div>No data available.</div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useQuasar, date } from 'quasar';
import LessonsDialog from 'src/components/LessonsDialog.vue';
import { lessonStore } from 'src/stores/lessons';
import { computed, onBeforeMount } from 'vue';

const $q = useQuasar()

const lessons = computed(() => lessonStore().lessons)
onBeforeMount(() => lessonStore().getLessons())

function handleLessonsDialog(lesson) {
  $q.dialog({
    component: LessonsDialog,
    componentProps: {
      lesson: lesson
    }
  })
}

async function removeLesson(lesson) {
  await lessonStore().deleteLesson(lesson.id)
}
</script>
