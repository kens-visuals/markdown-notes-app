import { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';

// Firebase
import {
  doc,
  collection,
  Timestamp,
  updateDoc,
  getDoc,
  deleteDoc,
  setDoc,
  ref,
} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import {
  addNewMarkdown,
  deleteMarkdown,
  updateTitle,
} from '../firebase/firebase-utils';

// Components
import MarkdownPreview from './MarkdownPreview';

// Contexts
import { UserContext } from '../contexts/UserContext';

export default function Markdown({ currentMarkdown }) {
  const { currentUser } = useContext(UserContext);

  const [text, setText] = useState(currentMarkdown.content);
  const [title, setTitle] = useState(currentMarkdown.title);

  // console.log(currentMarkdown.id);

  // const saveMarkdownChanges = async (id) => {
  //   try {
  //     const userDoc = doc(db, 'posts', id);
  //     await setDoc(
  //       userDoc,
  //       {
  //         text,
  //         createdAt: Timestamp.fromDate(new Date()),
  //       },
  //       { merge: true }
  //     );
  //     window.location.reload();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <div>
        <button
          className="border border-orange-500"
          onClick={() => addNewMarkdown(currentUser.uid)}
        >
          + New Document
        </button>
        <button
          className="border border-orange-900"
          onClick={() => saveMarkdownChanges(ID)}
        >
          Save Changes
        </button>
        <button
          className="border border-orange-900"
          onClick={() => deleteMarkdown(currentUser.uid, currentMarkdown.id)}
        >
          Delete
        </button>
      </div>

      <div>
        <p>Title</p>

        <form
          action="#"
          onSubmit={(e) =>
            updateTitle(e, currentUser.uid, currentMarkdown.id, title)
          }
        >
          <input
            type="text"
            value={title ? title : currentMarkdown.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      </div>

      <div>
        <p>Editor</p>

        <textarea
          className="w-1/2 font-roboto-mono"
          value={text ? text : currentMarkdown.text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div>
        <p>Preview</p>
        <MarkdownPreview>
          <ReactMarkdown>{text ? text : currentMarkdown.text}</ReactMarkdown>
        </MarkdownPreview>
      </div>
    </>
  );
}
