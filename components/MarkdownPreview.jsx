import { useContext } from 'react';

// Firebase utils
import { saveMarkdownChanges } from '../firebase/firebase-utils';

// Contexts
import { UserContext } from '../contexts/UserContext';
import { DataContext } from '../contexts/DataContext';

export default function MarkdownPreview({
  content,
  children,
  isPreviewVisible,
  setIsPreviewVisible,
}) {
  const { currentUser } = useContext(UserContext);
  const { currentMarkdown } = useContext(DataContext);

  return (
    <label
      htmlFor="preview"
      className="inline-block w-full md:flex md:flex-col md:items-center lg:items-center"
    >
      <div className="flex w-full items-center justify-between bg-tertiary-200 p-3.5 dark:bg-primary-900 md:px-3 lg:px-6">
        <span className="font-roboto text-sm uppercase tracking-widest text-secondary-500 dark:text-secondary-400">
          Preview
        </span>

        <button
          type="button"
          onClick={() => {
            setIsPreviewVisible(!isPreviewVisible);
            saveMarkdownChanges(currentUser.uid, currentMarkdown.id, content);
          }}
          className="flex h-2 items-center justify-center fill-secondary-500 p-1 lg:transition-all lg:duration-100 lg:hover:fill-orange-primary"
        >
          {isPreviewVisible ? (
            // Hide Preview Icon
            <svg
              width="16"
              height="15"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.38.027a.795.795 0 0 1 .769.206L14.815 12.9a.792.792 0 0 1 0 1.124.792.792 0 0 1-1.124 0L9.234 9.567a2.77 2.77 0 0 1-3.753-3.753L1.024 1.357a.795.795 0 0 1 .357-1.33Zm.998 3.832 1.156 1.116a10.846 10.846 0 0 0-1.773 2.153c.696 1.117 2.929 4.038 6.333 3.959a6.127 6.127 0 0 0 1.346-.198l1.25 1.25a7.505 7.505 0 0 1-2.556.53h-.198c-4.663 0-7.331-4.282-7.83-5.145a.792.792 0 0 1 0-.792A12.58 12.58 0 0 1 2.378 3.86Zm5.328-2.272c4.726-.143 7.52 4.267 8.028 5.145.15.24.163.542.031.792a12.58 12.58 0 0 1-2.304 2.874l-1.195-1.116a10.846 10.846 0 0 0 1.813-2.154c-.705-1.116-2.937-4.045-6.333-3.958a6.127 6.127 0 0 0-1.346.198L5.149 2.117a7.505 7.505 0 0 1 2.557-.53Zm-.974 5.486v.055c0 .656.532 1.188 1.188 1.188l.047-.008-1.235-1.235Z" />
            </svg>
          ) : (
            // Preview Icon
            <svg
              width="16"
              height="12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.784.003c4.782-.144 7.597 4.31 8.109 5.198a.8.8 0 0 1 0 .8c-.688 1.2-3.255 5.086-7.677 5.198h-.2c-4.71 0-7.405-4.326-7.909-5.198a.8.8 0 0 1 0-.8C.803 4.001 3.362.115 7.784.003Zm.38 1.6h-.3c-3.199.08-5.286 2.71-6.086 3.998C2.482 6.73 4.73 9.68 8.176 9.6c3.199-.08 5.262-2.711 6.086-3.999-.712-1.127-2.967-4.086-6.398-3.998ZM8 2.803A2.799 2.799 0 1 1 8 8.4a2.799 2.799 0 0 1 0-5.598Zm0 1.599A1.2 1.2 0 1 0 8 6.8a1.2 1.2 0 0 0 0-2.4Z" />
            </svg>
          )}
        </button>
      </div>

      <article
        id="preview"
        className="heading-5 heading-6 blockquote-bold orange-list-marker prose w-full p-4 prose-headings:font-roboto-slab prose-headings:text-primary-700 prose-lead:leading-4 prose-h1:text-heading-1 prose-h2:text-heading-2 prose-h2:font-light prose-h3:text-heading-3 prose-h4:text-heading-4 prose-p:font-roboto-slab prose-p:text-sm prose-p:font-normal prose-p:text-secondary-500 prose-blockquote:rounded prose-blockquote:border-orange-primary prose-blockquote:bg-tertiary-200 prose-blockquote:p-2 prose-blockquote:px-6 prose-blockquote:font-roboto-slab prose-blockquote:text-sm prose-blockquote:not-italic prose-code:text-primary-700 prose-pre:bg-tertiary-200 prose-ol:ml-4 prose-ol:text-sm prose-ol:font-normal prose-ol:text-secondary-500 prose-ul:ml-3 prose-ul:font-normal prose-ul:text-secondary-500 prose-table:rounded prose-table:bg-tertiary-200 prose-td:text-secondary-500 dark:prose-headings:text-white dark:prose-a:text-white dark:prose-blockquote:bg-primary-800  dark:prose-code:text-white dark:prose-pre:bg-primary-800 dark:prose-ol:text-secondary-400 dark:prose-ul:text-secondary-400 dark:prose-table:bg-primary-800 dark:prose-td:text-secondary-400 md:p-6 md:py-8"
      >
        {children}
      </article>
    </label>
  );
}
