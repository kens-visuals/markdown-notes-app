import { useContext } from 'react';
import Image from 'next/image';

// Contexts
import { ThemeContext } from '../contexts/ThemeContext';

// Assets
import moonIcon from '../assets/icon-dark-mode.svg';
import sunIcon from '../assets/icon-light-mode.svg';

export default function ThemeToggler() {
  const { theme, setTheme, checked, setChecked } = useContext(ThemeContext);

  const handleCheckedChange = () => {
    if (theme === 'dark') {
      setTheme('light');
      setChecked(true);
    } else {
      setTheme('dark');
      setChecked(false);
    }
  };

  return (
    <label
      htmlFor="theme-toggle"
      className="relative inline-flex cursor-pointer items-center gap-4"
    >
      <Image
        src={moonIcon}
        alt="Markdown"
        width={17}
        height={16}
        layout="intrinsic"
      />

      <input
        type="checkbox"
        value={checked}
        checked={checked}
        onChange={handleCheckedChange}
        id="theme-toggle"
        className="peer sr-only"
      />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[35px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />

      <Image
        src={sunIcon}
        alt="Markdown"
        width={17}
        height={16}
        layout="intrinsic"
      />
    </label>
  );
}
