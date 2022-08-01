import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';

// Contexts
import { DataContext } from '../contexts/DataContext';

// Components
import Sidebar from '../components/Sidebar';
import MainContainer from '../components/MainContainer';

export default function Home() {
  const { data, currentMarkdownNum, setCurrentMarkdown } =
    useContext(DataContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => setCurrentMarkdown(data[currentMarkdownNum]), [data]);

  return (
    <div>
      <Head>
        <title>Markdown App</title>
        <meta
          name="description"
          content="Markdown editor built with NEXTJS and Firebase"
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
