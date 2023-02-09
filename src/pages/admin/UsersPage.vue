<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Manage Users</q-toolbar-title>

      <q-btn @click="userDialog = true" color="primary" flat label="Add User" class="float-right" />
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
          <template v-slot:body-cell-actions="props">
            <q-td class="text-center">
              <q-btn @click="editUser(props.row)" flat round size="sm" icon="las la-edit" color="positive" />
              <q-btn @click="deleteUser(props.row)" flat round size="sm" color="negative" icon="las la-trash" />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>

    <q-dialog v-model="userDialog">
      <q-card style="width: 380px;">
        <q-card-section class="text-h6">{{ editmode? 'Update': 'Add' }} User</q-card-section>
        <q-card-section>
          <q-form ref="userForm" @reset="resetForm" @submit="editmode ? update() : save()">
            <q-select v-model="form.type" outlined dense :options="userTypes" label="User Type"
              :rules="[(val) => !!val]" />
            <q-input v-model="form.firstname" outlined dense label="First Name" :rules="[(val) => !!val]" />
            <q-input v-model="form.lastname" outlined dense label="Last Name" :rules="[(val) => !!val]" />
            <q-input v-model="form.email" outlined dense label="Email" :rules="[(val) => !!val]" />
            <q-input v-model="form.password" outlined dense label="Password" :rules="[(val) => !!val]" />
            <q-card-actions align="right">
              <q-btn padding="4px 15px" color="primary" type="submit" :label="editmode ? 'Update' : 'Save'" />
              <q-btn padding="4px 15px" color="dark" type="reset" label="Clear" />
              <q-btn padding="4px 15px" flat label="Cancel" v-close-popup />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { reactive, ref, onBeforeMount, computed } from "vue";
import { userStore } from "stores/users";

const editmode = ref(false);
const userDialog = ref(false);

const userForm = ref(null);
const form = reactive({
  type: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
});

function resetForm() {
  editmode.value = false;
  form.type = "";
  form.firstname = "";
  form.lastname = "";
  form.email = "";
  form.password = "";
}

const userTypes = ["user", "admin"];

async function save() {
  const res = await userStore().addUser({
    ...form,
    fullname: `${form.firstname} ${form.lastname}`,
  });

  if (res) {
    userDialog.value = false
    userForm.value.reset();
  }
}

function editUser(user) {
  editmode.value = true;
  form.uid = user.uid;
  form.type = user.type;
  form.firstname = user.firstname;
  form.lastname = user.lastname;
  form.email = user.email;
  form.password = user.password;

  userDialog.value = true
}

async function update() {
  const res = await userStore().updateUser({
    ...form,
    fullname: `${form.firstname} ${form.lastname}`,
  });

  if (res) {
    userDialog.value = false
    userForm.value.reset();
  }
}

function deleteUser(user) {
  userStore().deleteUser(user);
}

const users = computed(() => userStore().users);
function getAllUsers() {
  userStore().getAllUsers();
}

onBeforeMount(() => getAllUsers());

// User Table
const filter = ref("");
const columns = [
  { name: "type", label: "Role", field: "type", align: "left" },
  { name: "fullname", label: "Full Name", field: "fullname", align: "left" },
  // { name: "username", label: "Username", field: "username", align: "left" },
  { name: "email", label: "Email", field: "email", align: "left" },
  { name: "actions", field: "actions", align: "center" },
];
</script>
