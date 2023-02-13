import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { Loading } from 'quasar'
import { db } from 'src/boot/firebase'

export const exerciseStore = defineStore('exercises', {
  state: () => ({
    exercises: [],
    exercise: null
  }),

  actions: {
    async addExercise(lessonId, data) {
      // parse in lesson no
      data.no = parseInt(data.no)
      data.points = parseInt(data.points)

      try {
        const lessonRef = doc(db, 'lessons', lessonId)
        const exercisesRef = collection(lessonRef, 'exercises')
        const snap = await addDoc(exercisesRef, { ...data, lessonId: lessonId, createdAt: serverTimestamp() })
        this.exercises.push({ ...data, id: snap.id, lessonId: lessonId, createdAt: Timestamp.now() })

        return true;
      } catch (error) {

      }
    },

    async getExercises(lessonId) {
      try {
        Loading.show()
        const lessonRef = doc(db, 'lessons', lessonId)
        const colRef = collection(lessonRef, 'exercises')
        const q = query(colRef, orderBy('no', 'asc'))

        const snap = await getDocs(q)
        snap.forEach(snapData => {
          const data = { ...snapData.data(), id: snapData.id }

          const i = this.exercises.findIndex(item => item.id == snapData.id)
          if (i == -1) this.exercises.push(data)
        })

        Loading.hide()
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
})