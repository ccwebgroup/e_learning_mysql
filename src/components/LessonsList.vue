<template>
  <div>
    <template v-if="lessons">
      <q-item dense v-for="lesson in lessons" clickable :key="lesson.id" :to="`/lessons/${lesson.id}`"
        active-class="text-amber-5">
        <q-item-section avatar>
          <q-icon name="las la-book" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-h6">{{ lesson.title }}</q-item-label>
          <q-item-label lines="1" caption>{{ lesson.caption }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { lessonStore } from 'src/stores/lessons';

const lessons = computed(() => lessonStore().lessons)
</script>
