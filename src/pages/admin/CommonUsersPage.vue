<template>
  <q-page padding>
    <div style="max-width: 1000px;" class="q-mx-auto">
      <q-toolbar>
        <q-toolbar-title>Common Users</q-toolbar-title>
      </q-toolbar>
      <div class="row q-gutter-sm justify-evenly">
        <div class="col-12">
          <q-table flat separator="cell" bordered dense :filter="filter" :rows="users" :columns="columns"
            :pagination="{ rowsPerPage: 10 }">
            <template v-slot:top>
              <q-input v-model="filter" dense placeholder="Search" class="q-mb-sm">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body-cell-level="props">
              <q-td :props="props" class="text-center" auto-width>
                <span class="text-primary text-subtitle2">{{ checkLevel(props.row.points) }}</span>
              </q-td>
            </template>
            <template v-slot:body-cell-points="props">
              <q-td :props="props" class="text-center" auto-width>
                <span v-if="props.row.points" class="text-positive text-subtitle2">+{{ props.row.points }}</span>
                <span v-else>0</span>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </div>


  </q-page>
</template>
<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { userStore } from "stores/users";

const users = computed(() => userStore().commonUsers);
function getAllUsers() {
  userStore().getCommonUsers();
}

onBeforeMount(() => getAllUsers());

function checkLevel(points) {
  let level = 'Beginner'
  if (points > 500) level = 'Intermediate';
  if (points > 1000) level = 'Advance';
  if (points > 2000) level = 'Expert';

  return level;
}

// User Table
const filter = ref("");
const columns = [
  { name: "fullname", label: "Full Name", field: "fullname", align: "left", sortable: true },
  { name: "email", label: "Email", field: "email", align: "left", sortable: true },
  { name: "level", label: "Level", field: "level", align: "center", sortable: true },
  { name: "points", label: "Points", field: "points", align: "center", sortable: true },
];
</script>
