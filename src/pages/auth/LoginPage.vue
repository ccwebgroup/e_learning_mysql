<template>
  <q-page class="bg-gradient flex flex-center">
    <div>
      <div class="row justify-between">
        <div class="col-12 col-md-6">
          <q-img width="500px" src="~assets/firm.svg" />
        </div>
        <div class="col-12 col-md-5 item-center">
          <q-card style="width: 320px;" class="q-mx-auto">
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
                  <q-btn @click="handleRgister" v-close-popup label="Create an account" class="full-width" flat
                    color="primary" no-caps />
                </q-card-actions>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #ddc006 0%, #8b062c 100%);
}
</style>

<script setup>
import { reactive, ref } from "vue";
import { authStore } from "src/stores/auth";
import { useQuasar } from "quasar";
import RegisterDialog from "src/components/RegisterDialog.vue";

const form = reactive({
  email: "",
  password: "",
});

const $q = useQuasar()
const loginError = ref(null)
const loadingBtn = ref(false)
const login = async () => {
  loadingBtn.value = true
  const res = await authStore().login({ ...form })
  if (res) {
    if (res.error) loginError.value = res.message
    loadingBtn.value = false
  }
}

function handleRgister() {
  $q.dialog({
    component: RegisterDialog
  })
}
</script>
