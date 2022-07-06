import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase-config';

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
    const { user } = await signInWithPopup(auth, googleProvider);
    const userDocRef = await createUserDocFromAuth(user);

    console.log(userDocRef);

    localStorage.setItem('isAuth', true);
    setIsAuth(true);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
