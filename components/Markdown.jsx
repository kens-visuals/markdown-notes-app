import { useState, useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import {
  addNewMarkdown,
  deleteMarkdown,
  updateTitle,
  saveMarkdownChanges,
} from '../firebase/firebase-utils';

// Components
import MarkdownPreview from './MarkdownPreview';

// Contexts
import { UserContext } from '../contexts/UserContext';

export default function Markdown({ currentMarkdown }) {
  const { currentUser } = useContext(UserContext);

  const [title, setTitle] = useState(currentMarkdown.title);
  const [content, setContent] = useState(currentMarkdown.content);

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
          onClick={() =>
            saveMarkdownChanges(currentUser.uid, currentMarkdown.id, content)
          }
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
          value={content ? content : currentMarkdown.content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div>
        <p>Preview</p>
        <MarkdownPreview>
          <ReactMarkdown>
            {content ? content : currentMarkdown.content}
          </ReactMarkdown>
        </MarkdownPreview>
      </div>
    </>
  );
}
