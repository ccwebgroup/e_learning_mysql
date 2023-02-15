<template>
  <div>
    <template v-if="lessons">
      <q-item dense v-for="lesson in lessons" clickable :key="lesson.id" @click="routeTo(lesson.id)"
        active-class="text-amber-5">
        <q-item-section avatar>
          <q-icon name="las la-book" />
        </q-item-section>

        <q-item-section>
          <q-item-label style="font-size: 18px;" lines="1">{{ lesson.title }}</q-item-label>
          <q-item-label lines="1" caption>{{ lesson.caption }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { lessonStore } from 'src/stores/lessons';
import { useRouter } from 'vue-router'

const router = useRouter();
const lessons = computed(() => lessonStore().lessons)

function routeTo(id) {
  lessonStore().getLesson(id)
  router.push(`/lessons/${id}`)
}
</script>
