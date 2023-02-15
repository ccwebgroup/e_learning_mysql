<template>
  <q-dialog ref="dialogRef" maximized transition-show="slide-up" transition-hide="slide-down">
    <q-card class="q-px-md">
      <q-card-section>
        <q-form @submit="lesson ? update() : save()" class="q-gutter-y-sm">
          <div class="row q-gutter-x-sm">
            <div class="col-12 col-md-2">
              <q-item-label>Lesson No.</q-item-label>
              <q-input v-model="form.no" type="number" mask="#####" outlined dense autogrow
                :rules="[(val) => !!val || 'No. is required!']" />
            </div>
            <div class="col-12 col-md-10">
              <q-item-label>Lesson Title</q-item-label>
              <q-input v-model="form.title" outlined dense autogrow :rules="[(val) => !!val || 'Title is required!']" />
            </div>
          </div>
          <div>
            <q-item-label>Caption</q-item-label>
            <q-input v-model="form.caption" dense autogrow :rules="[(val) => !!val || 'Subtitle is required!']" />
          </div>
          <div class="q-pt-md">
            <q-item-label>Content</q-item-label>
            <QuillEditor v-model:content="content" ref="quillRef" placeholder="Write content here..." contentType="html"
              theme="snow" :toolbar="toolbar" :modules="modules" />
          </div>

          <q-card-actions align="right">
            <q-btn type="submit" unelevated color="primary" label="Submit" no-caps />
            <q-btn flat label="Cancel" v-close-popup no-caps />
          </q-card-actions>
        </q-form>
      </q-card-section>
      <q-separator spaced />
      <div class="text-h6">Preview</div>

      <div class="q-pa-sm">
        <div v-html="content"></div>
      </div>
    </q-card>
  </q-dialog>
</template>
<style lang="scss">
pre {
  background: rgb(34, 34, 34);
  color: white;
  border-radius: 5px;
  padding: 5px;
  border-left: 10px solid $amber-9;
}
</style>

<script setup>
import { useDialogPluginComponent } from 'quasar';
import { reactive, ref, onBeforeMount, computed, watch } from 'vue';
import { lessonStore } from 'stores/lessons'

import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
// import BlotFormatter from 'quill-blot-formatter-mobile/dist/BlotFormatter';
import BlotFormatter from 'quill-blot-formatter';
import ImageCompress from "quill-image-compress";


defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK } = useDialogPluginComponent()
const props = defineProps({ lesson: Object })

const form = reactive({
  no: null,
  title: "",
  caption: "",
})

const content = ref('')
const lessonData = computed(() => lessonStore().lesson)
onBeforeMount(async () => {
  if (props.lesson) {
    await lessonStore().getLesson(props.lesson.id)
  }
})

watch(lessonData, (newVal, oldVal) => {
  if (newVal) {
    form.no = newVal.no
    form.title = newVal.title
    form.caption = newVal.caption
    content.value = newVal.content
  }
})

async function save() {
  const res = await lessonStore().addLesson({ ...form }, content.value)
  if (res) {
    onDialogOK()
  }
}

async function update() {
  const res = await lessonStore().updateLesson(props.lesson.id, { ...form }, content.value)
  if (res) {
    onDialogOK()
  }
}

// Vue Quill Settings
const toolbar = [
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  [{ direction: "rtl" }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  ["blockquote", "code-block"],
  ["link", "image", "video"],
  ["clean"],
];
const modules = [
  {
    name: "blotFormatter",
    module: BlotFormatter,
    options: {
      /* options */
    },
  },
  {
    name: "imageCompress",
    module: ImageCompress,
    options: {
      imageType: "image/webp",
    },
  },
];
</script>
