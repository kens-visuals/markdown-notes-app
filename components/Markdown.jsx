import { useState, useEffect } from 'react';

// Firebase
import {
  doc,
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  getDoc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase-config';

import ReactMarkdown from 'react-markdown';

export default function Markdown({ ID }) {
  const [singleNote, setSingleNote] = useState({});
  const [title, setTitle] = useState('');
  const postsCollectionRef = collection(db, 'posts');

  const [text, setText] = useState('');

  const addNewMarkdown = async () => {
    try {
      await addDoc(postsCollectionRef, {
        text: '',
        title: 'untitled.md',
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error(error);
    }
    return;
  };

  const saveMarkdownChanges = async (id) => {
    try {
      const userDoc = doc(db, 'posts', id);
      await updateDoc(userDoc, {
        text,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateTitle = async (e, id) => {
    e.preventDefault();
    try {
      const userDoc = doc(db, 'posts', id);
      await updateDoc(userDoc, {
        title,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getCurrentMarkdown = async () => {
      if (ID) {
        const currentMarkdoown = doc(db, 'posts', ID);
        const data = await getDoc(currentMarkdoown);

        setSingleNote({ ...data.data(), id: data.id });
      }
    };

    getCurrentMarkdown();
  }, [ID]);

  console.log(singleNote);

  return (
    <>
      <div>
        <button className="border border-orange-500" onClick={addNewMarkdown}>
          + New Document
        </button>
        <button
          className="border border-orange-900"
          onClick={() => saveMarkdownChanges(ID)}
        >
          Save Changes
        </button>
      </div>

      <div>
        <p>Title</p>
        <form action="#" onSubmit={(e) => updateTitle(e, ID)}>
          <input
            type="text"
            value={title ? title : singleNote.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      </div>

      <div>
        <p>Editor</p>
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text ? text : singleNote.text}
          className="w-1/2"
        />
      </div>

      <div>
        <p>Preview</p>
        <article className="w-1/2 prose prose-h1:text-red-600">
          <ReactMarkdown>{text ? text : singleNote.text}</ReactMarkdown>
        </article>
      </div>
    </>
  );
}
