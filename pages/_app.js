// Context Providers
import { ThemeProvider } from 'next-themes';
import { UserProvider } from '../contexts/UserContext';
import { DataProvider } from '../contexts/DataContext';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      enableSystem
      enableColorScheme
      defaultTheme="system"
      attribute="class"
    >
      <UserProvider>
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
