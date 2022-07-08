import { useContext, createContext, useState } from 'react';

export const DataContext = createContext({
  data: [],
  setData: () => null,
});

export function DataProvider({ children }) {
  const [data, setData] = useState(value);
  const value = { data, setData };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
