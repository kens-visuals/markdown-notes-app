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
  updateDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { db, auth, googleProvider } from './firebase-config';

// Initial Data
import DATA from '../data.json';

export const createUserDocFromAuth = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const usersCollectionRef = collection(db, 'users', userAuth.uid, 'markdowns');

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, uid } = userAuth;
    const createdAt = serverTimestamp();

    try {
      // Create user doc
      await setDoc(userDocRef, {
        email,
        id: uid,
        createdAt,
        displayName,
      });

      // Add the default markdown and an empty file from data.json
      DATA.map(async (el) => {
        await addDoc(usersCollectionRef, {
          title: el.title,
          content: el.content,
          createdAt,
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  // eslint-disable-next-line consistent-return
  return userDocRef;
};

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
  }
};

export const signUserOut = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getUserMarkdowns = (callback, uid) => {
  const usersCollectionRef = collection(db, 'users', `${uid}`, 'markdowns');

  const q = query(usersCollectionRef, orderBy('createdAt', 'desc'));

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

export const updateTitle = async (e, uid, id, title) => {
  e.preventDefault();

  try {
    const usersCollectionRef = collection(db, 'users', `${uid}`, 'markdowns');
    const markdownRef = doc(usersCollectionRef, id);
    const createdAt = serverTimestamp();

    await updateDoc(markdownRef, { title, createdAt });

    // FIXME: Change title without reloading page
    // window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const saveMarkdownChanges = async (uid, id, content) => {
  try {
    const usersCollectionRef = collection(db, 'users', `${uid}`, 'markdowns');
    const markdownRef = doc(usersCollectionRef, id);
    const createdAt = serverTimestamp();

    await updateDoc(markdownRef, { content, createdAt });

    // FIXME: Change title without reloading page
    // window.location.reload();
  } catch (error) {
    console.error(error);
  }
};
