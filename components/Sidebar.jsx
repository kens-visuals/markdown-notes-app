import { useContext } from 'react';
import Image from 'next/image';

// Contexts
import { UserContext } from '../contexts/UserContext';

// Firebase utils
import { addNewMarkdown } from '../firebase/firebase-utils';

// Components
import ThemeToggler from './ThemeToggler';
import MarkdownListItem from './MarkdownListItem';

// Assets
import logo from '../assets/logo.svg';

export default function Sidebar({ currentMarkdown, setCurrentMarkdown }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="flex min-h-screen w-64 flex-shrink-0 flex-col justify-between bg-primary-900 p-6">
      <div>
        <div className="flex w-full items-center">
          <Image
            src={logo}
            alt="Markdown"
            width={130}
            height={12}
            layout="intrinsic"
          />
        </div>

        <span className="my-7 block text-sm uppercase text-secondary-500">
          My Documents
        </span>

        <button
          type="button"
          className="w-full rounded bg-orange-primary p-3 text-center text-white"
          onClick={() => addNewMarkdown(currentUser.uid)}
        >
          + New Document
        </button>

        <ul className="mt-7 space-y-3">
          <MarkdownListItem
            currentMarkdown={currentMarkdown}
            setCurrentMarkdown={setCurrentMarkdown}
          />
        </ul>
      </div>

      <ThemeToggler />
    </div>
  );
}
