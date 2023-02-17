<template>
  <q-dialog ref="dialogRef">
    <q-card style="width: 600px;">
      <q-card-section class="text-h6">
        {{ exercise ? 'Edit' : 'Create' }} Exercise
      </q-card-section>
      <q-card-section class="q-py-none">
        <q-form @submit="exercise ? updateExercise() : saveExercise()" class="q-gutter-sm">
          <div>
            <q-item-label class="q-mb-xs text-subtitle2 text-primary">Exercise Type</q-item-label>
            <q-select v-model="form.type" :rules="[val => !!val || 'Fill instructions!']" dense outlined
              :options="['Quiz', 'Challenge']" style="max-width: 200px" />
          </div>
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
            <q-item-label class="q-mb-xs text-subtitle2 text-primary">{{ form.type == 'Quiz' ? 'Question' : 'Instruction'
            }}</q-item-label>
            <q-input v-model="form.instruction" type="textarea" autogrow :rules="[val => !!val || 'Fill instructions!']"
              dense />
          </div>
          <div v-if="form.type == 'Challenge'" class="q-pa-sm bg-amber-1 rounded-borders">
            <q-item-label class="q-mb-xs text-subtitle2 text-positive">Answer:</q-item-label>
            <div>{{ form.answer }}</div>
          </div>


          <!-- Choices Display -->
          <div v-if="form.type == 'Quiz'" class="q-px-md">
            <div v-for="item in form.choices" :key="item.index">
              <q-checkbox @change="form.answer == item.index" v-model="form.answer" :val="item.index" :label="item.text"
                :true-value="item.index" :false-value="!item.index" />
              <!-- <input type="checkbox" :checked="form.answer == item.index"><span>{{ item.text }}</span> -->
            </div>
          </div>

          <div v-if="form.type == 'Challenge'">
            <QueryCard :prequery="exercise.prequery ? exercise.prequery : null" @update="(val) => form.prequery = val"
              @capture-answer="(val) => form.answer = val" />
          </div>

          <div v-if="form.type == 'Quiz'">
            <q-item-label class="text-subtitle2 text-primary  q-mb-xs">Choices</q-item-label>
            <q-input v-model="choiceInput" type="textarea" autogrow dense outlined hide-bottom-space
              placeholder="Type description" />
            <q-btn :disable="!choiceInput" @click="addChoice(form.choices.length + 1)" label="Add choice" no-caps outline
              color="primary" class="full-width q-mt-xs" />
          </div>

          <q-card-actions align="right" class="q-pt-md">
            <q-btn :loading="isLoading" unelevated type="submit" :label="exercise ? 'Update' : 'Save Exercise'"
              color="primary" dense />
            <q-btn label="Cancel" flat dense v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
</q-dialog>
</template>

<script setup>
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { reactive, ref, onBeforeMount } from 'vue';
import { exerciseStore } from 'stores/exercises'
import QueryCard from 'src/components/QueryCard.vue';

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK } = useDialogPluginComponent()
const props = defineProps({ lesson: Object, exercise: Object })
const $q = useQuasar()

const choiceInput = ref('')
const form = reactive({
  type: "Quiz",
  no: null,
  instruction: "",
  prequery: "",
  answer: null,
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

const isLoading = ref(false)

async function saveExercise() {
  if (!form.answer) {
    $q.dialog({
      title: "Oops!",
      message: "Select or put an answer to the exercise before you submit it."
    })
    return
  }

  isLoading.value = true
  const res = await exerciseStore().addExercise(props.lesson.id, { ...form })
  if (res) {
    isLoading.value = false
    onDialogOK()
  }
}

async function updateExercise() {
  isLoading.value = true
  const res = await exerciseStore().updateExercise(props.lesson.id, props.exercise.id, { ...form })
  if (res) {
    isLoading.value = false
    onDialogOK()
  }
}

onBeforeMount(() => {
  if (props.exercise) {
    form.type = props.exercise.type ? props.exercise.type : 'Quiz'
    form.prequery = props.exercise.prequery ? props.exercise.prequery : ''
    form.no = props.exercise.no
    form.instruction = props.exercise.instruction
    form.answer = props.exercise.answer
    form.choices = props.exercise.choices ? props.exercise.choices : []
    form.points = props.exercise.points
  }
})
</script>
