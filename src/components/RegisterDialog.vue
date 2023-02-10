<template>
  <q-dialog ref="dialogRef" transition-show="slide-up" transition-hide="fade">
    <q-card style="width: 520px;">
      <q-card-section class="text-h5 text-bold">Register</q-card-section>
      <q-card-section>
        <q-form @submit="register" class="q-gutter-sm">
          <div class="row q-gutter-x-sm justify-between">
            <q-input style="max-width: 230px;" v-model="form.firstname" dense outlined placeholder="First Name"
              :rules="[(val) => !!val]" />
            <q-input style="max-width: 230px;" v-model="form.lastname" dense outlined placeholder="Last Name"
              :rules="[(val) => !!val]" />
          </div>
          <q-input v-model="form.username" rounded outlined dense placeholder="Username" :rules="[(val) => !!val]" />
          <q-input v-model="form.password" rounded outlined dense placeholder="Password" type="password"
            :rules="[(val) => !!val]" />
          <div class="text-negative text-subtitle1 text-center">{{ registerError }}</div>
          <q-card-actions class="q-gutter-y-sm">
            <q-btn type="submit" :loading="isLoading" class="full-width" label="Register" no-caps color="primary" />
            <q-btn class="full-width" label="Cancel" no-caps color="primary" outline v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useDialogPluginComponent } from 'quasar';
import { authStore } from 'src/stores/auth';
import { reactive, ref } from 'vue';

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK } = useDialogPluginComponent()

const form = reactive({
  firstname: "",
  lastname: "",
  username: "",
  password: ""
})

const isLoading = ref(false)
const registerError = ref(null)
async function register() {
  isLoading.value = true
  const res = await authStore().register({ ...form })
  if (res.success) {
    isLoading.value = false
    onDialogOK()
  } else if (res.error) {
    isLoading.value = false
    registerError.value = res.message
  }
}
</script>
