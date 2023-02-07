import { defineStore } from "pinia";
import { auth } from "boot/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { userStore } from "./users";
import { Dialog, Loading } from "quasar";

export const authStore = defineStore("auth", {
  state: () => ({
    authUser: null,
  }),

  actions: {
    async register(data) {
      try {
        const credential = await createUserWithEmailAndPassword(auth, data.email, data.password)
        const user = credential.user

        await userStore().addUserToFirestore(user.uid, data)

        if (data.type == 'educator') this.router.replace('/educator')
        else this.router.replace('/student')
      } catch (err) {
        Dialog.create({
          title: "Sorry!",
          message: `${err.code} - ${err.message}`
        })
      } finally {
        return true;
      }
    },

    async login(data) {
      try {
        const cred = await signInWithEmailAndPassword(auth, data.email, data.password)
        if (cred.user) {
          const user = await userStore().fetchUser(cred.user.uid)
          if (user.type == 'educator') this.router.replace('/educator');
          else this.router.replace('/student')
        }
      } catch (err) {
        Dialog.create({
          title: "Sorry!",
          message: `${err.code} - ${err.message}`
        })
      } finally {
        return true;
      }

    },

    async logOut() {
      Loading.show()
      await signOut(auth)
      Loading.hide()
      this.router.replace('/auth')
    },

    handleAuthStatechange() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const data = await userStore().fetchUser(user.uid)
          this.authUser = Object.assign(user, data)
        }
        else this.authUser = null;
      })
    }
  },
});
