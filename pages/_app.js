import { ThemeProvider } from 'next-themes';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      enableSystem={true}
      defaultTheme="system"
      enableColorScheme={true}
      attribute="class"
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
