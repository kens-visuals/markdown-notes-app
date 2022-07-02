import { auth, porvider } from '../firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';

export default function Login({ isAuth, setIsAuth }) {
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, porvider);

      localStorage.setItem('isAuth', true);
      setIsAuth(true);

      console.log(res);
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
