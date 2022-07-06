import { db, auth, googleProvider } from '../firebase/firebase-config';
import { createUserDocFromAuth } from '../firebase/firebase-utils';
import { signInWithPopup, signOut } from 'firebase/auth';

export default function Login({ isAuth, setIsAuth }) {
  const signInWithGoogle = async () => {
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
