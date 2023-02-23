<template>
  <div class="q-px-sm">
    <div class="text-right q-gutter-x-sm q-pb-xs">
      <q-btn icon="las la-play" label="Run" dense flat @click="submitQuery" color="primary" />
      <q-btn label="Clear" @click="query = ''" flat dense />
    </div>
    <div class="q-py-none">
      <q-input @update:model-value="(val) => $emit('update', val)" autofocus input-style="font-family: monospace;"
        v-model="query" autogrow outlined placeholder="Write sql statement here..." />
    </div>

    <div v-if="qResult" class="q-pa-sm rounded-borders bg-amber-1 q-mt-sm">
      <q-item-label class="text-primary">Result:</q-item-label>
      <q-markup-table dense>
        <thead>
          <tr v-if="qResult[0].columns">
            <th v-for="(col, i) in qResult[0].columns" :key="i" class="text-left">{{ col }}</th>
          </tr>
        </thead>
        <tbody v-if="qResult[0].values">
          <tr v-for="(val, i) in qResult[0].values" :key="i" class="text-left">
            <td v-for="(item, i) in val" :key="i" class="text-left">{{ item }}</td>
          </tr>
        </tbody>
      </q-markup-table>
      <div class="q-mt-sm text-primary">Json Result:</div>
      <div> {{ qResult }}</div>
      <div class="q-mt-sm text-center">
        <q-btn @click="$emit('captureAnswer', qResult)" label="Capture Answer" rounded unelevated no-caps
          padding="2px 20px" color="positive" />
      </div>
    </div>
    <div v-if="qError" class="q-pa-sm rounded-borders bg-amber-1 q-mt-sm text-negative">
      <div>{{ qError }}</div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import initSqlJs from "sql.js"

defineEmits([
  'captureAnswer', 'update'
])

const props = defineProps({ prequery: String })

const query = ref('')
const qResult = ref(null)
const qError = ref(null)

onMounted(() => {
  if (props.prequery) {
    query.value = props.prequery
  }
})

async function submitQuery() {
  qResult.value = null
  qError.value = null

  try {
    const SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    })

    const db = new SQL.Database()
    const results = db.exec(query.value)
    qResult.value = results

  } catch (error) {
    console.error(error)
    qError.value = error
  }
}

</script>
