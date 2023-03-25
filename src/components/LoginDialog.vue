<template>
  <q-dialog ref="dialogRef" transition-show="slide-up" transition-hide="fade">
    <q-card style="width: 450px;">
      <q-card-section class="row justify-center">
        <q-card dark class="full-width text-center bg-primary">
          <div class="flex q-gutter-x-sm q-pa-sm">
            <div>
              <q-avatar size="60px">
                <img src="/icons/favicon-128x128.png" alt="app_logo">
              </q-avatar>
            </div>
            <div class="column">
              <div class="text-h5">
                E-Learning
              </div>
              <div class="text-h6 text-amber-4">
                MySQL
              </div>
            </div>
          </div>
        </q-card>
      </q-card-section>
      <q-card-section>
        <q-form @submit="login" class="q-gutter-sm">
          <q-input v-model="form.email" placeholder="Username" outlined dense
            :rules="[(val) => !!val || 'Field is required!']" />
          <q-input v-model="form.password" placeholder="Password" type="password" outlined dense
            :rules="[(val) => !!val || 'Field is required!']" />
          <div v-if="loginError" class="text-negative text-center">
            {{ loginError }}
          </div>
          <q-card-actions align="center" class="q-gutter-y-sm">
            <q-btn :loading="loadingBtn" label="Log In" type="submit" class="full-width" color="primary" />
            <q-btn @click="handleRegister" v-close-popup label="Create an account" class="full-width" flat color="primary"
              no-caps />
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
import { useQuasar } from "quasar";

import RegisterDialog from "src/components/RegisterDialog.vue";

const form = reactive({
  email: "",
  password: "",
});

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK } = useDialogPluginComponent()





const $q = useQuasar()
const loginError = ref(null)
const loadingBtn = ref(false)
const login = async () => {
  loadingBtn.value = true
  const res = await authStore().login({ ...form })
  if (res) {
    if (res.error) loginError.value = res.message
    loadingBtn.value = false
    onDialogOK()
  }
}

function handleRegister() {
  $q.dialog({
    component: RegisterDialog
  })
}
</script>
