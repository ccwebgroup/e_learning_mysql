<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="q-py-sm">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-avatar size="50px">
          <img src="/icons/favicon-128x128.png">
        </q-avatar>
        <q-space />
        <div v-if="!authUser"><q-btn to="/auth/login" flat label="Log In" /></div>
        <div v-else><span class="q-mr-md text-subtitle1">Hi, {{ authUser.firstname }}</span></div>

        <q-avatar color="amber-6" v-if="authUser">
          <q-icon name="person" color="primary" class="cursor-pointer" @click="toggleRightDrawer" />
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer dark v-model="leftDrawerOpen" show-if-above bordered>
      <q-list dark>
        <q-item-label class="text-subtitle1" header>
          Essential Lessons
        </q-item-label>

        <template v-if="authUser && authUser.type && authUser.type == 'admin'">
          <EssentialLink v-bind="{
            title: 'Admin Panel',
            icon: 'las la-user-shield',
            link: '/admin'
          }" />

          <q-separator dark spaced />
        </template>


        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" class="q-my-md" />
        <LessonsListVue />
      </q-list>
      <q-item-label class="text-subtitle1" header>
        References
      </q-item-label>
      <q-list separator>
        <q-item v-for="item in references" :key="item.id" :href="item.url" target="_blank">
          <q-item-section>
            <q-item-label class="text-subtitle1">{{ item.name }}</q-item-label>
            <q-item-label class="text-subtitle2">{{ item.url }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item-label v-if="!references.length" class="text-subtitle1 text-center text-grey-7 q-mt-sm">No data
          available</q-item-label>
      </q-list>
    </q-drawer>

    <!-- RIght Drawer -->
    <q-drawer v-if="authUser" show-if-above v-model="rightDrawerOpen" side="right" bordered :width="220">
      <div>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <q-icon size="30px" name="las la-user" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle1 text-medium text-primary">{{ authUser.fullname }}</q-item-label>
            <q-item-label v-if="authUser.type === 'admin'"
              class="text-caption text-medium text-primary text-capitalize">{{ authUser.type
              }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <div v-if="authUser.type !== 'admin'">

          <q-item-label header class="text-subtitle1">Progress</q-item-label>
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon name="las la-medal" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle2 text-medium text-primary">{{
                  checkLevel(authUser.points)
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <!-- <q-item>
                                                                                                  <q-item-section avatar>
                                                                                                    <q-icon name="las la-trophy" />
                                                                                                  </q-item-section>
                                                                                                  <q-item-section>
                                                                                                    <q-item-label class="text-primary text-subtitle1">{{Beginner}}</q-item-label>
                                                                                                  </q-item-section>
                                                                                                </q-item> -->
            <q-item>
              <q-item-section avatar>
                <q-icon name="las la-award" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Scores</q-item-label>
                <q-item-label class="text-subtitle2 text-positive q-ml-md">
                  <span v-if="authUser.points">{{ `+${authUser.points}` }}</span>
                  <span v-else>0</span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <div class="q-pa-md" style="margin-top: 60px;">
          <q-btn @click="logout" color="negative" rounded dense label="Log Out" class="full-width" />
        </div>
      </div>
    </q-drawer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import LessonsListVue from 'src/components/LessonsList.vue';
import { authStore } from 'src/stores/auth';
import { lessonStore } from 'src/stores/lessons';
import { referenceStore } from 'src/stores/references';



const linksList = [
  {
    title: 'Home Page',
    // caption: 'quasar.dev',
    icon: 'las la-home',
    link: '/'
  },
]

const references = computed(() => referenceStore().references)

onBeforeMount(() => {
  lessonStore().getLessons()
  referenceStore().getAll()
})

const leftDrawerOpen = ref(false)
const authUser = computed(() => authStore().authUser)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const rightDrawerOpen = ref(false)
function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

function logout() {
  authStore().logOut();
}

function checkLevel(points) {
  let level = 'Beginner'
  if (points > 500) level = 'Intermediate';
  if (points > 1000) level = 'Advance';
  if (points > 2000) level = 'Expert';

  return level;
}

</script>
