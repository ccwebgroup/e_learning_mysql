<template>
  <q-dialog ref="dialogRef">
    <q-card style="width: 600px;">
      <q-card-section class="text-h6">
        Create Exercise
      </q-card-section>
      <q-card-section class="q-py-none">
        <q-form @submit="saveExercise" class="q-gutter-sm">
          <div class="flex q-gutter-x-sm">
            <q-input v-model="form.no" dense mask="#" fill-mask="0" reverse-fill-mask :rules="[
              val => (val !== null && val !== '' && parseInt(val) != NaN) || 'Please type a number',
              val => val > 0 || 'Please type a real number'
            ]" label="Exercise no." />

            <q-input v-model="form.points" dense mask="#" fill-mask="0" reverse-fill-mask :rules="[
              val => (val !== null && val !== '' && parseInt(val) != NaN) || 'Please type a number',
              val => val > 0 || 'Please type a real number'
            ]" label="Points" />
          </div>

          <div>
            <q-item-label class="q-mb-xs">Instruction</q-item-label>
            <q-input v-model="form.instruction" type="textarea" :rules="[val => !!val || 'Fill instructions!']" dense />
          </div>

          <div>
            <q-item-label class="text-positive q-mb-xs">Query Statement Answer</q-item-label>
            <q-input v-model="form.answer" type="textarea" :rules="[val => !!val || 'Fill the answer!']" dense
              outlined />
          </div>

          <q-card-actions align="right">
            <q-btn :loading="isLoading" unelevated type="submit" label="Submit" color="primary" dense />
            <q-btn label="Cancel" flat dense v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar';
import { reactive, ref } from 'vue';
import { exerciseStore } from 'stores/exercises'

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK } = useDialogPluginComponent()
const props = defineProps({ lesson: Object })

const form = reactive({
  no: null,
  instruction: "",
  answer: "",
  points: null,
})

const isLoading = ref(false)
async function saveExercise() {
  isLoading.value = true
  const res = await exerciseStore().addExercise(props.lesson.id, { ...form })
  if (res) {
    isLoading.value = false
    onDialogOK()
  }
}
</script>
