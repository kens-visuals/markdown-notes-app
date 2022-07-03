import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggler() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    systemTheme === 'dark' ? setTheme('dark') : setTheme('light');
  }, [systemTheme]);

  if (!mounted) return null;

  return (
    <div>
      <button onClick={() => setTheme('light')}>Light Mode</button>{' '}
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  );
}
