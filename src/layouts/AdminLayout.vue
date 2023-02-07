<template>
  <q-layout view="lHh LpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn v-if="!$q.screen.lt.md" dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-icon v-if="$route.meta.subPage" @click="$router.go(-1)" size="md" name="arrow_back" />
        <q-toolbar-title> {{ $route.name }} </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer dark show-if-above v-model="leftDrawerOpen" side="left" bordered class="bg-grey-10">
      <div v-if="authUser" class="text-center q-pt-sm">
        <q-avatar size="70px" color="grey-3">
          <q-icon name="mdi-account" />
        </q-avatar>
        <q-item-label class="text-subtittle1 text-bold q-mt-xs">{{ authUser.fullname }}</q-item-label>
      </div>
      <q-separator dark spaced />
      <q-list>
        <q-item v-for="link in linklist" clickable :key="link.path" :to="link.path">
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtittle1">{{ link.name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item @click="handleAccountMenu(authUser)" clickable="">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtittle1">Account</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="$q.screen.lt.md" bordered :class="$q.dark.mode ? 'bg-dark text-white' : 'bg-white text-dark'">
      <div>
        <q-tabs class="q-pb-xs" align="center">
          <q-route-tab v-for="link in linklist" :icon="link.icon" :to="link.path" :key="link.path" exact>
            <span class="text-capitalize text-caption">{{ link.name }}</span>
          </q-route-tab>
          <q-tab @click="handleAccountMenu(authUser)" icon="mdi-shield-account">
            <span class="text-capitalize text-caption">Account</span>
          </q-tab>
        </q-tabs>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import AccountMenu from "src/components/dialog/AccountMenu.vue";
import { authStore } from "src/stores/auth";
import { computed, ref } from "vue";

const leftDrawerOpen = ref(false)
const authUser = computed(() => authStore().authUser);
const linklist = [
  { path: "/admin/users", name: "Users", icon: "mdi-account-group" },
];

const $q = useQuasar();
function handleAccountMenu(user) {
  $q.dialog({
    component: AccountMenu,
    componentProps: {
      user: user,
    },
  });
}
</script>
