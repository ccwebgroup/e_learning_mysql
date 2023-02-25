import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { Dialog, Loading } from 'quasar'
import { db } from 'src/boot/firebase'

export const exerciseStore = defineStore('exercises', {
  state: () => ({
    exercises: [],
    exercise: null
  }),

  getters: {
    shuffledExcercises: (state) => {
      let shuffled = state.exercises
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

      return shuffled
    }
  },

  actions: {
    async addExercise(lessonId, data) {
      // parse in lesson no
      data.no = parseInt(data.no)
      data.points = parseInt(data.points)
      if (data.type == 'Challenge') {
        data.answer = JSON.stringify(data.answer)
      }

      try {
        const lessonRef = doc(db, 'lessons', lessonId)
        const exercisesRef = collection(lessonRef, 'exercises')
        const snap = await addDoc(exercisesRef, { ...data, lessonId: lessonId, createdAt: serverTimestamp() })
        this.exercises.push({ ...data, id: snap.id, lessonId: lessonId, createdAt: Timestamp.now() })

        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async updateExercise(lessonId, exerciseId, data) {
      // parse in lesson no
      data.no = parseInt(data.no)
      data.points = parseInt(data.points)

      try {
        const lessonRef = doc(db, 'lessons', lessonId)
        const exerciseRef = doc(lessonRef, 'exercises', exerciseId)
        await updateDoc(exerciseRef, { ...data, updatedAt: serverTimestamp() })

        const i = this.exercises.findIndex(item => item.id == exerciseId)
        this.exercises[i] = { ...data, id: exerciseId, lessonId: lessonId, updatedAt: Timestamp.now() }

        return true;
      } catch (error) {

      }
    },

    async getExercises(lessonId) {
      this.exercises = []
      try {
        const lessonRef = doc(db, 'lessons', lessonId)
        const colRef = collection(lessonRef, 'exercises')
        const q = query(colRef, orderBy('no', 'asc'))

        const snap = await getDocs(q)
        snap.forEach(snapData => {
          const data = { ...snapData.data(), id: snapData.id }

          const i = this.exercises.findIndex(item => item.id == snapData.id)
          if (i == -1) this.exercises.push(data)
        })

        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteExercise(lessonId, exerciseId) {
      Dialog.create({
        title: 'Please confirm!',
        message: 'Are you sure you want to delete the exercise?',
        cancel: true
      }).onOk(async () => {
        try {
          Loading.show()
          const lessonRef = doc(db, 'lessons', lessonId)
          const exerciseRef = doc(lessonRef, 'exercises', exerciseId)
          await deleteDoc(exerciseRef)

          const i = this.exercises.findIndex(item => item.id == exerciseId)
          this.exercises.splice(i, 1)

          Loading.hide()
          return true;
        } catch (error) {
          console.log(error);
        }
      })
    },
  }
})
