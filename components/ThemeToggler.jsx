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
    <div className="relative inline-flex cursor-pointer items-center gap-4">
      <Image
        src={moonIcon}
        alt="dark mode"
        width={17}
        height={16}
        layout="intrinsic"
        className={`transition-all duration-200 ${
          theme === 'dark' ? 'opacity-100' : 'opacity-50'
        }`}
      />

      <label htmlFor="theme-toggle">
        <input
          type="checkbox"
          value={checked}
          checked={checked}
          onChange={handleCheckedChange}
          id="theme-toggle"
          className="peer sr-only"
        />
      </label>
      <div className="peer h-6 w-11 rounded-full bg-secondary-600 after:absolute after:top-[2px] after:left-[35px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-secondary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-primary dark:border-gray-600 dark:bg-secondary-600 " />

      <Image
        src={sunIcon}
        alt="light mode"
        width={17}
        height={16}
        layout="intrinsic"
        className={`transition-all duration-200 ${
          theme === 'light' ? 'opacity-100' : 'opacity-50'
        }`}
      />
    </div>
  );
}
