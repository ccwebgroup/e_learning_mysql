<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="q-py-sm">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <!-- <q-toolbar-title>
          E-Learning MySQL
        </q-toolbar-title> -->
        <q-space />
        <div v-if="!authUser"><q-btn to="/auth/login" flat label="Log In" /></div>
        <div v-else><span class="q-mr-md text-subtitle1">Hi, {{ authUser.firstname }}</span><q-btn @click="logout" flat
            label="Log Out" /></div>
      </q-toolbar>
    </q-header>

    <q-drawer dark v-model="leftDrawerOpen" show-if-above bordered class="bg-indigo-9">
      <q-list dark dense>
        <q-item-label class="text-subtitle1" header>
          Essential Lessons
        </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
        <LessonsListVue />
      </q-list>
    </q-drawer>

    <!-- RIght Drawer -->
    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered :width="220">
      <div v-if="authUser">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <q-icon size="30px" name="las la-user" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle1 text-medium text-primary">{{ authUser.fullname }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item-label header class="text-subtitle1">Progress</q-item-label>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon name="las la-trophy" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6 text-medium text-primary">Level 10</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="las la-medal" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-primary text-subtitle1">Beginner</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="las la-award" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Scores</q-item-label>
              <q-item-label class="text-subtitle1">108</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import LessonsListVue from 'src/components/LessonsList.vue';
import { authStore } from 'src/stores/auth';
import { lessonStore } from 'src/stores/lessons';

const linksList = [
  {
    title: 'MySQL',
    // caption: 'quasar.dev',
    icon: 'las la-home',
    link: '/'
  },
]

onBeforeMount(() => lessonStore().getLessons())

const leftDrawerOpen = ref(false)
const authUser = computed(() => authStore().authUser)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const rightDrawerOpen = ref(false)
function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

function logout() {
  authStore().logOut();
}

</script>
