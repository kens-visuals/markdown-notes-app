import { useState } from 'react';

// Components
import Navbar from './Navbar';
import MarkdownContainer from './MarkdownContainer';

export default function MainContainer({ isSidebarOpen, setIsSidebarOpen }) {
  const [content, setContent] = useState('');

  return (
    <div className="w-full flex-shrink-0 bg-white dark:bg-primary-1000 md:flex-shrink">
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
