import { useState } from 'react';

// Components
import Navbar from './Navbar';
import MarkdownContainer from './MarkdownContainer';

export default function MainContainer({ isSidebarOpen, setIsSidebarOpen }) {
  const [content, setContent] = useState('');

  return (
    // NOTE: This is the old way of doing it the main container.
    // <div className="w-full flex-shrink-0 bg-white dark:bg-primary-1000 md:flex-shrink">
    <div className="grid h-screen w-full grid-rows-[auto_1fr] overflow-y-scroll bg-white dark:bg-primary-1000 ">
      <Navbar
        content={content}
        setContent={setContent}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <MarkdownContainer content={content} setContent={setContent} />
    </div>
  );
}
