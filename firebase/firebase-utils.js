import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { db, auth, googleProvider } from './firebase-config';

export const createUserDocFromAuth = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = Timestamp.fromDate(new Date());

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
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
