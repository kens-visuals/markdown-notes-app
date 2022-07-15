import { createContext, useState, useEffect, useContext } from 'react';

import { UserContext } from './UserContext';

// Firebase
import { getUserMarkdowns } from '../firebase/firebase-utils';

import DATA from '../data.json';

export const DataContext = createContext({
  data: [],
  setData: () => null,
});

export function DataProvider({ children }) {
  const { currentUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const value = { data, setData };

  useEffect(() => {
    const callback = (data) =>
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    const unsub = getUserMarkdowns(callback, currentUser?.uid);

    return () => unsub();
  }, [currentUser?.uid]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
