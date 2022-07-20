import { useState, useEffect, createContext, useMemo } from 'react';
import { useTheme } from 'next-themes';

export const ThemeContext = createContext({
  theme: null,
  setTheme: () => null,
});

export function ThemeToggleProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState(false);
  const { systemTheme, setTheme, theme } = useTheme();

  const value = useMemo(
    () => ({ theme, setTheme, checked, setChecked }),
    [theme]
  );

  useEffect(() => {
    setMounted(true);

    if (systemTheme === 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [systemTheme]);

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
