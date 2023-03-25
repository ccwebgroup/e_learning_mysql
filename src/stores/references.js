import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, Timestamp } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { db } from 'src/boot/firebase'

export const referenceStore = defineStore('references', {
  state: () => ({
    references: []
  }),



  actions: {
    async create(data) {
      try {
        const docRef = collection(db, 'references')
        const snap = await addDoc(docRef, {
          ...data, createdAt: serverTimestamp()
        })

        this.references.unshift({ ...data, createdAt: Timestamp.now() })
      } catch (error) {
        console.log(error);
      }
    },

    async getAll() {
      try {
        this.references = []
        const docRef = collection(db, 'references')
        const snap = await getDocs(docRef)
        snap.forEach(doc => {
          const data = { ...doc.data(), id: doc.id }
          this.references.push(data)
        })
      } catch (error) {
        console.log(error);
      }
    },

    async delete(data) {
      try {
        const docRef = doc(db, 'references', data.id)
        await deleteDoc(docRef)

        const i = this.references.findIndex(item => item.id == data.id)
        this.references.splice(i, 1)
      } catch (error) {
        console.log(error);
      }
    }
  }
})
