import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, Timestamp } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { Loading } from 'quasar'
import { db } from 'src/boot/firebase'

export const lessonStore = defineStore('lessons', {
  state: () => ({
    lessons: [],
    lesson: null
  }),


  actions: {
    async addLesson(data) {
      try {
        Loading.show()
        const colRef = collection(db, 'lessons')
        const snap = await addDoc(colRef, {
          ...data, createdAt: serverTimestamp()
        })

        this.lessons.unshift({ ...data, id: snap.id, createdAt: Timestamp.now() })
        Loading.hide()
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async getLesson(id) {
      try {
        const lessonRef = doc(db, 'lessons', id)
        const snap = await getDoc(lessonRef)
        this.lesson = { ...snap.data(), id: snap.id }
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async getLessons() {
      try {
        Loading.show()
        const colRef = collection(db, 'lessons')
        const snap = await getDocs(colRef)
        snap.forEach(snapData => {
          const data = { ...snapData.data(), id: snapData.id }
          this.lessons.unshift(data)
        })

        Loading.hide()
        return true;
      } catch (error) {
        console.log(error);
      }
    },

  }
})
