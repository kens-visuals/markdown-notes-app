import { useContext } from 'react';
import Image from 'next/image';

// Contexts
import { DataContext } from '../contexts/DataContext';

// Utils
import formatDate from '../utils/formatDate';

// Assets
import fileIcon from '../assets/icon-document.svg';

export default function MarkdownListItem({
  currentMarkdown,
  setCurrentMarkdown,
}) {
  const { data } = useContext(DataContext);

  return data.map((markdown, idx) => (
    <li key={markdown.id}>
      <button
        type="button"
        onClick={() => setCurrentMarkdown(data[idx])}
        className="flex gap-4 text-left"
      >
        <div className="flex items-center">
          <Image
            src={fileIcon}
            alt="file"
            width={16}
            height={18}
            layout="fixed"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-secondary-500 ">
            {formatDate(markdown.createdAt)}
          </span>
          <span
            type="button"
            className={`break-all text-base text-white ${
              currentMarkdown.id === markdown.id && 'text-orange-primary'
            }`}
          >
            {markdown.title}
          </span>
        </div>
      </button>
    </li>
  ));
}
