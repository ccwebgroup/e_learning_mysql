<template>
  <q-page padding>
    <q-card flat>
      <q-card-section class="text-h6">Lessons</q-card-section>
      <q-card-actions align="right">
        <q-btn outline @click="handleLessonsDialog(null)" color="primary" label="Add Lesson" no-caps />
      </q-card-actions>
    </q-card>
    <div class="q-gutter-y-md">
      <q-card v-for="lesson in lessons" :key="lesson.id" style="max-width: 500px;">
        <q-card-section>
          <q-item-label class="text-subtitle1">{{ lesson.title }}</q-item-label>
          <q-item-label class="text-caption">{{
            date.formatDate(lesson.createdAt.toDate(), 'MMM D, YYYY')
          }}</q-item-label>
          <p>{{ lesson.caption }}</p>

        </q-card-section>
      </q-card>
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
</script>
