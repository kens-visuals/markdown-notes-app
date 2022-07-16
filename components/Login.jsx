import { useContext } from 'react';

// Context
import { UserContext } from '../contexts/UserContext';

// Firebase
import { signInWithGoogle, signUserOut } from '../firebase/firebase-utils';

export default function Login() {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      {!currentUser ? (
        <button className="bg-red-500" onClick={signInWithGoogle}>
          Log in with Google
        </button>
      ) : (
        <button className="bg-green-500" onClick={signUserOut}>
          Log out
        </button>
      )}
    </div>
  );
}
