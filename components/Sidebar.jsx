import { useContext } from 'react';
import Image from 'next/image';

// Contexts
import { UserContext } from '../contexts/UserContext';

// Firebase utils
import { addNewMarkdown, signUserOut } from '../firebase/firebase-utils';

// Components
import ThemeToggler from './ThemeToggler';
import MarkdownListItem from './MarkdownListItem';

// Assets
import logo from '../assets/logo.svg';
import logoutIcon from '../assets/icon-logout.svg';

export default function Sidebar({ currentMarkdown, setCurrentMarkdown }) {
  const { currentUser } = useContext(UserContext);

  return (
    <aside className="flex min-h-screen w-64 flex-shrink-0 flex-col justify-between bg-primary-900 p-6 py-8">
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

        {currentUser && (
          <div className="my-7 flex flex-col items-start ">
            <span className="mb-4 block text-sm uppercase text-secondary-500">
              My Account
            </span>

            <Image
              src={currentUser.photoURL}
              alt="user image"
              width={90}
              height={90}
              layout="fixed"
              className="rounded-md"
            />
            <div className="mt-2 flex flex-col ">
              <span className="text-sm text-secondary-300">
                {currentUser.displayName}
              </span>
              <span className="text-xs text-secondary-500">
                {currentUser.email}
              </span>
            </div>
          </div>
        )}

        <span className="my-7 block text-sm uppercase text-secondary-500">
          My Documents
        </span>

        {currentUser && (
          <button
            type="button"
            className="w-full rounded bg-orange-primary p-3 text-center text-white"
            onClick={() => addNewMarkdown(currentUser.uid)}
          >
            + New Document
          </button>
        )}

        <ul className="mt-7 space-y-3">
          <MarkdownListItem
            currentMarkdown={currentMarkdown}
            setCurrentMarkdown={setCurrentMarkdown}
          />
        </ul>
      </div>

      <div className="space-y-4">
        <ThemeToggler />

        {currentUser && (
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded bg-orange-secondary p-1.5 md:flex-wrap md:gap-2"
            onClick={signUserOut}
          >
            <Image
              src={logoutIcon}
              alt="logout"
              width={26}
              height={26}
              layout="fixed"
            />

            <span className="text-white">Log out</span>
          </button>
        )}
      </div>
    </aside>
  );
}
