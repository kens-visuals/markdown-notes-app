import { useContext } from 'react';
import Image from 'next/image';

// Contexts
import { DataContext } from '../contexts/DataContext';

// Utils
import formatDate from '../utils/formatDate';

// Assets
import fileIcon from '../assets/icon-document.svg';

export default function MarkdownListItem() {
  const {
    data,
    currentMarkdownNum,
    setCurrentMarkdownNum,
    setCurrentMarkdown,
  } = useContext(DataContext);

  const handleCurrentMarkdownSelection = (idx) => {
    setCurrentMarkdown(data[idx]);
    setCurrentMarkdownNum(idx);
  };

  return !data ? (
    <div>Loading...</div>
  ) : (
    data.map((markdown, idx) => (
      <li key={markdown.id}>
        <button
          type="button"
          onClick={() => handleCurrentMarkdownSelection(idx)}
          className="flex items-center gap-4 text-left"
        >
          <div className="flex items-center">
            <Image
              src={fileIcon}
              alt="file"
              width={16}
              height={18}
              layout="fixed"
              aria-hidden="true"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-secondary-500 ">
              {formatDate(markdown.createdAt)}
            </span>
            <span
              className={`break-all text-base text-white lg:transition-all lg:duration-100 lg:hover:text-orange-primary 
              ${currentMarkdownNum === idx && 'text-orange-primary'}`}
            >
              {markdown.title}
            </span>
          </div>
        </button>
      </li>
    ))
  );
}
