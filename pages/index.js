import { useState } from 'react';
import Head from 'next/head';

// Components
import Sidebar from '../components/Sidebar';
import MainContainer from '../components/MainContainer';

export default function Home() {
  const [currentMarkdown, setCurrentMarkdown] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log(currentMarkdown);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Markdown editor built with NEXTJS and Firebase"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex">
        {isSidebarOpen && (
          <Sidebar
            currentMarkdown={currentMarkdown}
            setCurrentMarkdown={setCurrentMarkdown}
          />
        )}

        <MainContainer
          isSidebarOpen={isSidebarOpen}
          currentMarkdown={currentMarkdown}
          setIsSidebarOpen={setIsSidebarOpen}
          setCurrentMarkdown={setCurrentMarkdown}
        />
      </div>
    </div>
  );
}
