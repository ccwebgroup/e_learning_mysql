<template>
  <q-page padding>
    <div class="justify-center q-mt-md">
      <q-card flat>
        <q-card-section>
          <div class="text-subtitle1">Create an account.</div>
        </q-card-section>
        <q-card-section>
          <q-stepper flat v-model="step" contracted ref="stepper" color="primary" animated>
            <q-step :name="1" title="Select user type" icon="settings" :done="step > 1" style="min-height: 300px">
              <!-- <q-radio v-model="userForm.type" val="educator" label="I am an educator" /> -->
              <q-radio v-model="userForm.type" val="student" label="I am a student" />
            </q-step>

            <q-step :error="error2" :name="2" title="Select user type" icon="settings" :done="step > 2"
              style="min-height: 300px">
              <div v-if="userForm.type == 'educator'" class="q-gutter-y-sm">
                <q-input v-model="educatorForm.position" dense outlined placeholder="Position"
                  :rules="[(val) => !!val || 'Required!']" />
                <div class="q-mt-md">
                  <q-item-label class="text-subtitle2 q-mb-sm">Academic Rank</q-item-label>
                  <q-select v-model="educatorForm.academicRank" :options="[
                    'Instructor',
                    'Assistant Professor',
                    'Associate Professor',
                    'Professor',
                  ]" behavior="menu" dense outlined :rules="[(val) => !!val || 'Required!']" />
                </div>
                <div class="q-mt-md">
                  <q-item-label class="text-subtitle2 q-mb-sm">Program</q-item-label>
                  <q-select v-model="educatorForm.program" :options="['BEED', 'BSED Math', 'BSED Science']"
                    behavior="menu" dense outlined :rules="[(val) => !!val || 'Required!']" />
                </div>
              </div>
              <div v-else class="q-gutter-y-sm">
                <div class="q-mt-md">
                  <q-item-label class="text-subtitle2 q-mb-sm">Program</q-item-label>
                  <q-select v-model="studentForm.program" :options="['BEED', 'BSED Math', 'BSED Science']"
                    behavior="menu" dense outlined :rules="[(val) => !!val || 'Required!']" />
                </div>

                <div class="q-mt-md">
                  <q-item-label class="text-subtitle2 q-mb-sm">Year</q-item-label>
                  <q-select v-model="studentForm.year" :options="[1, 2, 3, 4]" behavior="menu" dense outlined
                    :rules="[(val) => !!val || 'Required!']" />
                </div>

                <div class="q-mt-md">
                  <q-item-label class="text-subtitle2 q-mb-sm">Section</q-item-label>
                  <q-select v-model="studentForm.section" :options="['A', 'B', 'C', 'D', 'E']" behavior="menu" dense
                    outlined :rules="[(val) => !!val || 'Required!']" />
                </div>
              </div>
            </q-step>

            <q-step :error="error3" :name="3" title="Select user type" icon="settings" :done="step > 3"
              style="min-height: 300px">
              <div class="q-gutter-y-sm">
                <q-input v-model="userForm.firstname" filled placeholder="Full Name"
                  :rules="[(val) => !!val || 'Required!']" />
                <q-input v-model="userForm.lastname" filled placeholder="Full Name"
                  :rules="[(val) => !!val || 'Required!']" />
                <div class="q-mt-md q-gutter-y-sm">
                  <q-input v-model="userForm.email" dense outlined placeholder="Email"
                    :rules="[(val) => !!val || 'Required!']" />
                  <q-input v-model="userForm.password" dense outlined placeholder="Password"
                    :rules="[(val) => !!val || 'Required!']" />
                </div>
              </div>
            </q-step>

            <template v-slot:navigation>
              <q-stepper-navigation>
                <q-btn v-if="step == 3" :loading="loadingBtn" color="primary" label="Finish" @click="register" />
                <q-btn v-else @click="$refs.stepper.next()" color="primary" label="Continue" />
                <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back"
                  class="q-ml-sm" />
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from "vue";
import { authStore } from "stores/auth";
import { useQuasar } from 'quasar'
import { async } from "@firebase/util";

const userForm = reactive({
  type: "student",
  firstname: "",
  lastname: "",
  fullname: "",
  email: "",
  password: "",
})

const educatorForm = reactive({
  position: "",
  academicRank: "",
  program: ""
});

const studentForm = reactive({
  program: "",
  year: "",
  section: ""
});

const $q = useQuasar()

const step = ref(1);

const error2 = ref(false)
const error3 = ref(false)

const loadingBtn = ref(false)
const register = async () => {
  const notif = (field) => $q.notify({
    color: 'red-5',
    textColor: 'white',
    icon: 'warning',
    message: `${field} field is empty! Please fill the required details.`
  })

  if (userForm.firstname == '') {
    error3.value = true
    notif('First Name')
    return;
  }
  if (userForm.lastname == '') {
    error3.value = true
    notif('Last Name')
    return;
  }
  if (userForm.email == '') {
    error3.value = true
    notif('Email')
    return;
  }
  if (userForm.password == '') {
    error3.value = true
    notif()
    return;
  }

  if (userForm.type == 'student') {
    if (studentForm.program == '') {
      error2.value = true
      notif()
      return;
    }
    if (studentForm.year == '') {
      error2.value = true
      notif()
      return;
    }
    if (studentForm.section == '') {
      error2.value = true
      notif()
      return;
    }
    authStore().register({ ...userForm, ...studentForm });
  }

  if (userForm.type == 'educator') {
    if (educatorForm.position == '') {
      error2.value = true
      notif('Position')
      return;
    }
    if (educatorForm.academicRank == '') {
      error2.value = true
      notif('Academic rank')
      return;
    }
    if (educatorForm.program == '') {
      error2.value = true
      notif('Program')
      return;
    }

    loadingBtn.value = true
    userForm.fullname = `${userForm.firstname} ${userForm.lastname}`
    const res = await authStore().register({ ...userForm, ...educatorForm });
    if (res) loadingBtn.value = false
  }


};
</script>
