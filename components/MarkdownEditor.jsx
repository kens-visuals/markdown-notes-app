import { useContext, useEffect } from 'react';

// ScrollSync Lib
import { ScrollSyncPane } from 'react-scroll-sync';

// Firebase utils
import { saveMarkdownChanges } from '../firebase/firebase-utils';

// Contexts
import { DataContext } from '../contexts/DataContext';
import { UserContext } from '../contexts/UserContext';

export default function MarkdownEditor({
  content,
  setContent,
  isPreviewVisible,
  setIsPreviewVisible,
}) {
  const { currentUser } = useContext(UserContext);
  const { data, currentMarkdownNum, currentMarkdown, setCurrentMarkdownNum } =
    useContext(DataContext);

  // When user chooses a different markdown, update the content and force the textarea to reset
  useEffect(() => {
    setContent(data[currentMarkdownNum]?.content);
  }, [currentMarkdownNum, currentUser]);

  // When user changes the content and click on preview, save the changes
  useEffect(() => {
    if (currentUser && content !== currentMarkdown.content) {
      setCurrentMarkdownNum(0);
      setContent(data[currentMarkdownNum]?.content);
      saveMarkdownChanges(currentUser?.uid, currentMarkdown.id, content);
    }
  }, [isPreviewVisible]);

  return (
    <div className="inline-block h-full w-full overflow-hidden">
      <div className="flex h-max w-full items-center justify-between bg-tertiary-200 p-3.5 dark:bg-primary-900 md:static md:px-5">
        <span className="font-roboto text-sm uppercase tracking-widest text-secondary-500 dark:text-secondary-400">
          Markdown
        </span>

        <button
          type="button"
          onClick={() => setIsPreviewVisible(true)}
          className="flex h-2 items-center justify-center fill-secondary-500 p-1 md:hidden lg:transition-all lg:duration-100 lg:hover:fill-orange-primary"
          aria-label="Preview"
        >
          {/* Preview Icon */}
          <svg
            width="16"
            height="12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.784.003c4.782-.144 7.597 4.31 8.109 5.198a.8.8 0 0 1 0 .8c-.688 1.2-3.255 5.086-7.677 5.198h-.2c-4.71 0-7.405-4.326-7.909-5.198a.8.8 0 0 1 0-.8C.803 4.001 3.362.115 7.784.003Zm.38 1.6h-.3c-3.199.08-5.286 2.71-6.086 3.998C2.482 6.73 4.73 9.68 8.176 9.6c3.199-.08 5.262-2.711 6.086-3.999-.712-1.127-2.967-4.086-6.398-3.998ZM8 2.803A2.799 2.799 0 1 1 8 8.4a2.799 2.799 0 0 1 0-5.598Zm0 1.599A1.2 1.2 0 1 0 8 6.8a1.2 1.2 0 0 0 0-2.4Z" />
          </svg>
        </button>
      </div>

      <ScrollSyncPane>
        <textarea
          className="h-full w-full resize-none p-4 pb-32 font-roboto-mono text-primary-700 focus-visible:outline focus-visible:outline-orange-secondary dark:bg-primary-1000 dark:text-secondary-400 md:p-6 md:pb-60"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </ScrollSyncPane>
    </div>
  );
}
