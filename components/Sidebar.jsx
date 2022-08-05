import { useContext } from 'react';
import Image from 'next/image';

// Contexts
import { UserContext } from '../contexts/UserContext';
import { DataContext } from '../contexts/DataContext';

// Firebase utils
import { addNewMarkdown, signUserOut } from '../firebase/firebase-utils';

// Components
import ThemeToggler from './ThemeToggler';
import MarkdownListItem from './MarkdownListItem';
import Footer from './Footer';

// Assets
import logo from '../assets/logo.svg';
import logoutIcon from '../assets/icon-logout.svg';

export default function Sidebar() {
  const { currentUser } = useContext(UserContext);
  const {
    data,
    setCurrentMarkdown,
    currentMarkdownNum,
    setCurrentMarkdownNum,
  } = useContext(DataContext);

  const handleNewMarkdown = () => {
    addNewMarkdown(currentUser.uid);
    setCurrentMarkdownNum(0);
    setCurrentMarkdown(data[currentMarkdownNum]);
  };

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col justify-between bg-primary-900 p-6 py-8">
      {/* overflow-scroll for mobile */}
      <div className={`${data.length >= 5 && 'overflow-scroll'}`}>
        <div className="flex w-full items-center lg:hidden">
          <Image
            src={logo}
            alt="Markdown"
            width={130}
            height={12}
            layout="intrinsic"
            aria-hidden="true"
          />
        </div>

        {currentUser && (
          <div className="my-7 flex flex-col items-start lg:mt-0">
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
              aria-hidden="true"
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

        <span className="my-7 block text-sm uppercase text-secondary-500 lg:mt-0">
          My Documents
        </span>

        {currentUser && (
          <button
            type="button"
            className="w-full rounded bg-orange-primary p-3 text-center text-white lg:transition-all lg:duration-300 lg:hover:bg-orange-secondary"
            onClick={handleNewMarkdown}
          >
            + New Document
          </button>
        )}

        {/* add height for mobile */}
        <ul
          className={`my-6 space-y-3 overflow-y-scroll md:my-7 
          ${data.length >= 5 && 'h-2/6 md:h-auto'}`}
        >
          <MarkdownListItem />
        </ul>
      </div>

      <div className="space-y-4">
        <ThemeToggler />

        {currentUser && (
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded border border-orange-primary p-1.5 md:gap-2 lg:transition-all lg:duration-300 lg:hover:border-transparent lg:hover:bg-orange-secondary"
            onClick={signUserOut}
            aria-label="Log out"
          >
            <Image
              src={logoutIcon}
              alt="logout"
              width={22}
              height={22}
              layout="fixed"
            />

            <span className="text-white">Log out</span>
          </button>
        )}

        <Footer />
      </div>
    </aside>
  );
}
