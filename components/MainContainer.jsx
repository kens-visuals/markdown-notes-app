import { useState, useContext } from 'react';

// Components
import Navbar from './Navbar';
import MarkdownContainer from './MarkdownContainer';

// Contexts
import { DataContext } from '../contexts/DataContext';

export default function MainContainer({ isSidebarOpen, setIsSidebarOpen }) {
  const { data, currentMarkdownNum } = useContext(DataContext);

  const [content, setContent] = useState(
    '' || data[currentMarkdownNum]?.content
  );

  return (
    <div className="grid h-screen w-full grid-rows-[auto_1fr] overflow-hidden bg-white dark:bg-primary-1000">
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
