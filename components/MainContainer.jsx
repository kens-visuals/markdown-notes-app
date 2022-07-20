import { useState } from 'react';

// Components
import Navbar from './Navbar';
import Markdown from './Markdown';

export default function MainContainer({
  isSidebarOpen,
  currentMarkdown,
  setIsSidebarOpen,
  setCurrentMarkdown,
}) {
  const [content, setContent] = useState('');

  console.log('MainContainer rendered');

  return (
    <div className="min-h-screen w-full flex-shrink-0 bg-white  dark:bg-primary-1000">
      <Navbar
        content={content}
        isSidebarOpen={isSidebarOpen}
        currentMarkdown={currentMarkdown}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className="w-full ">
        <Markdown
          content={content}
          setContent={setContent}
          currentMarkdown={currentMarkdown}
          setCurrentMarkdown={setCurrentMarkdown}
        />
      </main>
    </div>
  );
}
