import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Markdown App</title>
        <meta
          name="description"
          content="Markdown editor built with NextJS and Firebase Firestore. Coded by Kens-Visuals"
        />
        <meta property="og:title" content="Markdown App" />
        <meta name="author" content="Kens-Visuals" />
        <meta
          property="og:url"
          content="https://markdown-notes-app-delta.vercel.app/"
        />
        <meta property="og:image" content="https://mugshotbot.com/m/P34RyMqb" />
        <meta property="twitter:card" content="summary_large_image" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
