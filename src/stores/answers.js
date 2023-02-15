import { arrayUnion, doc, increment, updateDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { auth, db } from 'src/boot/firebase'
import { authStore } from './auth'

export const answerStore = defineStore('answers', {
  state: () => ({
    counter: 0
  }),


  actions: {
    async submitAnswer(excerciseId, points) {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          exercises: arrayUnion(excerciseId),
          points: increment(points)
        })

        if (!authStore().authUser.exercises) authStore().authUser.exercises = []
        authStore().authUser.exercises.push(excerciseId)

        if (!authStore().authUser.points) authStore().authUser.points = 0
        authStore().authUser.points += points

        return true
      } catch (error) {
        console.log(error);
      }
    }
  }
})
