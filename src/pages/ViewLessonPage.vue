<template>
  <q-page padding>
    <div v-if="lesson">
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div flat v-show="!loading" class="q-pa-sm">
          <div v-html="lesson.content"></div>

          <div class="rounded-borders bg-amber-9">
            <q-item-label header class="text-h6 text-white">Test Yourself With Exercises</q-item-label>
            <div class="bg-white q-pa-md">
              <q-btn :to="`/exercises/${lesson.id}`" label="Start the exercises" color="primary" />
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Loading design -->
    <q-inner-loading :showing="loading">
      <q-spinner-cube size="50px" color="primary" />
    </q-inner-loading>

    <!-- place QPageScroller at end of page -->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </q-page>
</template>
<style>
pre {
  background: rgb(22, 22, 22);
  color: white;
  padding: 10px;
}
</style>

<style lang="sass">
.ql-video
  width: 100%
  height: 56.25vw
  max-height: calc(800px / 16 * 9)
img
  width: 100%
  max-width: 750px
  height: auto
</style>

<script setup>
import { onBeforeMount, computed, ref, watch } from 'vue';
import { lessonStore } from 'src/stores/lessons';
import { useRoute } from 'vue-router';

const loading = ref(true);
const route = useRoute()
const lesson = computed(() => lessonStore().lesson)

watch(lesson, (newVal, oldVal) => {
  if (newVal) loading.value = false
})

onBeforeMount(() => lessonStore().getLesson(route.params.id))
</script>
