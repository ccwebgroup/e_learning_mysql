import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, Timestamp, updateDoc, where } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { Dialog, Loading } from 'quasar'
import { db } from 'src/boot/firebase'

export const lessonStore = defineStore('lessons', {
  state: () => ({
    lessons: [],
    lesson: null
  }),


  actions: {
    async addLesson(data, content) {
      // parse in lesson no
      data.no = parseInt(data.no)

      try {
        Loading.show()
        const colRef = collection(db, 'lessons')
        const snap = await addDoc(colRef, {
          ...data, createdAt: serverTimestamp()
        })

        const contentRef = doc(doc(db, 'lessons', snap.id), 'content', snap.id)
        await setDoc(contentRef, {
          body: content
        })

        this.lessons.push({ ...data, id: snap.id, createdAt: Timestamp.now() })
        Loading.hide()
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async updateLesson(id, data, content) {
      // parse in lesson no
      data.no = parseInt(data.no)

      try {
        Loading.show()
        const lessonRef = doc(db, 'lessons', id)
        await updateDoc(lessonRef, {
          ...data, updatedAt: serverTimestamp()
        })

        const contentRef = doc(lessonRef, 'content', id)
        await updateDoc(contentRef, {
          body: content
        })

        const i = this.lessons.findIndex(item => item.id == id)
        this.lessons[i] = { ...data, id: id, content: content }

        Loading.hide()
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteLesson(id) {
      Dialog.create({
        title: 'Please confirm!',
        message: 'Are you sure you want to delete the lesson?',
        cancel: true
      }).onOk(async () => {
        try {
          Loading.show()
          const lessonRef = doc(db, 'lessons', id)
          const lessonSnap = await deleteDoc(lessonRef)

          const i = this.lessons.findIndex(item => item.id == id)
          this.lessons.splice(i, 1)

          Loading.hide()
          return true;
        } catch (error) {
          console.log(error);
        }
      })
    },

    async getLesson(id) {
      try {
        const lessonRef = doc(db, 'lessons', id)
        const contentRef = doc(lessonRef, 'content', id)
        const lessonSnap = await getDoc(lessonRef)
        const contentSnap = await getDoc(contentRef)

        this.lesson = { ...lessonSnap.data(), id: lessonSnap.id, content: contentSnap.data().body }
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async getLessons() {
      try {
        Loading.show()
        const colRef = collection(db, 'lessons')
        const q = query(colRef, orderBy('no', 'asc'))

        const snap = await getDocs(q)
        snap.forEach(snapData => {
          const data = { ...snapData.data(), id: snapData.id }

          const i = this.lessons.findIndex(item => item.id == snapData.id)
          if (i == -1) this.lessons.push(data)
        })

        Loading.hide()
        return true;
      } catch (error) {
        console.log(error);
      }
    },

  }
})
