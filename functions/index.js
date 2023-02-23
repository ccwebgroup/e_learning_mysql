const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const auth = admin.auth();


exports.addUser = functions.https.onCall(async (data, context) => {
  try {
    const userData = await auth.createUser({
      email: data.email,
      displayName: data.fullname,
      password: data.password
    });

    await admin.firestore().collection("users").doc(userData.uid).set(data);
    await auth.setCustomUserClaims(userData.uid, { [data.type]: true });
    userData.type = data.type;
    return userData;
  } catch (err) {
    throw new functions.https.HttpsError(err.code, err.message);
  }
});

exports.getAllUsers = functions.https.onCall(async (data, context) => {
  let usersData = [];
  const listAllUsers = async (nextPageToken) => {
    try {
      const listResult = await auth.listUsers(1000, nextPageToken);
      listResult.users.forEach((userRecord) => {
        usersData.push(userRecord.toJSON());
      });
      if (listResult.pageToken) {
        // List next batch of users.
        listAllUsers(listResult.pageToken);
      }
      return usersData;
    } catch (err) {
      throw new functions.https.HttpsError(err.code, err.message);
    }
  };
  return listAllUsers();
});

exports.updateUser = functions.https.onCall(async (data, context) => {
  const user = {
    email: data.email,
    displayName: data.fullname,
  };

  if (data.password) {
    user.password = data.password;
  }
  if (data.type) {
    user.type = data.type;
  }

  try {
    const userData = await auth.updateUser(data.uid, user);
    if (data.type) {
      await auth.setCustomUserClaims(data.uid, { [data.type]: true });
    }
    const doc = admin.firestore().collection("users").doc(data.uid);
    await doc.update({
      type: data.type,
      fullname: data.fullname,
      email: data.email,
    });

    return userData;
  } catch (err) {
    throw new functions.https.HttpsError(err.code, err.message);
  }
});

exports.deleteUser = functions.https.onCall(async (data, context) => {
  try {
    await auth.deleteUser(data.uid);
    return { message: `User deleted!` };
  } catch (err) {
    throw new functions.https.HttpsError(err.code, err.message);
  }
});

exports.setUserType = functions.https.onCall(async (data, context) => {
  await auth.setCustomUserClaims(data.uid, { [data.type]: true });
  const doc = admin.firestore().collection("users").doc(data.uid);
  await doc.update({ type: data.type });
  return {
    result: `User with ID: ${data.uid} has now a role of ${data.type}.`,
  };
});

exports.deleteUserFirestore = functions.auth.user().onDelete(async (user) => {
  try {
    await admin.firestore().collection("users").doc(user.uid).delete();
  } catch (error) {

  }
});

exports.setTypeOnSignUp = functions.firestore.document('users/{docId}')
  .onCreate(async (snap, context) => {
    const user = snap.data();
    await auth.setCustomUserClaims(snap.id, { [user.type]: true });
  });
