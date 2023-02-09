import { doc, getDoc, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { db, functions } from 'src/boot/firebase'
import { Loading, Dialog } from 'quasar'
import { httpsCallable } from "firebase/functions";

export const userStore = defineStore('users', {
  state: () => ({
    users: []
  }),

  actions: {
    async addUserToFirestore(uid, data) {
      const docRef = doc(db, 'users', uid)
      const docSnap = await setDoc(docRef, {
        ...data
      })

      return true;
    },

    async fetchUser(uid) {
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { ...docSnap.data() }
      }
    },

    async addUser(payload) {
      try {
        Loading.show();
        const addUser = httpsCallable(functions, "addUser");
        const result = await addUser(payload);

        let userData = result.data;
        userData = Object.assign(userData, payload);
        this.users.unshift(userData);
        Loading.hide();

        return true
      } catch (error) {

      }
    },

    async getAllUsers() {
      try {
        Loading.show();
        this.users = [];
        const getAllUsers = httpsCallable(functions, "getAllUsers");
        const result = await getAllUsers();
        result.data.forEach(async (user) => {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            user = Object.assign(user, userData);
          }
          this.users.push(user);
        });

        Loading.hide();
      } catch (error) {
        console.log(error);
      }
    },

    async updateUser(payload) {
      try {
        Loading.show();
        const updateUser = httpsCallable(functions, "updateUser");
        const result = await updateUser(payload);

        const userData = result.data;
        const i = this.users.findIndex((user) => user.uid == userData.uid);
        this.users[i] = payload;
        Loading.hide();

        return true;
      } catch (error) {

      }
    },

    deleteUser(user) {
      Dialog.create({
        title: "Confirm",
        message: `<div class="text-center">Are you sure you want to <span class="text-red text-bold">DELETE</span> permanently <div class="text-primary text-bold">${user.displayName}?</div></div>`,
        html: true,
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        Loading.show();
        const deleteUser = httpsCallable(functions, "deleteUser");
        await deleteUser({ uid: user.uid });
        this.users = this.users.filter((item) => item.uid !== user.uid);
        Loading.hide();
      });
    },

  }
})
