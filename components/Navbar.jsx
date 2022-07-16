import { useState, useContext } from 'react';
import Image from 'next/image';

// Contexts
import { UserContext } from '../contexts/UserContext';

// Components
import Login from './Login';

// Assets
import hamburgerIcon from '../assets/icon-menu.svg';
import fileIcon from '../assets/icon-document.svg';
import saveIcon from '../assets/icon-save.svg';
import deleteIcon from '../assets/icon-delete.svg';
import loginIcon from '../assets/icon-login.svg';

export default function Navbar({ currentMarkdown }) {
  const { currentUser } = useContext(UserContext);

  const [title, setTitle] = useState(currentMarkdown.title);

  return (
    <div className="flex justify-between  bg-primary-800">
      <div className="flex justify-center gap-6">
        <div className="flex items-center justify-center  bg-primary-700 p-4">
          <Image
            src={hamburgerIcon}
            alt="menu hamburger"
            width={30}
            height={18}
            layout="intrinsic"
          />
        </div>

        {currentUser && (
          <div className="flex items-center gap-2">
            <Image
              src={fileIcon}
              alt="file"
              width={16}
              height={18}
              layout="intrinsic"
            />

            <form
              action="#"
              onSubmit={(e) =>
                updateTitle(e, currentUser.uid, currentMarkdown.id, title)
              }
              className="w-full"
            >
              <input
                type="text"
                value={title ? title : currentMarkdown.title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-9/12 border-b border-transparent bg-transparent transition-[border] duration-300 focus-visible:border-b focus-visible:border-b-white focus-visible:outline-none"
              />
            </form>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 p-2">
        {currentUser && (
          <>
            <Image
              src={deleteIcon}
              alt="delete"
              width={27}
              height={30}
              layout="intrinsic"
            />

            <div className="flex items-center justify-center rounded bg-orange-primary p-3">
              <Image
                src={saveIcon}
                alt="save"
                width={26}
                height={26}
                layout="intrinsic"
              />
            </div>
          </>
        )}

        <Login />
      </div>
    </div>
  );
}
