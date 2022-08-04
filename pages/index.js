import { useState } from 'react';
import Head from 'next/head';

// Components
import Sidebar from '../components/Sidebar';
import MainContainer from '../components/MainContainer';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>Markdown App</title>
        <meta
          name="description"
          content="Markdown editor built with NextJS and Firebase Firestore. Coded by Kens-Visuals"
        />
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

      <div className="flex overflow-auto selection:bg-orange-primary selection:text-white">
        {isSidebarOpen && <Sidebar />}

        <MainContainer
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    </div>
  );
}
