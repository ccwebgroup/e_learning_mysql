<template>
  <q-layout view="lHh lpr lff">
    <q-header>
      <q-toolbar>
        <q-btn
          v-show="$route.name != 'Login' && $route.name != 'Index'"
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Menu"
          @click="$router.go(-1)"
        />
        <q-toolbar-title>{{ $route.name }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup></script>
