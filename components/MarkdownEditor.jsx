import Image from 'next/image';

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
      <div className="flex w-full items-center justify-between bg-tertiary-200 p-3.5 dark:bg-primary-900">
        <span className="font-roboto text-sm uppercase tracking-widest text-secondary-500 dark:text-secondary-400">
          Markdown
        </span>

        <button type="button" onClick={() => setIsPreviewVisible(true)}>
          <Image
            src={prewviewIcon}
            alt="preview"
            width={16}
            height={12}
            layout="fixed"
          />
        </button>
      </div>
      <textarea
        id="markdown"
        className="min-h-screen w-full p-4 font-roboto-mono text-primary-700 focus-visible:outline focus-visible:outline-orange-secondary dark:bg-primary-1000 dark:text-secondary-400"
        value={content || currentMarkdown.content}
        onChange={(e) => setContent(e.target.value)}
      />
    </label>
  );
}
