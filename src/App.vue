<template>
  <router-view />
</template>

<script setup>
import { authStore } from "./stores/auth";

authStore().handleAuthState();
</script>
