import {
  doc,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  deleteDoc,
  ref,
  getDocs,
} from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { db, auth, googleProvider } from './firebase-config';

export const createUserDocFromAuth = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const usersCollectionRef = collection(db, 'users', userAuth.uid, 'markdowns');

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, uid } = userAuth;
    const createdAt = serverTimestamp();

    try {
      await setDoc(userDocRef, {
        email,
        id: uid,
        createdAt,
        displayName,
      });

      await addDoc(usersCollectionRef, {
        title: 'untitled.md',
        content: '',
        createdAt,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return userDocRef;
};

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const signUserOut = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getUserMarkdowns = (callback, uid) => {
  const usersCollectionRef = collection(db, 'users', `${uid}`, 'markdowns');

  const q = query(usersCollectionRef, orderBy('createdAt'));

  return onSnapshot(q, callback);
};

export const addNewMarkdown = async (uid) => {
  const usersCollectionRef = collection(db, 'users', `${uid}`, 'markdowns');
  const createdAt = serverTimestamp();

  try {
    await addDoc(usersCollectionRef, {
      title: 'untitled-markdown.md',
      content: '',
      createdAt,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteMarkdown = async (uid, id) => {
  try {
    const usersCollectionRef = collection(db, 'users', `${uid}`, 'markdowns');
    const markdownRef = doc(usersCollectionRef, id);

    await deleteDoc(markdownRef);
  } catch (error) {
    console.error(error);
  }
};

// FIXME:
// export const updateTitle = async (e, uid) => {
//   e.preventDefault();

//   const usersCollectionRef = collection(db, 'users', `${uid}`, 'markdowns');

//   try {
//     const userDoc = doc(db, 'posts', uid);
//     await updateDoc(userDoc, { title });
//   } catch (error) {
//     console.error(error);
//   }
// };
