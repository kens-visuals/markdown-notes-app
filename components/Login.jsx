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
          Sign in with Google
        </button>
      ) : (
        <button className="bg-green-500" onClick={signUserOut}>
          Sign out
        </button>
      )}
    </div>
  );
}
