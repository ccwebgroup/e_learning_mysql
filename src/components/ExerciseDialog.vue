<template>
  <div>
    <q-card>
      <q-card-section>
        <q-input input-style="font-family: monospace; font-size: 17px" v-model="query" label="SQL Query"
          type="textarea" />
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <q-btn label="Submit" @click="submitQuery" />
        <q-btn label="Cancel" v-close-popup />
      </q-card-actions>

      <q-card-section>
        <div>{{ qResult }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar';
import { ref } from 'vue'
import initSqlJs from "sql.js"

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK } = useDialogPluginComponent()
const props = defineProps({ lesson: Object })
const query = ref('')
const qResult = ref(null)

function resetForm() {
  query.value = ''
}

async function submitQuery() {
  try {
    const SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    })

    const db = new SQL.Database()
    db.exec(query.value)
    const results = db.exec(query.value)
    console.log(results)

    qResult.value = results
  } catch (error) {
    console.error(error)
    qResult.value = error
  }
}

</script>
