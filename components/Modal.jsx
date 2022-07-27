import { useContext } from 'react';

// Firebase utils
import { deleteMarkdown } from '../firebase/firebase-utils';

// Contexts
import { UserContext } from '../contexts/UserContext';
import { DataContext } from '../contexts/DataContext';

export default function Modal({ isModalOpen, setIsModalOpen }) {
  const {
    data,
    currentMarkdown,
    setCurrentMarkdown,
    currentMarkdownNum,
    setCurrentMarkdownNum,
  } = useContext(DataContext);
  const { currentUser } = useContext(UserContext);

  const handleDelete = () => {
    setIsModalOpen(false);
    deleteMarkdown(currentUser.uid, currentMarkdown.id);
    setCurrentMarkdownNum(0);
    setCurrentMarkdown(data[currentMarkdownNum]);
  };

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={`fixed top-0 right-0 left-0 z-50 flex min-h-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-secondary-500/50 md:inset-0 ${
        !isModalOpen && 'hidden'
      }`}
    >
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div className="relative rounded-lg bg-white shadow dark:bg-primary-900">
          <button
            type="button"
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="popup-modal"
            onClick={() => setIsModalOpen(false)}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <div className="p-6">
            <h3 className="mb-5 font-roboto-slab text-xl text-primary-700 dark:text-white">
              Delete this document?
            </h3>
            <p className="mb-5 font-roboto-slab text-sm leading-6 text-secondary-500 dark:text-secondary-400">
              Are you sure you want to delete the{' '}
              <span className="font-bold text-orange-primary">
                {data[currentMarkdownNum]?.title}
              </span>{' '}
              document and its contents? This action cannot be reversed.
            </p>
            <button
              type="button"
              data-modal-toggle="popup-modal"
              className="w-full rounded-lg bg-orange-primary px-5 py-2.5 text-center font-roboto text-base  text-white transition-all duration-200 hover:bg-orange-secondary focus:outline-none focus:ring-2 focus:ring-primary-900 dark:focus:ring-white"
              onClick={handleDelete}
            >
              Confirm & Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
