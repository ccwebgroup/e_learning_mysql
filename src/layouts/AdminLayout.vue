<template>
  <q-layout view="hHh LpR fFf">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar size="35px">
            <q-icon size="30px" name="las la-user-shield" />
          </q-avatar>
          Admin
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer dark show-if-above v-model="leftDrawerOpen" side="left" bordered class="bg-dark">
      <q-list dark>
        <q-item-label class="text-subtitle1" header>
          Admin Panel
        </q-item-label>
        <EssentialLink v-for="link in adminLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'src/components/EssentialLink.vue';

const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const adminLinks = [
  { link: "/", title: "Home Page", icon: "las la-home" },
  { link: "/admin/common-users", title: "Common Users", icon: "las la-users" },
  { link: "/admin/users", title: "Manage Users", icon: "las la-users-cog" },
  { link: "/admin", title: "Lessons", icon: "las la-swatchbook" },
];


</script>
