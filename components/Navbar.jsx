import { useState, useContext } from 'react';
import Image from 'next/image';

// Firebase utils
import { updateTitle, saveMarkdownChanges } from '../firebase/firebase-utils';

// Contexts
import { UserContext } from '../contexts/UserContext';

// Components
import Login from './Login';
import Modal from './Modal';

// Assets
import hamburgerIcon from '../assets/icon-menu.svg';
import closeIcon from '../assets/icon-close.svg';
import fileIcon from '../assets/icon-document.svg';
import saveIcon from '../assets/icon-save.svg';
import deleteIcon from '../assets/icon-delete.svg';

export default function Navbar({
  content,
  isSidebarOpen,
  currentMarkdown,
  setIsSidebarOpen,
  setCurrentMarkdown,
}) {
  const { currentUser } = useContext(UserContext);

  const [title, setTitle] = useState(currentMarkdown.title || '');
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
            className="flex items-center justify-center  bg-primary-700 p-4"
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
              onSubmit={(e) =>
                updateTitle(e, currentUser.uid, currentMarkdown.id, title)
              }
              className="w-full"
            >
              <label htmlFor="title">
                <span className="hidden font-roboto text-sm text-secondary-500 md:block">
                  Document Name
                </span>
                <input
                  id="title"
                  type="text"
                  value={title || currentMarkdown.title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-9/12 border-b border-transparent bg-transparent text-white transition-[border] duration-300 focus-visible:border-b focus-visible:border-b-white focus-visible:outline-none"
                />
              </label>
            </form>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          {currentUser && (
            <>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex place-content-center p-1"
              >
                <Image
                  src={deleteIcon}
                  alt="delete"
                  width={17}
                  height={20}
                  layout="fixed"
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  saveMarkdownChanges(
                    currentUser.uid,
                    currentMarkdown.id,
                    content
                  )
                }
                className="flex items-center justify-center rounded bg-orange-primary p-2 md:flex-wrap md:gap-3"
              >
                <Image
                  src={saveIcon}
                  alt="save"
                  width={20}
                  height={20}
                  layout="fixed"
                />
                <span className="hidden text-white md:inline-block">
                  Save Changes
                </span>
              </button>
            </>
          )}

          <Login />
        </div>
      </div>
    </>
  );
}
