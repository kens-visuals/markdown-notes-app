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
          content="Markdown editor built with NextJS and Firebase"
        />
        <link rel="icon" href="/favicon.ico" />
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
