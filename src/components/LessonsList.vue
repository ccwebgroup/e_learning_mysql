<template>
  <div class="q-gutter-y-sm">
    <template v-if="lessons">
      <q-item dense v-for="lesson in lessons" clickable :key="lesson.id" @click="routeTo(lesson.id)"
        active-class="text-amber-5" :class="{ 'text-amber-6 active-lesson': $route.params.id == lesson.id }">
        <q-item-section avatar>
          <q-icon name="las la-book" />
        </q-item-section>

        <q-item-section>
          <q-item-label style="font-size: 17px;" lines="1" :class="{ 'text-amber-6': $route.params.id == lesson.id }"
            class="text-weight-medium">{{
              lesson.title
            }}</q-item-label>
          <q-item-label lines="1" caption :class="{ 'text-amber-2': $route.params.id == lesson.id }">{{ lesson.caption
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
</div>
</template>

<style lang="scss">
.active-lesson {
  background-color: rgba(0, 0, 0, 0.534);
}
</style>

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
