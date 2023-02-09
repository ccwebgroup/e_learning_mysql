<template>
  <q-page padding class="bg-gradient">
    <div class="row justify-end q-mt-md">
      <img width="600" src="~assets/firm.svg" alt="" class="absolute-center">
      <q-card style="width: 320px; height: 500px;" class="q-mr-md">
        <q-card-section class="row justify-center">
          <!-- <q-avatar size="180px" >
          <img src="/icons/favicon-128x128.png" alt="app_logo">
          </q-avatar> -->
          <q-card dark class="full-width text-center bg-primary">
            <q-card-section>
              <div class="text-h4 text-bold">E-Learning
              </div>
              <div class="text-h6 text-bold">MySQL</div>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section>
          <q-form @submit="login" class="q-gutter-sm">
            <q-input v-model="form.email" placeholder="Username" outlined dense
              :rules="[(val) => !!val || 'Field is required!']" />
            <q-input v-model="form.password" placeholder="Password" type="password" outlined dense
              :rules="[(val) => !!val || 'Field is required!']" />
            <div class="text-negative text-center">
              {{ loginError }}
            </div>
            <q-card-actions align="center" class="q-gutter-y-sm">
              <q-btn :loading="loadingBtn" label="Log In" type="submit" class="full-width" color="primary" />
              <q-btn to="/auth/register" label="Create an account" class="full-width" flat color="primary" no-caps />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
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

const form = reactive({
  email: "",
  password: "",
});

const loginError = ref("")
const loadingBtn = ref(false)
const login = async () => {
  loadingBtn.value = true
  const res = await authStore().login({ ...form })
  if (res) {
    if (res.error) loginError.value = res.message
    loadingBtn.value = false
  }
}
</script>
