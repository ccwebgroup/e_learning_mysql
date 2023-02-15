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
            <q-item-label class="q-mb-xs text-subtitle2 text-primary">Question</q-item-label>
            <q-input v-model="form.instruction" type="textarea" autogrow :rules="[val => !!val || 'Fill instructions!']"
              dense />
          </div>


          <!-- Choices Display -->
          <div class="q-px-md">
            <div v-for="item in form.choices" :key="item.index">
              <q-checkbox @change="form.answer == item.index" v-model="form.answer" :val="item.index" :label="item.text"
                :true-value="item.index" :false-value="!item.index" />
              <!-- <input type="checkbox" :checked="form.answer == item.index"><span>{{ item.text }}</span> -->
            </div>
          </div>

          <div>
            <q-item-label class="text-subtitle2 text-primary  q-mb-xs">Choices</q-item-label>
            <q-input v-model="choiceInput" type="textarea" autogrow dense outlined hide-bottom-space
              placeholder="Type description" />
            <q-btn :disable="!choiceInput" @click="addChoice(form.choices.length + 1)" label="Add choice" no-caps
              outline color="primary" class="full-width q-mt-xs" />
          </div>

          <q-card-actions align="right" class="q-pt-md">
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

const choiceInput = ref('')
const form = reactive({
  no: null,
  instruction: "",
  answer: 0,
  choices: [],
  points: null,
})

function addChoice(index) {
  form.choices.push({
    index: index,
    text: choiceInput.value,
  })

  choiceInput.value = ''
}

function setAnswer(e) {
  console.log("dsadasd");
}

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
