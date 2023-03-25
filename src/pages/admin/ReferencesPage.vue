<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>References</q-toolbar-title>
    </q-toolbar>

    <div class="row">
      <div class="col-12 col-md-5">
        <q-form ref="formRef" @reset="onReset" @submit="addReference">
          <div style="max-width: 350px;">
            <q-input v-model="form.name" dense outlined placeholder="Name" :rules="[(val) => !!val]"></q-input>
            <q-input v-model="form.url" dense outlined placeholder="Url"></q-input>
            <q-btn :loading="isLoading" type="submit" label="Add Reference" flat color="primary"
              class="full-width q-mt-md"></q-btn>
          </div>
        </q-form>
      </div>
      <div class="col-12 col-md-6">
        <q-item-label class="text-subtitle1">List</q-item-label>
        <q-list separator>
          <q-item v-for="item in references" :key="item.id">
            <q-item-section>
              <q-item-label class="text-subtitle1">{{ item.name }}</q-item-label>
              <q-item-label class="text-subtitle2">{{ item.url }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn @click="deleteRef(item)" icon="close" color="negative" size="12px" round flat dense />
            </q-item-section>
          </q-item>
          <q-item-label v-if="!references.length" class="text-subtitle1 text-center text-grey-7 q-mt-sm">No data
            available</q-item-label>
        </q-list>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { reactive, ref, computed, onBeforeMount } from 'vue';
import { referenceStore } from 'stores/references'
const form = reactive({
  name: "",
  url: ""
})

const references = computed(() => referenceStore().references)
onBeforeMount(() => referenceStore().getAll())

const formRef = ref(null)
const isLoading = ref(false)
function onReset() {
  form.name = ''
  form.url = ''
}

async function addReference() {
  isLoading.value = true
  await referenceStore().create(form)
  isLoading.value = false
  formRef.value.reset()
}

async function deleteRef(data) {
  await referenceStore().delete(data)
}
</script>
