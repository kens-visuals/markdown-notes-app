import { createContext, useState, useEffect, useContext, useMemo } from 'react';

// Contexts
import { UserContext } from './UserContext';

// Firebase
import { getUserMarkdowns } from '../firebase/firebase-utils';

// Initial data
import DATA from '../data.json';

export const DataContext = createContext({
  data: [],
  setData: () => null,
  currentMarkdownNum: 0,
  setCurrentMarkdownNum: () => null,
  currentMarkdown: [],
  setCurrentMarkdown: () => null,
});

export function DataProvider({ children }) {
  const { currentUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [currentMarkdownNum, setCurrentMarkdownNum] = useState(0);
  const [currentMarkdown, setCurrentMarkdown] = useState([]);

  const value = useMemo(
    () => ({
      data,
      setData,
      currentMarkdownNum,
      setCurrentMarkdownNum,
      currentMarkdown,
      setCurrentMarkdown,
    }),
    [data, currentMarkdownNum, currentMarkdown]
  );

  useEffect(() => {
    if (currentUser) {
      const callback = (d) =>
        setData(d.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      const unsub = getUserMarkdowns(callback, currentUser?.uid);

      return () => unsub();
    }

    return setData(
      DATA.slice()
        .reverse()
        .map((doc) => ({ ...doc }))
    );
  }, [currentUser?.uid]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
