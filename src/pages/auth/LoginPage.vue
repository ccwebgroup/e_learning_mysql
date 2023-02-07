<template>
  <q-page padding>
    <div class="justify-center q-mt-xl">
      <q-card flat style="max-width: 320px" class="q-mx-auto">
        <q-card-section class="row justify-center">
          <q-avatar size="180px" >
          <img src="/icons/favicon-128x128.png" alt="app_logo">
          </q-avatar>
          <div class="text-h5 text-bold text-primary">Prof Ed Handy Quiz App</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="login" class="q-gutter-sm">
            <q-input v-model="form.email" placeholder="Email" outlined dense :rules="[(val) => !!val || 'Field is required!']" />
            <q-input v-model="form.password" placeholder="Password" type="password" outlined dense :rules="[(val) => !!val || 'Field is required!']" />
            <q-card-actions align="center" class="q-gutter-y-sm">
              <q-btn :loading="loadingBtn" label="Log In" type="submit" class="full-width" color="primary" />
              <q-btn to="/auth/register" label="Register" class="full-width" flat color="primary" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from "vue";
import { authStore } from "src/stores/auth";

const form = reactive({
  email: "",
  password: "",
});

const loadingBtn = ref(false)
const login = async () => {
  loadingBtn.value = true
  const res = await authStore().login({ ...form })
  if (res) loadingBtn.value = false
}
</script>
