import { boot } from 'quasar/wrappers'
import { auth } from './firebase'
import { useAuth } from '@vueuse/firebase/useAuth'
import { getAuth, onAuthStateChanged } from 'firebase/auth'



export default boot(async ({ router }) => {
  const { isAuthenticated, user } = useAuth(auth)

  await new Promise((resolve) => {
    const stopObserver = onAuthStateChanged(getAuth(), async (firebaseUser) => {
      resolve(firebaseUser);
      stopObserver();
    });
  });

  router.beforeEach(async (to, from) => {
    let tokenResult = null;
    if (auth.currentUser)
      tokenResult = await auth.currentUser.getIdTokenResult();

    if (to.meta.requiresAuth && !isAuthenticated.value) {
      // return {
      //   path: '/auth'
      // }
    }

    if (to.name == "Login" && isAuthenticated.value) {
      return {
        path: from.path
      }
    }

    // if (to.meta.isAdmin && !tokenResult.claims.Admin) {
    //   // return {
    //   //   path: from.path,
    //   // };
    // }
  })
})
