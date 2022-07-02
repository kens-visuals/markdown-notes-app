import { useState, useEffect } from 'react';

// Firebase
import {
  doc,
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase-config';

import ReactMarkdown from 'react-markdown';

export default function Markdown({ ID }) {
  const [singleMarkdown, setSingleMarkdown] = useState({});
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const postsCollectionRef = collection(db, 'posts');

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
  };

  const saveMarkdownChanges = async (id) => {
    try {
      const userDoc = doc(db, 'posts', id);
      await updateDoc(userDoc, {
        text,
        createdAt: Timestamp.fromDate(new Date()),
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMarkdown = async (id) => {
    try {
      const userDoc = doc(db, 'posts', id);
      await deleteDoc(userDoc);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTitle = async (e, id) => {
    e.preventDefault();
    try {
      const userDoc = doc(db, 'posts', id);
      await updateDoc(userDoc, { title });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getCurrentMarkdown = async () => {
      if (ID) {
        const currentMarkdoown = doc(db, 'posts', ID);
        const data = await getDoc(currentMarkdoown);

        setSingleMarkdown({ ...data.data(), id: data.id });
      }
    };

    getCurrentMarkdown();
  }, [ID]);

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
        <button
          className="border border-orange-900"
          onClick={() => deleteMarkdown(ID)}
        >
          Delete
        </button>
      </div>

      <div>
        <p>Title</p>
        <form action="#" onSubmit={(e) => updateTitle(e, ID)}>
          <input
            type="text"
            value={title ? title : singleMarkdown.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      </div>

      <div>
        <p>Editor</p>
        <textarea
          className="w-1/2"
          value={text ? text : singleMarkdown.text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div>
        <p>Preview</p>
        <article className="w-1/2 prose prose-h1:text-red-600">
          <ReactMarkdown>{text ? text : singleMarkdown.text}</ReactMarkdown>
        </article>
      </div>
    </>
  );
}
