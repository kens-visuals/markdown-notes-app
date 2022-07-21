// Context Providers
import { ThemeProvider } from 'next-themes';
import { UserProvider } from '../contexts/UserContext';
import { DataProvider } from '../contexts/DataContext';
import { ThemeToggleProvider } from '../contexts/ThemeContext';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      enableSystem
      enableColorScheme
      defaultTheme="system"
      attribute="class"
    >
      <ThemeToggleProvider>
        <UserProvider>
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </UserProvider>
      </ThemeToggleProvider>
    </ThemeProvider>
  );
}

export default MyApp;
