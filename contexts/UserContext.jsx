import { createContext, useState, useEffect } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocFromAuth,
} from '../firebase/firebase-utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      // when a new user signs in call createUserDocFromAuth(),
      // otherwise get the current user from firestore and set it to currentUser
      if (user) createUserDocFromAuth(user);

      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
