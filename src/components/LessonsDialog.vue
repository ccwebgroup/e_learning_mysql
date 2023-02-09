<template>
  <q-dialog ref="dialogRef" maximized transition-show="slide-up" transition-hide="slide-down">
    <q-card class="q-px-md">
      <q-card-section>
        <q-form @submit="save" class="q-gutter-y-sm">
          <div>
            <q-item-label>Lesson Title</q-item-label>
            <q-input v-model="form.title" outlined dense autogrow :rules="[(val) => !!val || 'Title is required!']" />
          </div>
          <div>
            <q-item-label>Caption</q-item-label>
            <q-input v-model="form.caption" dense autogrow :rules="[(val) => !!val || 'Subtitle is required!']" />
          </div>
          <div class="q-pt-md">
            <q-item-label>Content</q-item-label>
            <QuillEditor v-model:content="form.content" ref="quillRef" placeholder="Write content here..."
              contentType="html" theme="snow" toolbar="full" :modules="modules" />
          </div>

          <q-card-actions align="right">
            <q-btn type="submit" unelevated color="primary" label="Submit" no-caps />
            <q-btn flat label="Cancel" v-close-popup no-caps />
          </q-card-actions>
        </q-form>
      </q-card-section>

    </q-card>
  </q-dialog>
</template>
<script setup>
import { useDialogPluginComponent } from 'quasar';
import { reactive } from 'vue';
import { lessonStore } from 'stores/lessons'

import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import BlotFormatter from 'quill-blot-formatter-mobile/dist/BlotFormatter';
import ImageCompress from "quill-image-compress";

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK } = useDialogPluginComponent()

const form = reactive({
  title: "",
  caption: "",
  content: "",
})

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

async function save() {
  const res = await lessonStore().addLesson({ ...form })
  if (res) {
    onDialogOK()
  }
}
</script>
