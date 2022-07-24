import Image from 'next/image';

// ScrollSync Lib
import { ScrollSyncPane } from 'react-scroll-sync';

// Assets
import prewviewIcon from '../assets/icon-show-preview.svg';

export default function MarkdownEditor({
  content,
  setContent,
  currentMarkdown,
  setIsPreviewVisible,
}) {
  return (
    <label htmlFor="markdown">
      <div className="relative flex w-full items-center justify-between bg-tertiary-200 p-3.5 dark:bg-primary-900 md:px-5">
        <span className="sticky font-roboto text-sm uppercase tracking-widest text-secondary-500 dark:text-secondary-400">
          Markdown
        </span>

        <button
          type="button"
          onClick={() => setIsPreviewVisible(true)}
          className="flex h-2 items-center justify-center md:hidden"
        >
          <Image
            src={prewviewIcon}
            alt="preview"
            width={16}
            height={12}
            layout="fixed"
          />
        </button>
      </div>

      <ScrollSyncPane>
        <textarea
          id="markdown"
          style={{ height: 1000 }}
          className="h-full w-full resize-none p-4 font-roboto-mono text-primary-700 focus-visible:outline focus-visible:outline-orange-secondary dark:bg-primary-1000 dark:text-secondary-400  md:p-5"
          value={content || currentMarkdown.content}
          onChange={(e) => setContent(e.target.value)}
        />
      </ScrollSyncPane>

      {/* DEL */}
      {/* <textarea
        id="markdown"
        className="h-full w-full resize-none p-4 font-roboto-mono text-primary-700 focus-visible:outline focus-visible:outline-orange-secondary dark:bg-primary-1000 dark:text-secondary-400  md:p-5"
        value={content || currentMarkdown.content}
        onChange={(e) => setContent(e.target.value)}
      /> */}
    </label>
  );
}
