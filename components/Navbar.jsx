import { useState, useContext, useEffect } from 'react';
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
import Alert from './Alert';

// Assets
import logo from '../assets/logo.svg';
import loginIcon from '../assets/icon-login.svg';
import hamburgerIcon from '../assets/icon-menu.svg';
import closeIcon from '../assets/icon-close.svg';
import fileIcon from '../assets/icon-document.svg';
import saveIcon from '../assets/icon-save.svg';

export default function Navbar({ content, isSidebarOpen, setIsSidebarOpen }) {
  const { currentUser } = useContext(UserContext);
  const { data, currentMarkdown, currentMarkdownNum, setCurrentMarkdownNum } =
    useContext(DataContext);

  const [title, setTitle] = useState('' || data[currentMarkdownNum]?.title);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Reset title input when data or currentMarkdownNum changes
  useEffect(() => {
    setTitle(data[currentMarkdownNum]?.title);
  }, [data, currentMarkdownNum]);

  useEffect(() => {
    const timer = setTimeout(() => setIsSaving(false), 3000);

    return () => clearTimeout(timer);
  }, [isSaving]);

  const handleTitleChange = (e) => {
    if (title === data[currentMarkdownNum]?.title) return;
    if (title === '') {
      setTitle('untitled.md');
      return;
    }

    setIsSaving(true);
    setAlertMessage('Title updated successfuly!');
    updateTitle(e, currentUser.uid, currentMarkdown.id, title);
    setCurrentMarkdownNum(0);
  };

  const handleSaveContent = () => {
    if (content === data[currentMarkdownNum]?.content) return;

    setIsSaving(true);
    setAlertMessage('Markdown saved successfully!');
    saveMarkdownChanges(currentUser.uid, currentMarkdown.id, content);
  };

  return (
    <>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <Alert alertMessage={alertMessage} isSaving={isSaving} />

      <nav className="flex h-max w-full justify-between bg-primary-800">
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="flex items-center justify-center bg-primary-700 p-4 lg:transition-all lg:duration-300 lg:ease-in-out lg:hover:bg-orange-primary"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="menu toggle"
          >
            {isSidebarOpen ? (
              <Image
                src={closeIcon}
                alt="menu hamburger"
                width={24}
                height={24}
                layout="fixed"
                aria-hidden="true"
              />
            ) : (
              <Image
                src={hamburgerIcon}
                alt="menu hamburger"
                width={30}
                height={18}
                layout="fixed"
                aria-hidden="true"
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
              aria-hidden="true"
            />
          </div>

          <div
            className={`flex items-center gap-2 md:gap-4 
            ${isSidebarOpen && 'hidden md:flex'}`}
          >
            <Image
              src={fileIcon}
              alt="file"
              width={16}
              height={18}
              layout="fixed"
              aria-hidden="true"
            />

            <form
              action="#"
              onSubmit={(e) => handleTitleChange(e)}
              className="w-full md:my-3"
            >
              <label htmlFor="title">
                <span className="hidden font-roboto text-sm text-secondary-500 md:block">
                  Document Name
                </span>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-9/12 border-b border-transparent bg-transparent text-white caret-orange-primary transition-[border] duration-300 focus-visible:border-b focus-visible:border-b-white focus-visible:outline-none  md:w-64"
                />
              </label>
            </form>
          </div>
        </div>

        <div
          className={`flex items-center gap-3 p-2 md:px-3 
          ${isSidebarOpen && 'hidden md:flex'}`}
        >
          {currentUser && (
            <>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="fill-secondary-500 p-1 lg:transition-all lg:duration-100 lg:hover:fill-orange-primary"
                aria-label="delete modal opener"
              >
                <svg
                  width="18"
                  height="20"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleSaveContent}
                className="flex items-center justify-center rounded bg-orange-primary p-2 md:gap-3 lg:transition-all lg:duration-300 lg:hover:bg-orange-secondary"
                aria-label="save content"
              >
                <Image
                  src={saveIcon}
                  alt="save"
                  width={20}
                  height={20}
                  layout="fixed"
                  aria-hidden="true"
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
              aria-label="sign in with google"
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
      </nav>
    </>
  );
}
