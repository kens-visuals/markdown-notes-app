// Context Providers
import { ThemeProvider } from 'next-themes';
import { UserProvider } from '../contexts/UserContext';
import { DataProvider } from '../contexts/DataContext';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      enableSystem={true}
      defaultTheme="system"
      enableColorScheme={true}
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
