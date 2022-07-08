import { ThemeProvider } from 'next-themes';
import { UserProvider } from '../contexts/UserContext';

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
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
