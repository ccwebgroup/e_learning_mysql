<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="q-py-sm">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          E-Learning MySQL
        </q-toolbar-title>

        <div v-if="!authUser"><q-btn to="/auth/login" flat label="Log In" /></div>
        <div v-else><q-btn @click="logout" flat label="Log Out" /></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label class="text-subtitle1" header>
          Essential Lessons
        </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { authStore } from 'src/stores/auth';

const linksList = [
  {
    title: 'MySQL',
    // caption: 'quasar.dev',
    icon: 'las la-home',
    link: '/'
  },
]

const leftDrawerOpen = ref(false)
const authUser = computed(() => authStore().authUser)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout() {
  authStore().logOut();
}

</script>
