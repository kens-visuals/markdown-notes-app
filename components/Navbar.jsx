import { useState, useContext } from 'react';
import Image from 'next/image';

// Firebase utils
import {
  updateTitle,
  saveMarkdownChanges,
  signInWithGoogle,
} from '../firebase/firebase-utils';

// Contexts
import { UserContext } from '../contexts/UserContext';
import { DataContext } from '../contexts/DataContext';

// Components
import Modal from './Modal';

// Assets
import logo from '../assets/logo.svg';
import loginIcon from '../assets/icon-login.svg';
import hamburgerIcon from '../assets/icon-menu.svg';
import closeIcon from '../assets/icon-close.svg';
import fileIcon from '../assets/icon-document.svg';
import saveIcon from '../assets/icon-save.svg';

export default function Navbar({
  content,
  setContent,
  isSidebarOpen,
  currentMarkdown,
  setIsSidebarOpen,
  setCurrentMarkdown,
  currentMarkdownNum,
  setCurrentMarkdownNum,
}) {
  const { currentUser } = useContext(UserContext);
  const { data } = useContext(DataContext);

  const [title, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <Modal
          currentUser={currentUser}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          currentMarkdown={currentMarkdown}
          setCurrentMarkdown={setCurrentMarkdown}
        />
      )}

      <div className="flex h-max w-full flex-shrink-0 justify-between bg-primary-800">
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="flex items-center justify-center bg-primary-700 p-4 lg:transition-all lg:duration-300 lg:ease-in-out lg:hover:bg-orange-primary"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <Image
                src={closeIcon}
                alt="menu hamburger"
                width={24}
                height={24}
                layout="fixed"
              />
            ) : (
              <Image
                src={hamburgerIcon}
                alt="menu hamburger"
                width={30}
                height={18}
                layout="fixed"
              />
            )}
          </button>

          <div className="my-5 hidden w-full items-center border-r border-r-secondary-600 px-4 lg:flex">
            <Image
              src={logo}
              alt="Markdown"
              width={130}
              height={12}
              layout="intrinsic"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Image
              src={fileIcon}
              alt="file"
              width={16}
              height={18}
              layout="fixed"
            />

            <form
              action="#"
              onSubmit={(e) => {
                updateTitle(e, currentUser.uid, currentMarkdown.id, title);
                setTitle('');
                setCurrentMarkdownNum(0);
              }}
              className="w-full md:my-3"
            >
              <label htmlFor="title">
                <span className="hidden font-roboto text-sm text-secondary-500 md:block">
                  Document Name
                </span>
                <input
                  id="title"
                  type="text"
                  value={title || data[currentMarkdownNum]?.title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-9/12 border-b border-transparent bg-transparent text-white caret-orange-primary transition-[border] duration-300 focus-visible:border-b focus-visible:border-b-white focus-visible:outline-none  md:w-64"
                />
              </label>
            </form>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 md:px-3">
          {currentUser && (
            <>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="fill-secondary-500 p-1 lg:transition-all lg:duration-100 lg:hover:fill-orange-primary"
              >
                <svg width="18" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => {
                  saveMarkdownChanges(
                    currentUser.uid,
                    currentMarkdown.id,
                    content
                  );
                  setContent('');
                }}
                className="flex items-center justify-center rounded bg-orange-primary p-2 md:gap-3 lg:transition-all lg:duration-300 lg:hover:bg-orange-secondary"
              >
                <Image
                  src={saveIcon}
                  alt="save"
                  width={20}
                  height={20}
                  layout="fixed"
                />

                {!isSidebarOpen && (
                  <span className="hidden text-white md:inline-block">
                    Save Changes
                  </span>
                )}
              </button>
            </>
          )}

          {!currentUser && (
            <button
              type="button"
              className="flex w-36 items-center justify-center gap-2 rounded bg-orange-primary p-1 text-xs text-white md:w-max md:p-2 md:px-3 md:text-base"
              onClick={signInWithGoogle}
            >
              Login with Google
              <Image
                src={loginIcon}
                alt="login"
                width={22}
                height={22}
                layout="fixed"
              />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
