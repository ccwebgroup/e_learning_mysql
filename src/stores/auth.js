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
        const credential = await createUserWithEmailAndPassword(auth, data.email + '@gmail.com', data.password)
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
        const cred = await signInWithEmailAndPassword(auth, data.email + '@gmail.com', data.password)
        if (cred.user) {
          const user = await userStore().fetchUser(cred.user.uid)
          this.router.replace('/');
        }

        return true;
      } catch (err) {
        console.log(err.code);
        const errCode = err.code;
        let errMessage;

        switch (errCode) {
          case "auth/invalid-email":
            errMessage = "Email is invalid";
            break;
          case "auth/user-not-found":
            errMessage = "User is not registered.";
            break;
          case "auth/wrong-password":
            errMessage = "Wrong password.";
            break;
        }

        return { error: true, message: errMessage }
      }

    },

    async logOut() {
      Loading.show()
      await signOut(auth)
      Loading.hide()
      this.router.replace('/auth')
    },

    handleAuthState() {
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
