import { auth, porvider, db } from '../firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, Timestamp, setDoc } from 'firebase/firestore';

export default function Login({ isAuth, setIsAuth }) {
  const createUserDocFromAuth = async (userAuth) => {
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

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, porvider);
      const userDocRef = await createUserDocFromAuth(user);

      console.log(userDocRef);

      localStorage.setItem('isAuth', true);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const signOutUserOut = async () => {
    try {
      await signOut(auth);
      setIsAuth(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      {!isAuth && (
        <button className="bg-red-500" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      )}
      {isAuth && (
        <button className="bg-green-500" onClick={signOutUserOut}>
          Sign out
        </button>
      )}
    </div>
  );
}
