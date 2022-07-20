import { createContext, useState, useEffect, useContext, useMemo } from 'react';

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

  const value = useMemo(() => ({ data, setData }), [data]);

  useEffect(() => {
    if (currentUser) {
      const callback = (d) =>
        setData(d.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      const unsub = getUserMarkdowns(callback, currentUser?.uid);

      return () => unsub();
    }

    return setData(DATA.map((doc) => ({ ...doc })));
  }, [currentUser?.uid]);

  console.log(data);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
