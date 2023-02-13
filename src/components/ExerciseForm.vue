<template>
  <div class="q-px-sm">
    <q-card flat>
      <q-card-section class="q-pb-none">SQL Statement</q-card-section>
      <q-card-section class="q-py-none">
        <q-input autofocus input-style="font-family: monospace; font-size: 17px" v-model="query" type="textarea"
          outlined />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Submit" @click="submitQuery" color="primary" dense />
        <q-btn label="Clear" flat dense v-close-popup />
      </q-card-actions>

      <q-card-section>
        <div>{{ qResult }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar';
import { ref, computed } from 'vue'
import initSqlJs from "sql.js"

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK } = useDialogPluginComponent()
const props = defineProps({ lesson: Object, exercise: Object })
const query = ref('')
const qResult = ref('')

function resetForm() {
  query.value = ''
}

function textTrimed(text) {
  console.log(text.trim());
}

const trimmedValue = computed(() => query.value.replace(/^\s+|\s+$/g, ''))


async function submitQuery() {
  try {
    const SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    })

    const db = new SQL.Database()
    const results = db.exec(query.value)
    qResult.value = results
    const correct_answer = props.exercise.answer.trim().toLowerCase()

    console.log(correct_answer);
    console.log(trimmedValue.value);
  } catch (error) {
    console.error(error)
    qResult.value = error
  }
}

</script>
